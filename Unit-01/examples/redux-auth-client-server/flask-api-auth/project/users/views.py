from flask import Blueprint, abort, request
from flask_restful import Api, Resource, reqparse, marshal_with, fields
from project.models import User
from project import db,bcrypt
import jwt
from sqlalchemy.exc import IntegrityError
from functools import wraps
from jwt.exceptions import DecodeError

def authenticate(username, password):
    user = User.query.filter(User.username == username).first()
    if bcrypt.check_password_hash(user.password, password):
        token = jwt.encode({'id': user.id}, 'secret', algorithm='HS256').decode('utf-8')
        return token

def jwt_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        if request.headers.get('token'):
            split_token = request.headers.get('token').split(' ')[2]
        try:
            token = jwt.decode(split_token, 'secret', algorithm='HS256')
            if token:
                return fn(*args, **kwargs)
        except DecodeError as e:
            return abort(401, "Please log in again")
        except UnboundLocalError as e:
            return abort(401, "Please log in again")
        return abort(401, "Please log in")
    return wrapper

def ensure_correct_user(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        if request.headers.get('token'):
            split_token = request.headers.get('token').split(' ')[2]
        try:
            token = jwt.decode(split_token, 'secret', algorithm='HS256')
            if kwargs.get('id') == token.get('id'):
                return fn(*args, **kwargs)
        except DecodeError as e:
            return abort(401, "Please log in again")
        return abort(401, "Unauthorized")
    return wrapper

users_api = Api(Blueprint('users_api', __name__))

user_puppies_fields = {
    'id': fields.Integer,
    'name': fields.String,
    'created': fields.DateTime(dt_format='rfc822'),
}

user_fields= {
    'id': fields.Integer,
    'username': fields.String,
    'password': fields.String,
    'puppies': fields.Nested(user_puppies_fields),
}

@users_api.resource('/users/auth')
class authAPI(Resource):

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('username', type=str, help='username')
        parser.add_argument('password', type=str, help='password')
        args = parser.parse_args()
        token = authenticate(args['username'], args['password'])
        if token:
            return token
        return abort(400, "Invalid Credentials")

@users_api.resource('/users')
class usersAPI(Resource):

    @jwt_required
    @marshal_with(user_fields)
    def get(self):
        return User.query.all()

    @marshal_with(user_fields)
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('username', type=str, help='username')
        parser.add_argument('password', type=str, help='password')
        args = parser.parse_args()
        try:
            new_user = User(args['username'], args['password'])
            db.session.add(new_user)
            db.session.commit()
        except IntegrityError as e:
            return "Username already exists"
        return new_user

@users_api.resource('/users/<int:id>')
class UserAPI(Resource):

    @jwt_required
    @ensure_correct_user
    @marshal_with(user_fields)
    def get(self, id):
        return User.query.get_or_404(id)

    @jwt_required
    @ensure_correct_user
    @marshal_with(user_fields)
    def put(self, id):
        found_user = User.query.get_or_404(id)
        parser = reqparse.RequestParser()
        parser.add_argument('username', type=str, help='username')
        parser.add_argument('password', type=str, help='password')
        args = parser.parse_args()
        found_user.name = args['username']
        found_user.password = bcrypt.generate_password_hash(args['password']).decode('UTF-8')
        db.session.add(found_user)
        db.session.commit()

        return found_user

    @jwt_required
    @ensure_correct_user
    def delete(self, id):
        user = User.query.get_or_404(id)
        db.session.delete(user)
        db.session.commit()
        return None, 204
