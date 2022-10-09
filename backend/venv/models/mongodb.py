import pymongo

#Conexión a la base de datos de mongoDB
class Conexion():

  def __init__(self):
    pass

  def connect_mongo():
    db_name = "movies3077"
    db_URI = "mongodb://localhost/"

    #client = pymongo.MongoClient('mongodb+srv://efren:T0RgxcKoeAN3xyYy@cluster2939.waqvftu.mongodb.#net/?retryWrites=true&w=majority')
    client = pymongo.MongoClient(db_URI + db_name)
    mdb = client[db_name]
    return mdb
