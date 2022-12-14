from api.__init__ import db
from flask import request
from flask_restful import Resource
from api.models import Poll, User, Group 
from api.models import PollOption
import random, string

# unfinished probably
class CreatePollHandler(Resource):
    def get(self):
        return {
            'resultStatus': 'SUCCESS',
            'message': "create poll handler get hit"
        }
    def post(self):
        json_data = request.get_json()
        pollname = json_data['pollname']
        username = json_data['user']   # need frontend support for this
        group_code = json_data['groupid']  # and this
        totalVotes = 0
        category = json_data['category']
        pollOptions = json_data['pollOptions']

        # find id of user by username
        creator = User.query.filter_by(username=username).first()
        creator_id = creator.id

        # find id of group by group code 
        group = Group.query.filter_by(groupCode=group_code).first()
        group_id = group.id

        # make sure poll code is unique
        pollCode = ''.join(random.choices(string.ascii_letters + string.digits, k=8))
        db_pollCode = Poll.query.filter_by(pollCode=pollCode).first()
        if db_pollCode:
            while(pollCode == db_pollCode.pollCode):
                pollCode = ''.join(random.choices(string.ascii_letters + string.digits, k=8))

        poll = Poll(pollCode=pollCode, pollname=pollname, creator_id=creator_id, group_id=group_id,
                    totalVotes=totalVotes, pollCategory = category)

        #print(pollOptions)
        for option in pollOptions:
            op = PollOption(optionname = option['name'], latitude = option['latitude'], 
                            longitude = option['longitude'], countryCode = option['countryCode'], votes = 0)
            poll.options.append(op)

        # add poll to db, assign creator and group
        db.session.add(poll)
        db.session.commit()   

        return {
            'resultStatus': 'SUCCESS',
            'message': "Poll successfully created",
            'pollID': pollCode                                 
        } 

# unfinished
class VotePollHandler(Resource):
    def get(self):
        return {
            'resultStatus': 'SUCCESS',
            'message': "vote poll handler get hit"
        }

    def post(self):
        json_data = request.get_json()
        pollCode = json_data['pollCode']
        option = json_data['option']
        username = json_data['username'] # user who voted

        poll = Poll.query.filter_by(pollCode=pollCode)
        if (poll is None):
            return{
                'resultStatus': 'FAILURE',
                'message': "Poll does not exist"
            }

        # need to make sure user only votes once 
        
        #poll.option[option].votes += 1
        poll.totalVotes += 1

        # update db
        db.session.add(poll)
        db.session.commit()   

        # return success
        return {
            'resultStatus': 'SUCCESS',
            'message': "Poll successfully voted on",
            'pollID': pollCode,
            'userWhoVoted' : username                
        } 

class VotePollHandler(Resource):
    def get(self):
        return {
            'resultStatus': 'SUCCESS',
            'message': "vote poll handler get hit"
        }

    def post(self):
        json_data = request.get_json()
        pollCode = json_data['pollCode']
        option_id = json_data['optionid']
        username = json_data['username'] # user who voted

        # check if user is in the poll's user voted list
        user = User.query.filter_by(username=username)
        if (user is None):
            return{
                'resultStatus': 'FAILURE',
                'message': "user does not exist"
            }
        for u in poll.users:
            if user.id == u.id:
                return{
                    'message': "User has already voted"
                }
        poll.users.append(user)

        poll = Poll.query.filter_by(pollCode=pollCode)
        if (poll is None):
            return{
                'resultStatus': 'FAILURE',
                'message': "Poll does not exist"
            }
        poll.totalVotes += 1

        option = PollOption.query.filter_by(id=option_id)
        if (option is None):
            return{
                'resultStatus': 'FAILURE',
                'message': "Poll option does not exist"
            }
        option.votes += 1

        # update db
        db.session.add(poll)
        db.session.add(option)
        db.session.commit()   

        # return success
        return {
            'resultStatus': 'SUCCESS',
            'message': "Poll successfully voted on",
            'pollID': pollCode,
            'userWhoVoted' : username                
        }

class RemoveVotePollHandler(Resource):
    def get(self):
        return {
            'resultStatus': 'SUCCESS',
            'message': "remove vote poll handler get hit"
        }

    def post(self):
        json_data = request.get_json()
        pollCode = json_data['pollCode']
        option_id = json_data['optionid']
        username = json_data['username'] # user who voted

        # check if user is in the poll's user voted list
        user = User.query.filter_by(username=username)
        if (user is None):
            return{
                'resultStatus': 'FAILURE',
                'message': "user does not exist"
            }
        for u in poll.users:
            if user.id == u.id:
                poll.users.remove(user)

        poll = Poll.query.filter_by(pollCode=pollCode)
        if (poll is None):
            return{
                'resultStatus': 'FAILURE',
                'message': "Poll does not exist"
            }
        poll.totalVotes -= 1

        option = PollOption.query.filter_by(id=option_id)
        if (option is None):
            return{
                'resultStatus': 'FAILURE',
                'message': "Poll option does not exist"
            }
        option.votes -= 1

        # update db
        db.session.add(poll)
        db.session.add(option)
        db.session.commit()   

        # return success
        return {
            'resultStatus': 'SUCCESS',
            'message': "Vote successfully removed",
            'pollID': pollCode,
            'userVoteRemoved' : username                
        }