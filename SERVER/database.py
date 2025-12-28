"""
Database configuration and connection
"""
from pymongo import MongoClient

# MongoDB Configuration
MONGODB_URI = "mongodb+srv://bishalde:bishalde5741@confessitdb.bk2w8ll.mongodb.net/?appName=ConfessItDb"

# Initialize MongoDB client and database
client = MongoClient(MONGODB_URI)
db = client['confessit']

# Collections
users_collection = db['users']
confessions_collection = db['confessions']
