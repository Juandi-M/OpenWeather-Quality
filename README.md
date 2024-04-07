# Weather and Air Quality Station Project

![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) ![C++](https://img.shields.io/badge/c++-%2300599C.svg?style=for-the-badge&logo=c%2B%2B&logoColor=white) ![Arduino](https://img.shields.io/badge/-Arduino-00979D?style=for-the-badge&logo=Arduino&logoColor=white) ![Raspberry Pi](https://img.shields.io/badge/-RaspberryPi-C51A4A?style=for-the-badge&logo=Raspberry-Pi) ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white) ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

This comprehensive project combines the power of Arduino Uno R3 and Raspberry Pi 4 to establish a dual-purpose monitoring station that tracks both indoor and outdoor weather conditions as well as air quality metrics. It harnesses a variety of sensors to collect environmental data, and features a Flask-based dashboard for the visualization of the gathered data, providing insights into weather patterns and air quality.

## Components Required

- **Arduino Uno R3**: Serves as the primary controller for reading from various environmental sensors.
- **Raspberry Pi 4**: Acts as the central processing unit for handling data collection, processing, and visualization through a web dashboard.
- **BME280 Sensor**: Measures temperature, humidity, and atmospheric pressure.
- **TSL2591 Sensor**: Detects light intensity.
- **VEML6075 Sensor**: Monitors UV index, providing UVA and UVB radiation levels.
- **MQ135 Sensor**: Assesses air quality by detecting various gases.
- **SDS011 Sensor**: Measures particulate matter concentrations (PM2.5 and PM10).
- **Adafruit I2S MEMS Microphone Breakout - SPH0645LM4H**: Captures audio for sound pollution monitoring.
- **Assorted cables and connectors**: For interfacing the sensors with the Arduino and Raspberry Pi.
- **Resistors for I2C pull-up (optional)**: 2.2kΩ to 10kΩ, if needed, to stabilize the I2C bus.

## Sensor Connections to Arduino Uno R3

| Sensor   | Connection | Pins                    | Additional Components | Notes                       |
|----------|------------|-------------------------|-----------------------|-----------------------------|
| BME280   | I2C        | A4 (SDA), A5 (SCL), 3.3V, GND | None                  |                             |
| TSL2591  | I2C        | A4 (SDA), A5 (SCL), 3.3V, GND | None                  |                             |
| VEML6075 | I2C        | A4 (SDA), A5 (SCL), 3.3V, GND | None                  |                             |
| MQ135    | Analog     | Any A0 to A5, 5V, GND   | None                  |                             |
| SDS011   | Serial     | D2 (RX), D3 (TX), 5V, GND | None                  | Use SoftwareSerial library |

## Connecting Arduino to Raspberry Pi 4

1. **Arduino Uno R3** is connected to the **Raspberry Pi 4** using a USB cable. The Arduino acts as a serial device to the Raspberry Pi.
2. Verify the device name on the Raspberry Pi, usually `/dev/ttyACM0` or `/dev/ttyUSB0`, by checking connected devices.

## Software Setup

### Arduino

- Load the provided `arduinoSensors.ino` sketch onto the Arduino. This sketch is designed to read data from the connected sensors and send it to the Raspberry Pi via serial communication.

### Raspberry Pi

- **Python Dependencies**: Install necessary libraries such as `pySerial` for serial communication, and `Flask` for the web dashboard.
    ```sh
    pip install pyserial Flask
    ```
- **Sound Sensor Script**: Use `raspberyMicSensor.py` to capture and analyze sound levels for sound pollution data.
- **Flask Dashboard**: Run `backendFlask.py` within the `dashboard` directory to start the web server and serve the dashboard interface.

## Data Handling and Visualization

- The environmental data collected by the Arduino is sent to the Raspberry Pi, where it is processed and stored. The sound pollution data is also processed on the Raspberry Pi.
- A Flask-based web dashboard, accessible through any web browser, visualizes the collected environmental and sound data. The dashboard provides a real-time view of the data through the `dashboard.html` template styled with `style.css`.

## Project Structure
```
OpenWeather-Quality
│
├── README.md # Project documentation
├── arduinoSensors.ino # Arduino script for environmental sensors
├── raspberyMicSensor.py # Python script for Raspberry Pi sound sensor
│
└── dashboard # Dashboard application directory
├── backendFlask.py # Flask backend script
│
├── static # Directory for static files
│ └── style.css # CSS styles for the dashboard
│
└── templates # Directory for HTML templates
└── dashboard.html # HTML template for the dashboard
```

## Conclusion

This guide outlines the setup for a comprehensive weather and air quality monitoring station. The system is designed for flexibility, allowing for adjustments and additions based on specific project requirements and goals. Detailed documentation for sensor connections, software setup, and dashboard operation is provided to ensure a smooth project execution and deployment.

