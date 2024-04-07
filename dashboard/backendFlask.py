from flask import Flask, render_template
import json

app = Flask(__name__)

@app.route('/')
def dashboard():
    data = {}
    try:
        with open('data_log.json', 'r') as file:
            for line in file:
                pass
            data = json.loads(line)
    except Exception as e:
        print(f"Error reading data: {e}")
    
    return render_template('dashboard.html', data=data)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
