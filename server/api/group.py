from api.__init__ import db
from flask import request
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
        groupname = json_data['groupname']
        destination = json_data['destination'] # nullable
        groupimage = json_data['groupimage'] # nullable
        summary = json_data['summary'] # nullable
        state = json_data['groupstate']
        
        # make sure group code is unique
        groupCode = ''.join(random.choices(string.ascii_letters + string.digits, k=4))
        db_groupCode = Group.query.filter_by(groupCode=groupCode).first()
        while(groupCode == db_groupCode):
            groupCode = ''.join(random.choices(string.ascii_letters + string.digits, k=4))

        group = Group(groupname=groupname, destination=destination, 
                        groupimage=groupimage, summary=summary, groupCode = groupCode)
        db.session.add(group)
        db.session.commit()

        return {
            'resultStatus': 'SUCCESS',
            'message': "Group successfully created",
            'tripname': groupname,
            'destination': destination,
            'groupCode': groupCode,
            'state': state,
            'members': 1
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
        groupCode = json_data['hashCode']
        group = Group.query.filter_by(groupCode=groupCode).first()
        # members field += 1
        if (group is None):
            return{
                'resultStatus': 'FAILURE',
                'message': "Group does not exist"
            }
        
        return{
            'resultStatus': 'SUCCESS',
            'message': "Group successfully joined",
            'name': group.groupname,
            'destination': group.destination,
            'groupCode': group.groupCode,
            'description': group.summary,
            'imgPath': group.groupimage,
            'members': group.members
        }

class EditGroupHandler(Resource):
    def post(self):
        return{
            'resultStatus': 'SUCCESS',
            'message': "Group successfully joined",
        }