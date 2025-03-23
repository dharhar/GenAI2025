import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from backend_api import *
from flask_cors import CORS
import jwt
import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from webm_to_wav.converter import save_wav

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# In a real application, use a proper database
users_db = {}
SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'dev-secret-key')

# Protected route example
# @app.route('/api/user/profile', methods=['GET'])
# def get_profile():
#     auth_header = request.headers.get('Authorization')
    
#     if not auth_header or not auth_header.startswith('Bearer '):
#         return jsonify({'message': 'Missing or invalid token'}), 401
    
#     token = auth_header.split(' ')[1]
    
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
#         email = payload['sub']
        
#         if email not in users_db:
#             return jsonify({'message': 'User not found'}), 404
        
#         user = users_db[email]
        
#         return jsonify({
#             'email': email,
#             'name': user['name']
#         }), 200
#     except jwt.ExpiredSignatureError:
#         return jsonify({'message': 'Token expired'}), 401
#     except jwt.InvalidTokenError:
#         return jsonify({'message': 'Invalid token'}), 401

@app.route("/", methods=['GET'])
def health_check():
    return jsonify({"status": "ok", "message": "Server is running"}), 200


@app.route("/transcribe", methods=['POST'])
def transcribe():
    audio_file = request.files['audio']
    audio_wav_path = save_wav(audio_file)
    return transcribe_api(deepspeech_model, audio_wav_path)

@app.route('/medical_inference', methods=['POST'])
def medical_inference():
    
    print("="*50)
    print("in medical")
    print("="*50)

    username = request.form.get("username")
    prompt = request.form.get("prompt")
    
    current_dir = os.path.dirname(os.path.abspath(__file__))
    load_dotenv()
    cipher = Fernet(os.getenv("FERNET_KEY"))
    data_path = current_dir + "./medical_data/user_data.json"
    data = load_data(data_path, cipher)
    
    for user in data:
        if user["username"] == username:
            user_class = UserMedicalProfile(user["user_id"], user["username"], user["password"], user["weight"], user["height"], user["name"], user["age"], user["gender"], user["medical_conditions"])
            ret = diagnoisis_cb(user_class, model, tokenizer, prompt)
            print("="*50)
            print(ret)
            print("="*50)
            return ret
        
    print("HELLO")
    

@app.route("/signup", methods=["POST"])
def signup():
    
    username = request.form.get('username')
    password = request.form.get('password')

    # DEFAULT VALUES
    weight = 60
    height = 170
    name = "John Smith"
    age = 23
    gender = "Male"

    print("=" * 50)
    print(username)
    print("=" * 50)

    # weight = request.form.get('weight', type=float)
    # height = request.form.get('height', type=float)
    # name = request.form.get('name')
    # age = request.form.get('age')
    # gender = request.form.get('gender')
    
    current_dir = os.path.dirname(os.path.abspath(__file__))
    load_dotenv()
    cipher = Fernet(os.getenv("FERNET_KEY"))
    data_path = current_dir + "./medical_data/user_data.json"
    data = load_data(data_path, cipher)
    print("TESTING")
    print(data)
    for user in data:
        if username == user["username"]: # found duplicate username
            return 404
    new_user = UserMedicalProfile(len(data) + 1, username, password, weight, height, name, age, gender, {"Headache/Migraine": "2 years of constant migraines"})
    new_user.save_to_data(data_path, cipher)
    print("RETURNING 200")
    # print(new_user)
    # print("+======")
    return jsonify({
        "message": "User created successfully",
        "user": {
            "id": len(data) + 1,
            "username": username,
            "name": name,
            "age": age,
            "gender": gender
        }
    }), 200

@app.route("/login", methods=['POST'])
def login():
    
    username = request.form.get('username')
    password = request.form.get('password')

    current_dir = os.path.dirname(os.path.abspath(__file__))
    load_dotenv()
    cipher = Fernet(os.getenv("FERNET_KEY"))
    data_path = current_dir + "./medical_data/user_data.json"
    data = load_data(data_path, cipher)
    
    for user in data:
        if user["username"] == username and user["password"] == password:
            return user
    return None

@app.route("/update")
def update_user_info(username: str, condition: str, details):
    
    username = request.form.get('username')
    condition = request.form.get('condition')
    details = request.form.get('details')
    
    current_dir = os.path.dirname(os.path.abspath(__file__))
    load_dotenv()
    cipher = Fernet(os.getenv("FERNET_KEY"))
    data_path = current_dir + "./medical_data/user_data.json"
    data = load_data(data_path, cipher)
    
    for user in data:
        if user["username"] == username:
            if condition in user["medical_conditions"]:
                user["medical_conditions"][condition] = user["medical_conditions"][condition].append(details)
            else:
                user["medical_conditions"][condition] = [details]
    
    encrypted_data = cipher.encrypt(data.encode())
    with open(data_path, "wb") as f:
        f.write(encrypted_data)
            
if __name__ == '__main__':
    model, tokenizer, deepspeech_model = setup()
    app.run(debug=True, port=5000)

