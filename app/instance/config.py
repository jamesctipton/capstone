import os

class Config(object):
    # used to protect web forms against CSRF: https://en.wikipedia.org/wiki/Cross-site_request_forgery
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'mysql+pymysql://teamprintf:Capstone123@capstonedb.mysql.database.azure.com/fri'
    SQLALCHEMY_TRACK_MODIFICATIONS = False