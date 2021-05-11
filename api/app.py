from flask import Flask, request, jsonify, url_for, make_response
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta
import jwt
from functools import wraps
import requests

app = Flask(__name__)

ENV = 'dev'

if ENV == 'dev':
    app.debug = False
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:password123@localhost/flask_users'
else:
    app.debug = False
    app.config['SQLALCHEMY_DATABASE_URI'] = ''

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


app.config["JWT_SECRET_KEY"] = "thisIsSecret"
# jwt = JWTManager(app)


class Users(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(200), unique=True, nullable=False)
    firstName = db.Column(db.String(200), nullable=False)
    lastName = db.Column(db.String(200), nullable=False)
    password = db.Column(db.String(200), nullable=False)
    phoneNumber = db.Column(db.String(200), unique=True, nullable=False)

    def __init__(self, email, firstName, lastName, password, phoneNumber):
        self.email = email
        self.firstName = firstName
        self.lastName = lastName
        self.password = password
        self.phoneNumber = phoneNumber


# decorator for verifying the JWT
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        # jwt is passed in the request header
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
       # return 401 if token is not passed
        if not token:
            return jsonify({'message': 'Token is missing !!', 'auth': False}), 401
        try:
            # decoding the payload to fetch the stored details
            data = jwt.decode(
                token, app.config['JWT_SECRET_KEY'], algorithms="HS256")

        except:
            return jsonify({
                'message': 'Token is invalid !!', 'auth': False
            }), 401
        # returns the current logged in users contex to the routes
        return f(*args, **kwargs)

    return decorated


@app.route('/getData')
@token_required
def handle_api():
    r = requests.get(
        'https://goquotes-api.herokuapp.com/api/v1/random?count=1')
    data = r.json()
    return jsonify(data)


@app.route('/register_submit', methods=['POST'])
def handle_register():
    email = request.json['email']
    user = Users.query\
        .filter_by(email=email)\
        .first()
    if user:
        return jsonify({'register': False, 'msg': 'User with this email already exists'})
    firstName = request.json['firstName']
    lastName = request.json['lastName']

    password = generate_password_hash(request.json['password'])
    phoneNumber = request.json['phoneNumber']
    # add to db
    new_user = Users(email, firstName, lastName, password, phoneNumber)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'register': True})


@app.route('/login_submit', methods=['POST'])
def handle_login():
    email = request.json['email']
    password = request.json['password']
    if not email or not password:
        # if any email or / and password is missing
        return jsonify({'login': False, 'msg': 'No email or password'})
    # fetch user from db through email
    user = Users.query\
        .filter_by(email=email)\
        .first()
    if not user:
        # returns if user does not exist
        return jsonify({'login': False, 'msg': 'User does not exist'})
    if check_password_hash(user.password, password):
        token = jwt.encode({
            'userEmail': user.email,
            'user': user.firstName,
            'exp': datetime.utcnow() + timedelta(minutes=5)
        }, app.config['JWT_SECRET_KEY'])
        return jsonify({'token': token, 'login': True})
    else:
        return jsonify({'login': False, 'msg': 'Invalid Password'})
    return jsonify({'login': False, 'msg': 'Something went Wrong'})


if __name__ == "__main__":
    app.run(debug=True)
