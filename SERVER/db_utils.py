"""
Database utility functions and initialization
"""
from datetime import datetime
from bson import ObjectId

def serialize_doc(doc):
    """Convert MongoDB document to JSON-serializable format"""
    if doc is None:
        return None
    
    if isinstance(doc, list):
        return [serialize_doc(item) for item in doc]
    
    if isinstance(doc, dict):
        serialized = {}
        for key, value in doc.items():
            if isinstance(value, ObjectId):
                serialized[key] = str(value)
            elif isinstance(value, datetime):
                serialized[key] = value.isoformat()
            elif isinstance(value, dict):
                serialized[key] = serialize_doc(value)
            elif isinstance(value, list):
                serialized[key] = [serialize_doc(item) for item in value]
            else:
                serialized[key] = value
        return serialized
    
    return doc

def validate_object_id(id_string):
    """Validate if string is a valid MongoDB ObjectId"""
    try:
        ObjectId(id_string)
        return True
    except:
        return False

def create_indexes(db):
    """Create database indexes for better performance"""
    
    # Users collection indexes
    db['users'].create_index('email', unique=True)
    db['users'].create_index('username', unique=True)
    
    # Confessions collection indexes
    db['confessions'].create_index([('createdAt', -1)])  # For sorting by date
    db['confessions'].create_index('category')  # For filtering by category
    db['confessions'].create_index('userId')  # For user's confessions
    
    print("✅ Database indexes created successfully")

if __name__ == "__main__":
    from database import db
    create_indexes(db)
