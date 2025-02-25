from flask import Blueprint, jsonify

main = Blueprint('main', __name__)

@main.route('/', methods=['GET'])
def main_route():
    return jsonify({"message": "Main endpoint"})