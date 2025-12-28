from flask import Flask
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from datetime import timedelta
import os

app = Flask(__name__)

# Configuration
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'your-secret-key-change-in-production')
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'jwt-secret-key-change-in-production')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=7)

# Initialize extensions
CORS(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# Import routes
from routes import auth, confessions, users

# Register blueprints
app.register_blueprint(auth.bp, url_prefix='/api/auth')
app.register_blueprint(confessions.bp, url_prefix='/api/confessions')
app.register_blueprint(users.bp, url_prefix='/api/users')

@app.route('/')
def index():
    return {'message': 'Welcome to ConfessIt API'}, 200

@app.route('/api/health')
def health():
    return {'status': 'healthy'}, 200

# For Vercel deployment
app_vercel = app

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080)
