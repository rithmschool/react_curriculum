import os
from flask_sqlalchemy import SQLAlchemy
from flask import Flask, render_template

from flask_cors import CORS

app = Flask(__name__)
CORS(app)

db = SQLAlchemy(app)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL') or "postgres://localhost/flask_react_puppies"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


from project.puppies.views import puppies_api
from project.users.views import users_api

app.register_blueprint(users_api.blueprint, url_prefix='/api')
app.register_blueprint(puppies_api.blueprint, url_prefix='/api/users/<int:user_id>')

@app.route('/')
def index():
    return render_template('index.html')