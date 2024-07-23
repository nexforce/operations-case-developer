# Nexforce Technical Test

## Overview

This repository contains the technical test for Nexforce, showcasing skills in backend development with TypeScript, Node.js, and Express, frontend development with React and CSS, and a custom script written in Python.

## Agile Methodology

The project was developed using the Agile methodology. The tasks were divided into front-end, back-end, and script development, and each task was further divided into smaller tasks that were completed in sprints. The progress was tracked using Notion.
To view the project board, click [here](https://www.notion.so/837729658bca41b287cdac1c80840935?v=78b531653e4343baac84302fe9db300f&pvs=4).

## Project Structure

```bash
.
├── backend
│   ├── src
│   │   ├── controllers
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   └── app.ts
│   ├── tests
│   │   ├── controllers
│   │   ├── models
│   │   └── routes
│   └── package.json
│   └── README.MD
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── styles
│   │   └── index.tsx
│   └── package.json
│   └── README.MD
├── scripts
│   ├── custom_script.py
│   └── README.MD
└── README.md
```

## Getting Started
### Pre-requisites
- Node.js
- npm or yarn
- Python

### Backend Setup
1. Navigate to the `backend` directory.
2. Run `npm install` to install the dependencies.
3. Set the environment variables in a `.env` file as shown in the `.env.example` file.
4. Run `npm start` to start the development server.
5. The server will be running on `http://localhost:5000`.
6. Run `npm test` to run the tests.

### Frontend Setup
1. Navigate to the `frontend` directory.
2. Run `npm install` to install the dependencies.
3. Set the environment variables in a `.env` file as shown in the `.env.example` file.
4. Run `npm start` to start the development server.

### Custom Script Setup
1. Navigate to the `scripts` directory.
2. Install the required packages by running `pip install -r requirements.txt`.
3. Set the environment variables in a `.env` file as shown in the `.env.example` file.
4. Run `python custom_script.py` to run the script.

## Folder Structure
### Backend
- `src/controllers`: Contains the controllers logic for handling requests and responses.
- `src/models`: Contains the data models for the application.
- `src/routes`: Contains the routes for the application.
- `src/services`: Contains business logic and services for the application.
- `src/app.ts`: Entry point for the backend.
- `tests`: Contains unit and integration tests for the backend.
- `README`: Contains the API documentation.

### Frontend
- `src/components`: Contains the reusable components.
- `src/pages`: Contains the pages.
- `src/styles`: Contains the CSS styles.
- `src/index.tsx`: Entry point for the frontend.

- `README`: Contains the frontend documentation.

### Scripts
- `main.py`: Custom script written in Python.
- `README`: Contains the documentation for the script.

