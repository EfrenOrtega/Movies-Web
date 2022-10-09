from flask_pymongo import PyMongo, ObjectId
from flask import jsonify, request

import json

from models.mongodb import Conexion


class ModelUsers():

  #Para conectarnos a la BD
  db = Conexion.connect_mongo()
  cUsers = db.Users #Users Collection
  cAccount = db.Account

  id=""

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

      res = self.cUsers.insert_one({
        'name':request.json['name'],
        'email':request.json['email'],
        'dateOnBirth':request.json['dateOnBirth'],
        'avatar':request.json['avatar'],
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