from flask import Flask, request, jsonify
import sqlite3
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes so the frontend can interact with the backend

# Create SQLite database and events table
def init_db():
    conn = sqlite3.connect('events.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            date TEXT NOT NULL,
            description TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

# Initialize the database
init_db()

# Get all events
@app.route('/events', methods=['GET'])
def get_events():
    conn = sqlite3.connect('events.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM events')
    events = cursor.fetchall()
    conn.close()

    return jsonify([{
        'name': event[1],
        'date': event[2],
        'description': event[3]
    } for event in events])

# Post a new event
@app.route('/events', methods=['POST'])
def post_event():
    event_name = request.json.get('name')
    event_date = request.json.get('date')
    event_description = request.json.get('description')

    conn = sqlite3.connect('events.db')
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO events (name, date, description) VALUES (?, ?, ?)
    ''', (event_name, event_date, event_description))
    conn.commit()
    conn.close()

    return jsonify({'message': 'Event posted successfully'}), 201

if __name__ == '__main__':
    app.run(debug=True)
