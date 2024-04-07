from flask import Flask, render_template, abort
import json
import os

# Initialize the Flask application
app = Flask(__name__)

# Define the route for the root URL
@app.route('/')
def dashboard():
    # Initialize an empty dictionary to hold the data
    data = {}
    # Construct the file path for the JSON data file
    # The file is located in the project root, not inside a 'data' directory.
    json_file_path = os.path.join(app.root_path, '..', 'mockup_data_log.json')

    # Check if the JSON data file exists, abort with a 404 error if not
    if not os.path.isfile(json_file_path):
        abort(404, description=f"Error: The data file '{json_file_path}' was not found.")

    # Attempt to open and read the JSON data file
    try:
        with open(json_file_path, 'r', encoding='utf-8') as file:
            data = json.load(file)
    # Handle JSON decode errors with a 500 server error
    except json.JSONDecodeError:
        abort(500, description=f"Error: There was an issue decoding the JSON data from '{json_file_path}'.")
    # Handle any other exceptions with a 500 server error
    except Exception as e:
        abort(500, description=f"An unexpected error occurred: {e}")

    # Render the 'dashboard.html' template, passing the data to it
    return render_template('dashboard.html', data=data)

# Run the Flask application if this script is the main program
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')