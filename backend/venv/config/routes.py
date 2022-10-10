from flask import Blueprint

#Importar la funciones del controller.py
from controllers.controller import getUsers,create_users, create_account, auth_user, upload_file, get_user


blueprint = Blueprint('blueprint', __name__)

#=========================
#  RUTAS PARA USUARIOS
#=========================
blueprint.route('/users', methods=['GET'])(getUsers)
blueprint.route('/createaccount', methods=['POST'])(create_users)
blueprint.route('/uploadFile', methods=['POST'])(upload_file)
blueprint.route('/selectuser/<username>', methods=['GET'])(get_user)


#Para autenticar a un usuario :)
blueprint.route('/auth', methods=['POST'])(auth_user)
