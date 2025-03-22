from flask import Flask, request, jsonify
from backend.backend_api import *
from flask_cors import CORS
import jwt
import datetime
import os
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# In a real application, use a proper database
users_db = {}
SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'dev-secret-key')

# Authentication routes
@app.route('/api/auth/signup', methods=['POST'])
def signup():
    data = request.get_json()
    
    # Validate input
    if not data or not data.get('email') or not data.get('password') or not data.get('name'):
        return jsonify({'message': 'Missing required fields'}), 400
    
    email = data['email']
    
    # Check if user already exists
    if email in users_db:
        return jsonify({'message': 'User already exists'}), 409
    
    # Create new user
    users_db[email] = {
        'name': data['name'],
        'email': email,
        'password': generate_password_hash(data['password'])
    }
    
    # Generate JWT token
    token = jwt.encode({
        'sub': email,
        'name': data['name'],
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)
    }, SECRET_KEY, algorithm='HS256')
    
    return jsonify({
        'token': token,
        'user': {
            'email': email,
            'name': data['name']
        }
    }), 201

@app.route('/api/auth/signin', methods=['POST'])
def signin():
    data = request.get_json()
    
    # Validate input
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'message': 'Missing email or password'}), 400
    
    email = data['email']
    
    # Check if user exists
    if email not in users_db:
        return jsonify({'message': 'Invalid email or password'}), 401
    
    user = users_db[email]
    
    # Verify password
    if not check_password_hash(user['password'], data['password']):
        return jsonify({'message': 'Invalid email or password'}), 401
    
    # Generate JWT token
    token = jwt.encode({
        'sub': email,
        'name': user['name'],
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)
    }, SECRET_KEY, algorithm='HS256')
    
    return jsonify({
        'token': token,
        'user': {
            'email': email,
            'name': user['name']
        }
    }), 200

# Protected route example
@app.route('/api/user/profile', methods=['GET'])
def get_profile():
    auth_header = request.headers.get('Authorization')
    
    if not auth_header or not auth_header.startswith('Bearer '):
        return jsonify({'message': 'Missing or invalid token'}), 401
    
    token = auth_header.split(' ')[1]
    
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        email = payload['sub']
        
        if email not in users_db:
            return jsonify({'message': 'User not found'}), 404
        
        user = users_db[email]
        
        return jsonify({
            'email': email,
            'name': user['name']
        }), 200
    except jwt.ExpiredSignatureError:
        return jsonify({'message': 'Token expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'message': 'Invalid token'}), 401

@app.route("/transcribe")
def transcribe():
    return transcribe_api()

@app.route("/medical_inference")

@app.route("/signup")

@app.route("/login")



if __name__ == '__main__':
    app.run(debug=True, port=5000)

