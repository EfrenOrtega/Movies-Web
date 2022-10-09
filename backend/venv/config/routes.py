from flask import Blueprint

#Importar la funciones del controller.py
from controllers.controller import getUsers,create_users, create_account, auth_user


blueprint = Blueprint('blueprint', __name__)

#=========================
#  RUTAS PARA USUARIOS
#=========================
blueprint.route('/users', methods=['GET'])(getUsers)
blueprint.route('/createaccount', methods=['POST'])(create_users)

#Para autenticar a un usuario :)
blueprint.route('/auth', methods=['POST'])(auth_user)
