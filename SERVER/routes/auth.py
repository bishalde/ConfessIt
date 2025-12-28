from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from bson import ObjectId
from database import users_collection

bp = Blueprint('auth', __name__)

@bp.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()
        
        # Validation
        if not data.get('username') or not data.get('email') or not data.get('password'):
            return jsonify({'message': 'All fields are required'}), 400
        
        # Check if user already exists
        if users_collection.find_one({'email': data['email']}):
            return jsonify({'message': 'Email already registered'}), 400
        
        if users_collection.find_one({'username': data['username']}):
            return jsonify({'message': 'Username already taken'}), 400
        
        # Hash password
        hashed_password = generate_password_hash(data['password'])
        
        # Create user
        user = {
            'fullName': data.get('fullName', ''),
            'username': data['username'],
            'email': data['email'],
            'password': hashed_password,
            'bio': '',
            'gender': '',
            'age': '',
            'createdAt': datetime.utcnow(),
        }
        
        result = users_collection.insert_one(user)
        user['_id'] = str(result.inserted_id)
        
        # Create access token
        access_token = create_access_token(identity=str(result.inserted_id))
        
        # Remove password from response
        user.pop('password')
        
        return jsonify({
            'message': 'User created successfully',
            'token': access_token,
            'user': user
        }), 201
    
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        
        # Validation
        if not data.get('email') or not data.get('password'):
            return jsonify({'message': 'Email and password are required'}), 400
        
        # Find user
        user = users_collection.find_one({'email': data['email']})
        
        if not user or not check_password_hash(user['password'], data['password']):
            return jsonify({'message': 'Invalid email or password'}), 401
        
        # Create access token
        access_token = create_access_token(identity=str(user['_id']))
        
        # Prepare user data
        user['_id'] = str(user['_id'])
        user.pop('password')
        
        return jsonify({
            'message': 'Login successful',
            'token': access_token,
            'user': user
        }), 200
    
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@bp.route('/forgot-password', methods=['POST'])
def forgot_password():
    try:
        data = request.get_json()
        
        if not data.get('email'):
            return jsonify({'message': 'Email is required'}), 400
        
        # Check if user exists
        user = users_collection.find_one({'email': data['email']})
        
        if not user:
            # Don't reveal if email exists or not
            return jsonify({'message': 'If the email exists, a reset link has been sent'}), 200
        
        # In production, you would generate a token and send an email
        # For now, just return success
        return jsonify({'message': 'Password reset instructions sent to your email'}), 200
    
    except Exception as e:
        return jsonify({'message': str(e)}), 500
