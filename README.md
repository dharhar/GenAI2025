# EchoHealth
EchoHealth is an AI-powered healthcare web app that allows users to enter voice messages and receive personalized health assistance utilizing DeepSpeech and Google's Flan-T5 model.

# Setup
You will need to setup the proper python envrionment to run the Flask backend
```
git clone https://github.com/dharhar/GenAI2025.git
conda create -name echohealth python==3.8
conda activate echohealth
cd flask-server
pip install -r requirements.txt
```

You will also need to install node.js to work the frontend
Once installed run:

```
cd ../client
npm install
```

To run the server run:
```
cd ../flask-server
python server.py
```

Once the server has run, open a new terminal to host the frontend:
```
cd client
npm start
```
