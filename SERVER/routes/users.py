from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from bson import ObjectId
from database import users_collection, confessions_collection

bp = Blueprint('users', __name__)

@bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    try:
        current_user_id = get_jwt_identity()
        
        # Find user
        user = users_collection.find_one({'_id': ObjectId(current_user_id)})
        
        if not user:
            return jsonify({'message': 'User not found'}), 404
        
        # Prepare user data
        user['_id'] = str(user['_id'])
        user.pop('password', None)
        
        return jsonify({'user': user}), 200
    
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()
        
        # Prepare update data
        update_data = {}
        
        if 'fullName' in data:
            update_data['fullName'] = data['fullName']
        
        if 'username' in data:
            # Check if username is already taken by another user
            existing_user = users_collection.find_one({
                'username': data['username'],
                '_id': {'$ne': ObjectId(current_user_id)}
            })
            if existing_user:
                return jsonify({'message': 'Username already taken'}), 400
            update_data['username'] = data['username']
        
        if 'email' in data:
            # Check if email is already taken by another user
            existing_user = users_collection.find_one({
                'email': data['email'],
                '_id': {'$ne': ObjectId(current_user_id)}
            })
            if existing_user:
                return jsonify({'message': 'Email already registered'}), 400
            update_data['email'] = data['email']
        
        if 'bio' in data:
            update_data['bio'] = data['bio']
        
        if 'gender' in data:
            update_data['gender'] = data['gender']
        
        if 'age' in data:
            update_data['age'] = data['age']
        
        # Update user
        if update_data:
            users_collection.update_one(
                {'_id': ObjectId(current_user_id)},
                {'$set': update_data}
            )
        
        # Get updated user
        user = users_collection.find_one({'_id': ObjectId(current_user_id)})
        user['_id'] = str(user['_id'])
        user.pop('password', None)
        
        return jsonify({
            'message': 'Profile updated successfully',
            'user': user
        }), 200
    
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@bp.route('/confessions', methods=['GET'])
@jwt_required()
def get_user_confessions():
    try:
        current_user_id = get_jwt_identity()
        
        # Get user's confessions
        confessions = list(confessions_collection.find({'userId': ObjectId(current_user_id)})
                          .sort('createdAt', -1))
        
        # Convert ObjectId to string
        for confession in confessions:
            confession['_id'] = str(confession['_id'])
            confession['userId'] = str(confession['userId'])
        
        return jsonify({'confessions': confessions}), 200
    
    except Exception as e:
        return jsonify({'message': str(e)}), 500
