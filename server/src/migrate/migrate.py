from src import create_app
from flask_migrate import Migrate # type: ignore
from flask_sqlalchemy import SQLAlchemy # type: ignore
import os

app = create_app()

app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+mysqlconnector://{os.getenv("DB_USER")}:{os.getenv("DB_PASSWORD")}@{os.getenv("DB_HOST")}/{os.getenv("DB_NAME")}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

migrate = Migrate(app, db)