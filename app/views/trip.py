from flask import Blueprint

trip = Blueprint('trip', __name__, template_folder='templates', static_folder='static')
