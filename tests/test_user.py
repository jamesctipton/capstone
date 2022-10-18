import pytest
from sqlalchemy import delete
from werkzeug.security import generate_password_hash
import unittest
from app import app, db
from app.models import User
from marshmallow import ValidationError


class UserModelCase(unittest.TestCase):
    def setUp(self):
        app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://teamprintf:Capstone123@capstonedb.mysql.database.azure.com'
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
    
    def test_password_hashing(self):
        u = User(username='susan')
        u.set_password('cat')
        self.assertFalse(u.check_password('dog'))
        self.assertTrue(u.check_password('cat'))


@pytest.mark.parametrize(
    "email,valid",
    [
        ("sergio@sergio.com", True),
        ("sergio@mail.fr", True),
        ("sergio.lema@mail.fr", True),
        ("sergio.lema@mail.mail.fr", True),
        ("sergio@mail", False),
        ("sergio.mail.com", False),
        ("sergio@mail@com", False),
    ]
)
def test_validate_email(email, valid):
    # given
    schema = app()
    data = {
        "username": "sergio",
        "password": "Abcde12345",
        "email": email
    }

    # when
    try:
        user = schema.load(data)
        assert valid

        # then
        assert user is not None
        assert user.username == data["username"]
        assert user.password == data["password"]
        assert user.email == email
    except ValidationError:
        assert not valid


def test_missing_fields():
    # given
    schema = app()
    data = {
        "username": "sergio",
        "password": "Abcde12345",
    }

    # when / then
    with pytest.raises(ValidationError):
        schema.load(data)



if __name__ == '__main__':
    unittest.main(verbosity=2)