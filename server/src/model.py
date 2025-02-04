import mysql.connector
import os

def dbConnect():
    return mysql.connector.connect(
        # Credentials must be match to your localhost database
        host=os.getenv('DB_HOST'),
        user=os.getenv('DB_USER'),
        password=os.getenv('DB_PASSWORD'),
        database=os.getenv('DB_NAME'),
        auth_plugin='mysql_native_password'
    )