from flask import Flask, render_template, abort, jsonify
import json
from pathlib import Path

# Define the base directory relative to this script's location
base_dir = Path(__file__).resolve().parent

# Initialize your Flask app with specified paths for templates and static files
app = Flask(__name__,
            template_folder=base_dir / 'templates',
            static_folder=base_dir / 'static')

@app.route('/')
def dashboard():
    # Serves the main dashboard page from the templates directory
    return render_template('dashboard.html')

@app.route('/data')
def get_data():
    # Updated path that navigates correctly to the 'hardware' directory
    json_file_path = base_dir / '..' / 'hardware' / 'mockup_data_log.json'
    
    if not json_file_path.is_file():
        abort(404, description=f"Error: The data file '{json_file_path}' was not found.")

    try:
        with json_file_path.open('r', encoding='utf-8') as file:
            data = json.load(file)
            # Renaming keys to remove special characters and unify naming conventions
            data['humidity_percent'] = data.pop('humidity_%', None)  # Using pop to avoid KeyError if not found
            data['PM25_ug_m3'] = data.pop('PM2.5_µg/m3', None)
            data['PM10_ug_m3'] = data.pop('PM10_µg/m3', None)
            
            # Returning the modified data as a JSON response
            response = jsonify(data)
            response.headers['Content-Type'] = 'application/json; charset=utf-8'
            return response
    except json.JSONDecodeError:
        abort(500, description=f"Error: There was an issue decoding the JSON data from '{json_file_path}'.")
    except OSError as e:
        abort(500, description=f"Error: Could not read the data file '{json_file_path}': {e}")
    except Exception as e:
        abort(500, description=f"An unexpected error occurred: {e}")

# Specifies the application entry point ensuring the Flask app runs when executed directly
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')