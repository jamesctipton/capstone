from api.__init__ import db
from flask import request
from flask_restful import Resource
from api.models import *
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
        username = json_data['username'] # user who created group
        
        # make sure group code is unique
        groupCode = ''.join(random.choices(string.ascii_letters + string.digits, k=4))
        db_groupCode = Group.query.filter_by(groupCode=groupCode).first()
        while(groupCode == db_groupCode.groupCode):
            groupCode = ''.join(random.choices(string.ascii_letters + string.digits, k=4))

        # add group to user who created the group 
        user = User.query.filter_by(username=username).first()

        # commit group to db
        group = Group(groupname=groupname, destination=destination, 
                        groupimage=groupimage, summary=summary, groupCode = groupCode, admin_id = user.id)
        db.session.add(group)
        user.groups.append(group) # add group to user's group
        user.groups_admin.append(group) # add group to the groups that user is an admin of
        db.session.commit()

        return {
            'resultStatus': 'SUCCESS',
            'message': "Group successfully created",
            'tripname': groupname,
            'destination': destination,
            'groupCode': groupCode,
            'state': state
        }
    
# unfinished
class JoinGroupHandler(Resource):
    def get(self):
        # get polls from group
        # ..
        return {
            'resultStatus': 'SUCCESS',
            'message': "join group handler hit"
        }
    def post(self):
        json_data = request.get_json()
        groupCode = json_data['hashCode']
        group = Group.query.filter_by(groupCode=groupCode).first()
        if (group is None):
            return{
                'resultStatus': 'FAILURE',
                'message': "Group does not exist"
            }
        
        # add user to group, commit to db
        # ..

        return{
            'resultStatus': 'SUCCESS',
            'message': "Group successfully joined",
            'name': group.groupname,
            'destination': group.destination,
            'groupCode': group.groupCode,
            'description': group.summary,
            'imgPath': group.groupimage
        }

class EditGroupHandler(Resource):
    def post(self):
        json_data = request.get_json()
        groupCode = json_data['hashCode']
        group = Group.query.filter_by(groupCode=groupCode).first()

        # get group attributes to change 
        # ..

        if (group is None):
            return{
                'resultStatus': 'FAILURE',
                'message': "Group does not exist"
            }
        

        return{
            'resultStatus': 'SUCCESS',
            'message': "Group successfully edited",
        }