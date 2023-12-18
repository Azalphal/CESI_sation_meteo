// swagger-config.js
module.exports = {
    swaggerDefinition: {
        info: {
            title: 'Weather API "Michel"',
            version: '1.0.0',
            description: '|\n' +
                '    Welcome to the Awesome Weather API, a powerful tool to retrieve real-time weather data.\n' +
                '    This API is designed to provide accurate and up-to-date information on temperature, humidity, and atmospheric pressure.\n' +
                '\n' +
                '    ## Purpose:\n' +
                '    The Awesome Weather API aims to empower developers, researchers, and enthusiasts with comprehensive weather data to enhance their applications and projects.\n' +
                '\n' +
                '    ## Key Features:\n' +
                '    - Real-time temperature readings\n' +
                '    - Humidity and pressure information\n' +
                '    - Seamless integration with IoT devices\n' +
                '    - User-friendly and intuitive endpoints\n' +
                '\n' +
                '    ## Use Cases:\n' +
                '    - Integrating weather data into mobile apps\n' +
                '    - Building weather monitoring systems\n' +
                '    - Enhancing IoT devices with live weather updates\n' +
                '\n' +
                '    ## Benefits:\n' +
                '    - Accurate and reliable weather information\n' +
                '    - Easy integration with various platforms\n' +
                '    - Robust support for diverse use cases\n',
        }, "basePath": "/api",
        "schemes": ["https"],
        "consumes": ["application/json"],
        "produces": ["application/json"],

        "paths": {
            "/data": {
                "post": {
                    "summary": "Submit Weather Data",
                    "description": "Submit weather data including temperature, humidity, and pressure.",
                    "parameters": [
                        {
                            "name": "data",
                            "in": "body",
                            "required": true,
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "temperature": {
                                        "type": "number",
                                        "format": "integer",
                                        "description": "Current temperature in Celsius."
                                    },
                                    "humidity": {
                                        "type": "number",
                                        "format": "integer",
                                        "description": "Current humidity percentage."
                                    },
                                    "pressure": {
                                        "type": "number",
                                        "format": "integer",
                                        "description": "Current atmospheric pressure in hPa."
                                    }
                                }
                            }
                        }
                    ],
                    "responses": {
                        "201": {
                            "description": "Data submitted successfully."
                        },
                        "400": {
                            "description": "Bad Request. Invalid data format."
                        },
                        "500": {
                            "description": "Internal Server Error. Please try again later."
                        }
                    }
                },
                "get": {
                    "summary": "Get Real-time Weather Data",
                    "description": "Retrieve current weather information including temperature, humidity, and pressure.",
                    "responses": {
                        "200": {
                            "description": "Successful response with weather data.",
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "temperature": {
                                        "type": "number",
                                        "format": "integer",
                                        "description": "Current temperature in Celsius."
                                    },
                                    "humidity": {
                                        "type": "number",
                                        "format": "integer",
                                        "description": "Current humidity percentage."
                                    },
                                    "pressure": {
                                        "type": "number",
                                        "format": "integer",
                                        "description": "Current atmospheric pressure in hPa."
                                    }
                                }
                            }
                        },
                        "500": {
                            "description": "Internal Server Error. Please try again later."
                        }
                    }
                }
            }
        }
    }
};
