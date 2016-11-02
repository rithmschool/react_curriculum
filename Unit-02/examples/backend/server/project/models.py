from datetime import datetime

from project import db

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.Text)
    puppies = db.relationship('Puppy', backref='user', lazy='joined')
    created = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self,username):
        self.username = username


class Puppy(db.Model):
    __tablename__ = 'puppies'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    created = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self,name, user_id):
        self.name = name
        self.user_id = user_id