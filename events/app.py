from flask import Flask, render_template, request, redirect
app = Flask(__name__)

# In-memory data storage for events
events = []

@app.route('/')
def index():
    return render_template('index.html', events=events)

@app.route('/post_event', methods=['POST'])
def post_event():
    event_name = request.form['event_name']
    event_date = request.form['event_date']
    event_description = request.form['event_description']

    # Add the new event to the events list
    events.append({
        'name': event_name,
        'date': event_date,
        'description': event_description
    })
    
    return redirect('/')

if __name__ == "__main__":
    app.run(debug=True)
