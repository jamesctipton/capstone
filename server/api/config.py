import os

class Config(object):
    # used to protect web forms against CSRF: https://en.wikipedia.org/wiki/Cross-site_request_forgery
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'mysql+pymysql://teamprintf:Capstone123@capstonedb.mysql.database.azure.com/fri'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 465
    MAIL_USERNAME = 'fricapstone@gmail.com'
    MAIL_PASSWORD = 'crbfqjpuubaeiexv'
    MAIL_USE_TLS = False
    MAIL_USE_SSL = True