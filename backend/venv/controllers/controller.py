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