from flask import Flask, render_template, abort, jsonify
import json
import os

app = Flask(__name__)

@app.route('/')
def dashboard():
    return render_template('dashboard.html')

@app.route('/data')
def get_data():
    json_file_path = os.path.join(app.root_path, '..', 'mockup_data_log.json')
    if not os.path.isfile(json_file_path):
        abort(404, description=f"Error: The data file '{json_file_path}' was not found.")

    try:
        with open(json_file_path, 'r', encoding='utf-8') as file:
            data = json.load(file)
            # Rename keys to remove special characters
            data['humidity_percent'] = data.pop('humidity_%')
            data['PM25_ug_m3'] = data.pop('PM2.5_µg/m3')
            data['PM10_ug_m3'] = data.pop('PM10_µg/m3')
            # Return the modified data
            return jsonify(data)
    except json.JSONDecodeError:
        abort(500, description=f"Error: There was an issue decoding the JSON data from '{json_file_path}'.")
    except OSError as e:
        abort(500, description=f"Error: Could not read the data file '{json_file_path}': {e}")
    except Exception as e:
        abort(500, description=f"An unexpected error occurred: {e}")

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')