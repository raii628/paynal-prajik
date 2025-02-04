from flask import Flask
from flask_cors import CORS # type: ignore
import os

def create_app():
    app = Flask(__name__)
    app.secret_key = 'chokerists'
    CORS(
        app=app,
        supports_credentials=True,
        origins=os.getenv('CLIENT_URL') # React App to able to access the server
    )
    
    # Routing blueprint for the server here
    
    return app