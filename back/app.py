from flask import Flask, request
from flask_cors import CORS
from models import *
from dotenv import load_dotenv
from flask_restx import Api


load_dotenv()


app = Flask(__name__)
CORS(app, supports_credentials=True, allow_headers=["Content-Type", "Authorization"], origins=["http://localhost:5000", "http://localhost:3000", "http://localhost:5173", "https://aspirpn-front-4g8uu.ondigitalocean.app"])


from routes.projects import *
from routes.general_desc import *

app.register_blueprint(projects)
app.register_blueprint(general_description)

# api = Api(app, doc="/api/swagger/")


@app.cli.command('db_create')
def db_create():
    base.metadata.create_all(db)
    print('Database created')

@app.cli.command('db_drop')
def db_drop():
    base.metadata.drop_all(db)
    print('Database dropped')

@app.after_request
def add_cors_headers(response):
    response.headers.add("Access-Control-Allow-Origin", request.headers.get("Origin", "*"))
    response.headers.add("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type, Authorization")
    response.headers.add("Access-Control-Allow-Credentials", "true")
    return response

if __name__ == '__main__':
    app.run(debug=False)
