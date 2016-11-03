from flask import Blueprint
from flask_restful import Api, Resource, reqparse, marshal_with, fields
from project.models import User
from project import db

users_api = Api(Blueprint('users_api', __name__))

user_puppies_fields = {
    'id': fields.Integer,
    'name': fields.String,
    'created': fields.DateTime(dt_format='rfc822'),
}

user_fields= {
    'id': fields.Integer,
    'username': fields.String,
    'puppies': fields.Nested(user_puppies_fields),
}


@users_api.resource('/users')
class usersAPI(Resource):
    @marshal_with(user_fields)
    def get(self):
        return User.query.all()

    @marshal_with(user_fields)
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('username', type=str, help='username')
        args = parser.parse_args()
        new_user = User(args['username'])
        db.session.add(new_user)
        db.session.commit()

        return new_user

@users_api.resource('/users/<int:id>')
class UserAPI(Resource):

    @marshal_with(user_fields)
    def get(self, id):
        return User.query.get_or_404(id)

    @marshal_with(user_fields)
    def put(self, id):
        found_user = User.query.get_or_404(id)
        parser = reqparse.RequestParser()
        parser.add_argument('username', type=str, help='username')
        args = parser.parse_args()
        found_user.name = args['username']
        db.session.add(found_user)
        db.session.commit()

        return found_user

    def delete(self, id):
        user = User.query.get_or_404(id)
        db.session.delete(user)
        db.session.commit()
        return None, 204
