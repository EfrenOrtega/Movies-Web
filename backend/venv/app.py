from flask import Flask
from flask_cors import CORS


#import routes.py
from config.routes import blueprint

app = Flask(__name__)

#Para conectar mis rutas de routes.py
app.register_blueprint(blueprint)


if __name__ == "__main__":
  app.run(debug=True)