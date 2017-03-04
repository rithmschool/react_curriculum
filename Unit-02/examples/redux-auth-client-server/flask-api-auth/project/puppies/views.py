from flask import Blueprint, abort
from flask_restful import Api, Resource, reqparse, marshal_with, fields
from project.models import Puppy, User
from project import db
from flask_jwt import jwt_required, current_identity
from functools import wraps

puppies_api = Api(Blueprint('puppies_api', __name__))

puppy_user_fields = {
    'id': fields.Integer,
    'username': fields.String,
}

puppy_fields= {
    'id': fields.Integer,
    'name': fields.String,
    'created': fields.DateTime(dt_format='rfc822'),
    'user': fields.Nested(puppy_user_fields)
}

def ensure_correct_user(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        if not kwargs.get('user_id') == current_identity.id:
            return abort(401, "You are not authorized")
        return fn(*args, **kwargs)
    return wrapper


@puppies_api.resource('/puppies')
class PuppiesAPI(Resource):

    @jwt_required()
    @marshal_with(puppy_fields)
    def get(self, user_id):
        return User.query.get_or_404(user_id).puppies

    @jwt_required()
    @marshal_with(puppy_fields)
    def post(self, user_id):
        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str, help='Name')
        args = parser.parse_args()
        new_puppy = Puppy(args['name'], user_id)
        db.session.add(new_puppy)
        db.session.commit()

        return new_puppy

@puppies_api.resource('/puppies/<int:id>')
class PuppyAPI(Resource):

    @jwt_required()
    @marshal_with(puppy_fields)
    def get(self, user_id, id):
        return Puppy.query.get_or_404(id)

    @jwt_required()
    @marshal_with(puppy_fields)
    def put(self, user_id, id):
        found_puppy = Puppy.query.get_or_404(id)
        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str, help='Name')
        args = parser.parse_args()
        found_puppy.name = args['name']
        db.session.add(found_puppy)
        db.session.commit()

        return found_puppy

    def delete(self, user_id, id):
        puppy = Puppy.query.get_or_404(id)
        db.session.delete(puppy)
        db.session.commit()
        return None, 204
