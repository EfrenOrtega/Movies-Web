import pymongo

#Conexión a la base de datos de mongoDB
class Conexion():

  def __init__(self):
    pass

  def connect_mongo():
    db_name = "movies3077"
    db_URI = "mongodb://localhost/"

    client = pymongo.MongoClient(db_URI)
    mdb = client[db_name]
    return mdb
