from cryptography.fernet import Fernet
import json
import pdb

class UserMedicalProfile():
    """Class coantaining relevant user medical history and information 
    """
    user_id: int
    username: str
    password: str
    weight: int
    height: int
    name: str
    age: int
    gender: str
    medical_conditions: dict
    

    def __init__(self, user_id: int, username: str, password: str, weight: float, height: float, name: str, age: int, gender: str, medical_conditions: dict):
        self.user_id = user_id
        self.username = username
        self.password = password
        self.weight = weight
        self.height = height
        self.name = name
        self.age = age
        self.gender = gender
        self.medical_conditions = medical_conditions
    
    def to_dict(self):
        data = {
            "user_id": self.user_id,
            "username": self.username,
            "password": self.password,
            "weight": self.weight,
            "height": self.height,
            "name": self.name,
            "age": self.age,
            "gender": self.gender,
            "medical_conditions": self.medical_conditions
        }
        return data
    
    def update_medical_conditions(self, category: str, details: str):
        """Updates the medical conditions of a user

        Args:
            category (str): A new category of information (pregnenacy, allergies, etc.)
            details (str): Details of the patient
        """
        self.medical_conditions[category] = details
    
    
    def save_to_data(self, user_data_path: str, cipher: Fernet):
        """Saves UserMedicalProfile in an Encrypted JSON file
        Args:
            user_data_path (str): path of json to store user data
            cipher (Fernet): Fernet object for encoding and decoding
        """
        
        with open(user_data_path, "rb") as f:
            encrypted_data = f.read()

            decrypted_data = cipher.decrypt(encrypted_data).decode()
            data = json.loads(decrypted_data)  # Convert JSON string to Python dict

            # Append new patient
            new_patient = self.to_dict()
            data.append(new_patient)

            # Encrypt and save again
            json_str = json.dumps(data)
            encrypted_data = cipher.encrypt(json_str.encode())

            with open(user_data_path, "wb") as f:
                f.write(encrypted_data)


def load_data(user_data_path: str, cipher: Fernet):
    with open(user_data_path, "rb") as file:
        encrypted_data = file.read()
    return json.loads(cipher.decrypt(encrypted_data))

def load_user_from_data(user_data_path: str, cipher: Fernet, username: str, password: str):
    """Loads a user from user_data.json

    Args:
        user_data_path (str): path to user data
        cipher (Fernet): cipher for decoding
        username (str): users username to lookup
        password (str): users password to lookup 

    Returns:
        UserMedicalProfile: user's medical information
    """
    with open(user_data_path, "rb") as file:
        encrypted_data = file.read()
    data = json.loads(cipher.decrypt(encrypted_data))
    
    for patient in data:
        if patient["username"] == username and patient["password"] == password:
            return UserMedicalProfile(patient["user_id"], patient["username"], patient["password"], patient["name"], patient["age"], patient["medical_conditions"])
    return None
    