## PPG Frontend

This repository contains the source code for the frontend of the PPG application. Please note that this project is no longer actively maintained and is being made available as part of my portfolio.

### Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Docker Usage](#docker-usage)
- [Testing](#testing)
- [Contributing](#contributing)
- [Acknowledgements](#acknowledgements)

### Introduction

The PPG Frontend is a web application that was developed as part of the PPG project. This project showcases my skills in frontend development, utilizing modern web technologies and best practices. Although the project is no longer actively maintained, it serves as a valuable part of my portfolio.

### Features

- User authentication and authorization
- Interactive and responsive UI
- Integration with backend APIs
- State management using Redux
- Form validation and error handling

### Technologies Used

- React
- Redux
- Material-UI
- Axios
- Node.js
- Docker

### Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**
   ```sh
   git clone https://github.com/pierpontglobal/Pierpontglobal-Frontend.git
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add any necessary environment variables.

### Running the Application

To run the application locally, use the following command:

```sh
npm start
```

The application will be accessible at `http://localhost:3000`.

### Docker Usage

To run the application using Docker, follow these steps:

1. **Build the Docker image:**
   ```sh
   docker build -t ppg-frontend:latest .
   ```

2. **Run the Docker container:**
   ```sh
   docker run -d -p 4000:4000 ppg-frontend:latest
   ```

The application will be accessible at `http://localhost:4000`.

### Testing

For logging in, you can create a user with the test card `4242424242424242` with any expiration date you wish. Alternatively, you can use the test user `hector@test.com` with the password `123456789a`.

### Contributing

As this is an abandoned project, contributions are not expected. However, if you wish to fork the repository and make improvements, feel free to do so.

### Acknowledgements

- Thanks to all the contributors who helped in the development of this project.
- Special thanks to the open-source community for providing the tools and libraries used in this project.