from models.model_users import ModelUsers

#Models
users = ModelUsers()


def getUsers():
  return users.get_users()

def create_users():
  return users.create_user()

def create_account():
  return users.create_account()

def auth_user():
  return users.auth_user()

def upload_file():
  return users.uploadFile()

def get_user(username):
  users.username = username
  return users.get_user()