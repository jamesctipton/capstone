from api.__init__ import db
from flask import request
from flask_restful import Resource
from api.models import Poll
from api.models import PollOption
import pickle, json
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
        creator_id = json_data['user']   # need frontend support for this
        group_id = json_data['groupid']  # and this
        totalVotes = 0
<<<<<<< HEAD
        category = ['category']
        pollOptions = ['pollOptions']
=======
        pollOptions = ['options']
>>>>>>> b2d7950cbbe2022527da8725d5e8cef0293f8b00

        # make sure poll code is unique
        pollCode = ''.join(random.choices(string.ascii_letters + string.digits, k=8))
        db_pollCode = Poll.query.filter_by(pollCode=pollCode).first()
        if db_pollCode:
            while(pollCode == db_pollCode.pollCode):
                pollCode = ''.join(random.choices(string.ascii_letters + string.digits, k=8))

        poll = Poll(pollCode=pollCode, pollname=pollname, creator_id=creator_id, group_id=group_id,
                    totalVotes=totalVotes, pollCategory = category)

        for option in pollOptions:
            option = PollOption(optionname = option['name'], description = option['description'], 
                                votes = 0, image = option['image'])
            poll.options.append(option)

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
        
        poll.option[option].votes += 1
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