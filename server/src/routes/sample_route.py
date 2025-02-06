from flask import Blueprint, jsonify

sample_bp = Blueprint('sample', __name__)

@sample_bp.route('/')
def sample():
    return jsonify({ 'message': 'Hello Blueprint' }), 200