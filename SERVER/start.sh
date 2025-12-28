#!/bin/bash

echo "🚀 Starting ConfessIt Backend Server..."
echo ""

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Install/upgrade dependencies
echo "Installing dependencies..."
pip install -r requirements.txt

# Run the Flask app
echo ""
echo "✅ Starting Flask server on http://localhost:5000"
echo ""
python app.py
