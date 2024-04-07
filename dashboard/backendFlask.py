from flask import Flask, render_template, abort
import json
import os

app = Flask(__name__)

@app.route('/')
def dashboard():
    data = {}
    json_file_path = os.path.join(app.root_path, '..', 'mockup_data_log.json')
    if not os.path.isfile(json_file_path):
        abort(404, description=f"Error: The data file '{json_file_path}' was not found.")

    try:
        with open(json_file_path, 'r', encoding='utf-8') as file:
            data = json.load(file)
            # Rename keys to remove special characters
            data['humidity_percent'] = data.pop('humidity_%')
            # Add similar lines for any other keys with problematic characters
    except json.JSONDecodeError:
        abort(500, description=f"Error: There was an issue decoding the JSON data from '{json_file_path}'.")
    except Exception as e:
        abort(500, description=f"An unexpected error occurred: {e}")

    return render_template('dashboard.html', data=data)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
