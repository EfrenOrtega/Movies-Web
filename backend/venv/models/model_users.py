from flask_pymongo import PyMongo, ObjectId
from flask import jsonify, request

import json
from botocore.exceptions import ClientError

from models.mongodb import Conexion

#Para usar los servicios de AWS https://boto3.amazonaws.com/v1/documentation/api/latest/index.html
#https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html?highlight=object
import boto3

import os
from werkzeug.utils import secure_filename

#Para crear nombre aleatorios para guardar las imagenes (Avatars)
import uuid

class ModelUsers():

  #Para conectarnos a la BD
  db = Conexion.connect_mongo()
  cUsers = db.Users #Users Collection
  cAccount = db.Account

  id=""
  username = None
  urlImage = None
  nameImage = None  

  def __init__(self):
    pass

  #=========================
  #    Obtener Usuarios
  #=========================
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


  def get_user(self):
    #Validar que el usuario no exista
    userStatus = self.cAccount.find_one({'username':self.username})
    if(userStatus):
      return jsonify({'status':False, 'message':'El Usuario ya Existe'})

    return jsonify({'status':True, 'message':'El usuario no Existe'})


  #=========================
  #     Crear Cuentas
  #=========================
  def create_account(self):
    res = self.cAccount.insert_one({
      'username':request.json['username'],
      'password':request.json['password'],
      'user_id':self.id
    })
  
    #Respuesta
    return jsonify({'id_account':str(res.inserted_id)}) 


  #=========================
  #     Crear Usuarios
  #=========================
  def create_user(self):
    #Validar que el usuario no exista
    userStatus = self.cAccount.find_one({'username':request.json['username']})
    if(userStatus):
      return jsonify({'status':False, 'message':'Se ha cancelado la operaci??n porque el username ya existe'})


    #Convertir JSON a Diccionario
    data = json.loads(json.dumps(request.json))

    #Validar los datos
    if(data.get("name") and data.get("email") and data.get("dateOnBirth") 
     and data.get("password") and data.get("username") and self.nameImage):   

      #Subir la imagen del usuario a https://filebase.com/
      self.upload_to_filebase()

      res = self.cUsers.insert_one({
        'name':request.json['name'],
        'email':request.json['email'],
        'dateOnBirth':request.json['dateOnBirth'],
        'avatar':self.urlImage,#Aqu?? se guarda la URL obtenida del m??todo upload_to_filebase()
      }) 
          
      self.id = str(res.inserted_id)
      self.nameImage = None
      #Respuesta
      return self.create_account()
    else:
      return jsonify({'status':False, 'message':'Error al conectar con DB o No se enviaron todos los datos necesarios'})
    
  
  def uploadFile(self):
    try:

      #Subir imagen a este servidor flask
      file = request.files['file']
      Path = os.path.join(os.path.dirname(__file__))    
      UPLOAD_FOLDER = os.path.join(os.path.dirname(Path), 'images')

      filename = secure_filename(file.filename)
      extension = os.path.splitext(filename)[1]

      newName = str(uuid.uuid4()) + extension

      upload_path = os.path.join(UPLOAD_FOLDER, newName)
      
      file.save(upload_path)

      self.nameImage = newName
    
      return jsonify({'status':True, 'message':'Imagen Subida al servidor Flask'})
    except ClientError as e:
      print('error: %s') % e
      return jsonify({'status':False, 'message':'Error al Subir la Imagen'})
  
  #==================================
  #     Autenticaci??n de Usuarios
  #==================================
  def auth_user(self):

    user = self.cAccount.find_one({'username':request.json['username']})

    if(user):
      if(user['password'] == request.json['password']):
        return jsonify({'status':'true', 'msg':'Auth'}) 

    return jsonify({'status':False, 'message':'Usuario o Contrase??a Incorrectos'})
  

  #===================================================================================================
  #                                     Subir imagenes a Filebase
  #
  #Subir las imagenes de este servidor a un sistema de almacenamiento externo https://filebase.com/
  #Recuper la URL de la imagen subida y esa guardarla en MongoDB
  #===================================================================================================
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

        #Insertar objeto al bucket "movies-3077"
        request = s3.put_object(
          Body=data,
          Bucket="movies-3077", 
          Key = self.nameImage, 
          ContentType = 'imagen/jpeg'
        )
        
        CDI = request['ResponseMetadata']['HTTPHeaders']['x-amz-meta-cid']

        #Recuperamos la URL del la imagen ya una vez subida a https://filebase.com/
        self.urlImage = 'https://ipfs.filebase.io/ipfs/' + CDI

      except ClientError as e:
        print('error: %s') % e
        return 'error'