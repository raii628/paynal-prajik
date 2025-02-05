from flask import jsonify
from src import create_app

app = create_app();

@app.route('/')
def index():
    return jsonify({ 'message': 'Hello Flask' }), 200

if __name__ == '__main__':
    app.run(debug=True)