import numpy as np
import sounddevice as sd
import serial
import json
from datetime import datetime

ser = serial.Serial('/dev/ttyACM0', 9600, timeout=1)

def read_arduino():
    if ser.in_waiting:
        line = ser.readline().decode('utf-8').rstrip()
        try:
            data = json.loads(line)
            return data
        except json.JSONDecodeError:
            return None
    return None

def measure_sound_pollution(duration=5, samplerate=44100):
    audio_data = sd.rec(int(duration * samplerate), samplerate=samplerate, channels=2, dtype='float64')
    sd.wait()
    rms_value = np.sqrt(np.mean(np.square(audio_data), axis=0))
    db_value = 20 * np.log10(rms_value/0.1)
    return db_value[0], db_value[1]

while True:
    environmental_data = read_arduino()
    if environmental_data:
        left_channel_db, right_channel_db = measure_sound_pollution(duration=1)
        environmental_data["soundLevelLeft_dB"] = left_channel_db
        environmental_data["soundLevelRight_dB"] = right_channel_db
        environmental_data["timestamp"] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        
        with open("data_log.json", "a") as file:
            json.dump(environmental_data, file)
            file.write("\n")
        
        print(json.dumps(environmental_data, indent=4))
