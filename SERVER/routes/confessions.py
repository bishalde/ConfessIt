from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime
from bson import ObjectId
from database import confessions_collection, users_collection

bp = Blueprint('confessions', __name__)

@bp.route('', methods=['GET'])
@jwt_required()
def get_confessions():
    try:
        page = int(request.args.get('page', 1))
        per_page = 20
        category = request.args.get('category', '')
        
        # Build query
        query = {}
        if category:
            query['category'] = category
        
        # Get confessions
        confessions = list(confessions_collection.find(query)
                          .sort('createdAt', -1)
                          .skip((page - 1) * per_page)
                          .limit(per_page))
        
        # Convert ObjectId to string and add user info
        for confession in confessions:
            confession['_id'] = str(confession['_id'])
            user_id = confession['userId']
            confession['userId'] = str(user_id)
            
            # Get user info
            user = users_collection.find_one({'_id': ObjectId(user_id)})
            if user:
                confession['username'] = user.get('username', 'Anonymous')
            else:
                confession['username'] = 'Anonymous'
            
            # Ensure comments field exists
            if 'comments' not in confession:
                confession['comments'] = []
        
        return jsonify({'confessions': confessions}), 200
    
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@bp.route('/<confession_id>', methods=['GET'])
@jwt_required()
def get_confession(confession_id):
    try:
        confession = confessions_collection.find_one({'_id': ObjectId(confession_id)})
        
        if not confession:
            return jsonify({'message': 'Confession not found'}), 404
        
        confession['_id'] = str(confession['_id'])
        user_id = confession['userId']
        confession['userId'] = str(user_id)
        
        # Get user info
        user = users_collection.find_one({'_id': ObjectId(user_id)})
        if user:
            confession['username'] = user.get('username', 'Anonymous')
        else:
            confession['username'] = 'Anonymous'
        
        return jsonify({'confession': confession}), 200
    
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@bp.route('', methods=['POST'])
@jwt_required()
def create_confession():
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()
        
        # Validation
        if not data.get('content'):
            return jsonify({'message': 'Content is required'}), 400
        
        if len(data['content'].strip()) < 10:
            return jsonify({'message': 'Confession must be at least 10 characters'}), 400
        
        # Create confession
        confession = {
            'userId': ObjectId(current_user_id),
            'content': data['content'],
            'category': data.get('category', 'other'),
            'likes': 0,
            'likedBy': [],
            'comments': [],
            'createdAt': datetime.utcnow(),
        }
        
        result = confessions_collection.insert_one(confession)
        confession['_id'] = str(result.inserted_id)
        confession['userId'] = str(confession['userId'])
        
        return jsonify({
            'message': 'Confession posted successfully',
            'confession': confession
        }), 201
    
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@bp.route('/<confession_id>', methods=['DELETE'])
@jwt_required()
def delete_confession(confession_id):
    try:
        current_user_id = get_jwt_identity()
        
        # Find confession
        confession = confessions_collection.find_one({'_id': ObjectId(confession_id)})
        
        if not confession:
            return jsonify({'message': 'Confession not found'}), 404
        
        # Check if user owns the confession
        if str(confession['userId']) != current_user_id:
            return jsonify({'message': 'Unauthorized'}), 403
        
        # Delete confession
        confessions_collection.delete_one({'_id': ObjectId(confession_id)})
        
        return jsonify({'message': 'Confession deleted successfully'}), 200
    
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@bp.route('/<confession_id>/like', methods=['POST'])
@jwt_required()
def like_confession(confession_id):
    try:
        current_user_id = get_jwt_identity()
        
        # Find confession
        confession = confessions_collection.find_one({'_id': ObjectId(confession_id)})
        
        if not confession:
            return jsonify({'message': 'Confession not found'}), 404
        
        liked_by = confession.get('likedBy', [])
        
        # Toggle like
        if current_user_id in liked_by:
            # Unlike
            confessions_collection.update_one(
                {'_id': ObjectId(confession_id)},
                {
                    '$pull': {'likedBy': current_user_id},
                    '$inc': {'likes': -1}
                }
            )
            return jsonify({'message': 'Unliked', 'liked': False}), 200
        else:
            # Like
            confessions_collection.update_one(
                {'_id': ObjectId(confession_id)},
                {
                    '$push': {'likedBy': current_user_id},
                    '$inc': {'likes': 1}
                }
            )
            return jsonify({'message': 'Liked', 'liked': True}), 200
    
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@bp.route('/<confession_id>/comments', methods=['POST'])
@jwt_required()
def add_comment(confession_id):
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()
        
        if not data.get('text'):
            return jsonify({'message': 'Comment text is required'}), 400
        
        # Get user info
        user = users_collection.find_one({'_id': ObjectId(current_user_id)})
        
        comment = {
            'id': str(ObjectId()),
            'userId': current_user_id,
            'username': user.get('username', 'Anonymous') if user else 'Anonymous',
            'text': data['text'],
            'createdAt': datetime.utcnow().isoformat(),
        }
        
        # Add comment to confession
        confessions_collection.update_one(
            {'_id': ObjectId(confession_id)},
            {'$push': {'comments': comment}}
        )
        
        return jsonify({'message': 'Comment added', 'comment': comment}), 201
    
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@bp.route('/<confession_id>/comments', methods=['GET'])
@jwt_required()
def get_comments(confession_id):
    try:
        confession = confessions_collection.find_one({'_id': ObjectId(confession_id)})
        
        if not confession:
            return jsonify({'message': 'Confession not found'}), 404
        
        comments = confession.get('comments', [])
        return jsonify({'comments': comments}), 200
    
    except Exception as e:
        return jsonify({'message': str(e)}), 500
