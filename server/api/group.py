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
        # print(json_data)
        groupname = json_data['groupname']
        destination = json_data['destination'] # nullable
        groupimage = json_data['groupimage'] # nullable
        summary = json_data['summary'] # nullable
        state = json_data['groupstate']
        username = json_data['username'] # user who created group
        
        # make sure group code is unique
        groupCode = ''.join(random.choices(string.ascii_letters + string.digits, k=4))
        db_groupCode = Group.query.filter_by(groupCode=groupCode).first()
        if db_groupCode != None:
            while(groupCode == db_groupCode.groupCode):
                groupCode = ''.join(random.choices(string.ascii_letters + string.digits, k=4))

        # get user who created this group
        user = User.query.filter_by(username=username).first()

        # commit group to db
        group = Group(groupname=groupname, destination=destination,
                        groupimage=groupimage, summary=summary, groupCode = groupCode, admin = user)
        # group_schema = GroupSchema()
        db.session.add(group)

        # dump_data = group_schema.dump(group)
        # print(dump_data)

        user.groups.append(group) # add group to user's group
        user.groups_admin.append(group) # add group to the groups that user is an admin of

        db.session.commit() 

        return {
            'resultStatus': 'SUCCESS',
            'message': "Group successfully created",
            'groupname': groupname,
            'destination': destination,
            'groupCode': groupCode,
            'state': state,
            'group_admin': group.admin_id, 
            'group_id': group.id,
            'admin_id': group.admin.id,
            'groupimage': group.groupimage,
            #'usercount': group.user_count
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
        # print(json_data)
        groupCode = json_data['groupCode']
        username = json_data['username']
        group = Group.query.filter_by(groupCode=groupCode).first()
        if (group is None):
            return{
                'resultStatus': 'FAILURE',
                'message': "Group does not exist"
            }
        
        # add user to group, commit to db
        user = User.query.filter_by(username=username).first()
        group.users.append(user)
        db.session.commit()

        #print(group.users)
        #print(json.dumps([dict(user) for user in group.users]))
        #print(group.polls)
        user_count = 0
        user_dict = [user.__dict__ for user in group.users]
        for user in user_dict:
            user.pop('_sa_instance_state')
            user_count += 1
        
        poll_count = 0
        poll_dict = [poll.__dict__ for poll in group.polls]
        for poll in poll_dict:
            poll.pop('_sa_instance_state')
            poll_count += 1

        return{
            'resultStatus': 'SUCCESS',
            'message': "Group successfully joined",
            'groupname': group.groupname,
            'destination': group.destination,
            'groupCode': group.groupCode,
            'day': group.day,
            'month': group.month,
            'year': group.year,
            'summary': group.summary,
            'groupimage': group.groupimage,
            'polls': poll_dict,
            'users': user_dict,
            'group_id': group.id,
            'user_count': user_count,
            'polls_count': poll_count
        }


class EditGroupHandler(Resource):
    def post(self): 
        json_data = request.get_json()
        groupCode = json_data['hashCode']
        group = Group.query.filter_by(groupCode=groupCode).first()
        if (group is None):
            return{
                'resultStatus': 'FAILURE',
                'message': "Group does not exist"
            }

        # get group attributes to change 
        group.groupname = json_data['groupname']
        group.destination = json_data['destination'] # nullable
        group.groupimage = json_data['groupimage'] # nullable
        group.summary = json_data['summary'] # nullable
        
        db.session.commit()

        return{
            'resultStatus': 'SUCCESS',
            'message': "Group successfully edited",
            'name': group.groupname,
            'destination': group.destination,
            'groupCode': group.groupCode,
            'description': group.summary,
            'imgPath': group.groupimage,
            'group_id': group.id
        }