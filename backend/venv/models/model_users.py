from flask_pymongo import PyMongo, ObjectId
from flask import jsonify, request

import json
from botocore.exceptions import ClientError

from models.mongodb import Conexion

#Para usar los servicios de AWS https://boto3.amazonaws.com/v1/documentation/api/latest/index.html
#https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html?highlight=object
import boto3

import os


class ModelUsers():

  #Para conectarnos a la BD
  db = Conexion.connect_mongo()
  cUsers = db.Users #Users Collection
  cAccount = db.Account

  id=""
  urlImage = None
  nameImage = None

  def __init__(self):
    pass

  
  def get_users(self):
    users = []
    for data in self.cUsers.find():
      print(data)
      users.append({
        '_id':str(ObjectId(data['_id'])),
        'name':data['name'],
        'dateOnBirth':data['dateOnBirth'],
      })
    return jsonify(users)

  def create_account(self):
    res = self.cAccount.insert_one({
      'username':request.json['username'],
      'password':request.json['password'],
      'user_id':self.id
    })
  
    #Respuesta
    return jsonify({'id_account':str(res.inserted_id)}) 

  def create_user(self):

    #Validar que el usuario no exista
    userStatus = self.cAccount.find_one({'username':request.json['username']})
    if(userStatus):
      return jsonify({'status':'false', 'message':'Se ha cancelado la operación porque el username ya existe'})


    #Convertir JSON a Diccionario
    data = json.loads(json.dumps(request.json))

    #Validar los datos
    if(data.get("name") and data.get("email") and data.get("dateOnBirth") 
    and data.get("avatar") and data.get("password") and data.get("username")):

      #Subir la imagen del usuario a https://filebase.com/
      self.nameImage = request.json['avatar']
      self.upload_to_filebase()

      res = self.cUsers.insert_one({
        'name':request.json['name'],
        'email':request.json['email'],
        'dateOnBirth':request.json['dateOnBirth'],
        'avatar':self.urlImage,#Aquí se guarda la URL obtenida del método upload_to_filebase()
      }) 
          
      self.id = str(res.inserted_id)
    
      #Respuesta
      return self.create_account()
    else:
      return jsonify({'status':'false', 'message':'Error al conectar con DB o No se enviaron todos los datos necesarios'})
    
  
  def auth_user(self):

    user = self.cAccount.find_one({'username':request.json['username']})

    if(user):
      if(user['password'] == request.json['password']):
        return jsonify({'status':'true', 'msg':'Auth'}) 

    return jsonify({'status':'false', 'message':'Usuario o Contraseña Incorrectos'})
  


  #Subir las imagenes de este servidor a un sistema de almacenamiento externo https://filebase.com/
  def upload_to_filebase(self):
    CDI = None

    #Credenciales para acceder al Filebase
    s3 = boto3.client('s3',
      endpoint_url = 'https://s3.filebase.com',
      aws_access_key_id = "B0E0B15155B64920B741",
      aws_secret_access_key = "cqpvswtXeN5Eit3iZQmEaQtga5Nc1vY3qk5N0kiA"
    )

    image = self.nameImage
    #Para Subir un nuevo objeto a un Bucket en este caso una imagen
    currentPath = os.path.join(os.path.dirname(__file__))    
    pathImage = os.path.join(os.path.dirname(currentPath), 'images', image)

    with open(pathImage, 'rb') as data:
      try:    

        #Insertar objeto al bucket "test-31022002"
        request = s3.put_object(
          Body=data,
          Bucket="test-31022002", 
          Key = "Avatar5.png", 
          ContentType = 'imagen/jpeg'
        )
        
        CDI = request['ResponseMetadata']['HTTPHeaders']['x-amz-meta-cid']

        #Recuperamos la URL del la imagen ya una vez subida a https://filebase.com/
        self.urlImage = 'https://ipfs.filebase.io/ipfs/' + CDI

      except ClientError as e:
        print('error: %s') % e
        return 'error'