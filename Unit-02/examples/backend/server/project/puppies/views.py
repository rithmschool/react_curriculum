from flask import Blueprint
from flask_restful import Api, Resource, reqparse, marshal_with, fields
from project.models import Puppy, User
from project import db

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


@puppies_api.resource('/puppies')
class PuppiesAPI(Resource):
    @marshal_with(puppy_fields)
    def get(self, user_id):
        return User.query.get_or_404(user_id).puppies

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

    @marshal_with(puppy_fields)
    def get(self, user_id, id):
        return Puppy.query.get_or_404(id)

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
