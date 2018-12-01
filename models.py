from flask import Flask
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class User(db.Model):
    __tablename__ = "users"
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)
    display_name = db.Column(db.String, nullable=False)
    avatar = db.Column(db.Integer, nullable=False)

