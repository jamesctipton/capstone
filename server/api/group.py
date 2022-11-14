from api.__init__ import db
from flask import request, jsonify
from flask_restful import Resource
from api.models import Group
import random, string

# unfinished
class CreateGroupHandler(Resource):
    def get(self):
        return {
            'resultStatus': 'SUCCESS',
            'message': "create group handler hit"
        }
    def post(self):
        # json_data get
        json_data = request.get_json()
        groupname = json_data['tripname']
        destination = json_data['destination'] # nullable
        groupimage = json_data['groupimage'] # nullable
        summary = json_data['summary'] # nullable
        hashCode = ''.join(random.choices(string.ascii_letters + string.digits, k=4))
        
        group = Group(tripname=groupname, destination=destination, 
                        groupimage=groupimage, summary=summary, hashCode = hashCode)
        db.session.add(group)
        db.session.commit()

        return {
            'resultStatus': 'SUCCESS',
            'message': "Group successfully created",
            'tripname': groupname,
            'destination': destination,
            'hashCode': hashCode
        }
    
# unfinished
class JoinGroupHandler(Resource):
    def get(self):
        return {
            'resultStatus': 'SUCCESS',
            'message': "join group handler hit"
        }
    def post(self):
        json_data = request.get_json()
        hashCode = json_data['hashCode']
        group = Group.query.filter_by(hashCode=hashCode).first()
        if (group is None):
            return{
                'resultStatus': 'FAILURE',
                'message': "Group does not exist"
            }
        
        return{
            'resultStatus': 'SUCCESS',
            'message': "Group successfully joined",
            'tripname': group.groupname,
            'destination': group.destination,
            'hashCode': group.hashCode
        }

class EditGroupHandler(Resource):
    def post(self):
        return{
            'resultStatus': 'SUCCESS',
            'message': "Group successfully joined",
        }