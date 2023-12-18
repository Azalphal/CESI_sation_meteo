// swagger-config.js
module.exports = {
    openapi: '3.0.0',
    info: {
        title: 'Weather API "Michel"',
        version: '1.0.0',
        description: `# 🌦️ Welcome to the Weather API "Michel" 🌈

        Powerful tool to retrieve real-time weather data.

        ## Purpose 🚀
        The Awesome Weather API empowers developers, researchers, and enthusiasts with comprehensive weather data to enhance their applications and projects.

        ## Key Features 🌟
        - Real-time temperature readings
        - Humidity and pressure information
        - Seamless integration with IoT devices
        - User-friendly and intuitive endpoints

        ## Use Cases 🌐
        - Integrating weather data into mobile apps
        - Building weather monitoring systems
        - Enhancing IoT devices with live weather updates
        
        ## Benefits 🌞
        - Accurate and reliable weather information
        - Easy integration with various platforms
        - Robust support for diverse use cases`

    }, "basePath": "/api",
    "schemes": ["https"],
    "consumes": ["application/json"],
    "produces": ["application/json"],

    "tags": [  // Define your tags here
        {
            "name": 'Data',
            "description": 'Operations related to weather data',
        },
        {
            "name": 'Probes',
            "description": 'Operations related to probes',
        },
        {
            "name": 'Users',
            "description": 'Operations related to users',
        },
    ],

    "paths": {
        "/data": {
            "post": {
                "tags": ['Data'],
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
                "tags": ['Data'],
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
        },
        "/data/{id}": {
            "get": {
                "tags": ['Data'],
                "summary": "Get a specific weather data",
                "description": "Get details of a specific weather data by ID.",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "type": "integer",
                        "description": "ID of the weather data to retrieve"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Details of the weather data",
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
                }
            },
        },
        "/probes": {
            "post": {
                "tags": ['Probes'],
                "summary": "Create a new probe",
                "description": "Create a new probe with a given name and location.",
                "parameters": [
                    {
                        "name": "probe",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "name": {
                                    "type": "string",
                                    "description": "Name of the probe"
                                },
                                "location": {
                                    "type": "string",
                                    "description": "Location of the probe"
                                }
                            }
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Probe created successfully.",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "name": {
                                    "type": "string",
                                    "description": "Name of the created probe"
                                },
                                "location": {
                                    "type": "string",
                                    "description": "Location of the created probe"
                                }
                            }
                        }
                    }
                }
            },
            "get": {
                "tags": ['Probes'],
                "summary": "Get all probes",
                "description": "Get a list of all probes.",
                "responses": {
                    "200": {
                        "description": "List of probes",
                        "schema": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "name": {
                                        "type": "string",
                                        "description": "Name of the probe"
                                    },
                                    "location": {
                                        "type": "string",
                                        "description": "Location of the probe"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/probes/{id}": {
            "get": {
                "tags": ['Probes'],
                "summary": "Get a specific probe",
                "description": "Get details of a specific probe by ID.",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "type": "integer",
                        "description": "ID of the probe to retrieve"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Details of the probe",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "name": {
                                    "type": "string",
                                    "description": "Name of the probe"
                                },
                                "location": {
                                    "type": "string",
                                    "description": "Location of the probe"
                                }
                            }
                        }
                    }
                }
            },
            "put": {
                "tags": ['Probes'],
                "summary": "Update a probe",
                "description": "Update the details of a specific probe by ID.",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "type": "integer",
                        "description": "ID of the probe to update"
                    },
                    {
                        "name": "probe",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "name": {
                                    "type": "string",
                                    "description": "Updated name of the probe"
                                },
                                "location": {
                                    "type": "string",
                                    "description": "Updated location of the probe"
                                }
                            }
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Probe updated successfully.",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "name": {
                                    "type": "string",
                                    "description": "Updated name of the probe"
                                },
                                "location": {
                                    "type": "string",
                                    "description": "Updated location of the probe"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/users": {
            "post": {
                "tags": ['Users'],
                "summary": "Create a new user",
                "description": "Create a new user with a given username, email, and password.",
                "parameters": [
                    {
                        "name": "user",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "username": {
                                    "type": "string",
                                    "description": "Username of the user"
                                },
                                "email": {
                                    "type": "string",
                                    "description": "Email of the user"
                                },
                                "password": {
                                    "type": "string",
                                    "description": "Encrypted password of the user"
                                }
                            }
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "User created successfully.",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "username": {
                                    "type": "string",
                                    "description": "Username of the created user"
                                },
                                "email": {
                                    "type": "string",
                                    "description": "Email of the created user"
                                }
                            }
                        }
                    }
                }
            },
            "get": {
                "tags": ['Users'],
                "summary": "Get all users",
                "description": "Get a list of all users.",
                "responses": {
                    "200": {
                        "description": "List of users",
                        "schema": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "username": {
                                        "type": "string",
                                        "description": "Username of the user"
                                    },
                                    "email": {
                                        "type": "string",
                                        "description": "Email of the user"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/users/{id}": {
            "get": {
                "tags": ['Users'],
                "summary": "Get a specific user",
                "description": "Get details of a specific user by ID.",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "type": "integer",
                        "description": "ID of the user to retrieve"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Details of the user",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "username": {
                                    "type": "string",
                                    "description": "Username of the user"
                                },
                                "email": {
                                    "type": "string",
                                    "description": "Email of the user"
                                }
                            }
                        }
                    }
                }
            },
            "put": {
                "tags": ['Users'],
                "summary": "Update a user",
                "description": "Update the details of a specific user by ID.",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "type": "integer",
                        "description": "ID of the user to update"
                    },
                    {
                        "name": "user",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "username": {
                                    "type": "string",
                                    "description": "Updated username of the user"
                                },
                                "email": {
                                    "type": "string",
                                    "description": "Updated email of the user"
                                }
                            }
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "User updated successfully.",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "username": {
                                    "type": "string",
                                    "description": "Updated username of the user"
                                },
                                "email": {
                                    "type": "string",
                                    "description": "Updated email of the user"
                                }
                            }
                        }
                    }
                }
            },
            "delete": {
                "tags": ['Users'],
                "summary": "Delete a user",
                "description": "Delete a specific user by ID.",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "type": "integer",
                        "description": "ID of the user to delete"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "User deleted successfully."
                    }
                }
            }
        }
    }
};
