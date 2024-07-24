# Nexforce Case Study - FullStack Application

## Overview

The Nexforce case study involves developing a full-stack application to manage an inventory system. This application includes a backend built with Node.js and Express, a frontend developed in React.js, and a Python script for data analysis. This project aims to demonstrate my ability to integrate multiple technologies and follow agile development principles.

## Project Structure

The project is divided into three main components:
- **Backend**: Node.js server with Express.
- **Frontend**: React.js application.
- **Python Script**: For analyzing inventory data.

## Technologies Used

### Backend
- **Node.js**: Runtime environment for server-side code.
- **Express.js**: Web framework for building APIs.
- **PostgreSQL**: Database system.
- **Sequelize**: ORM for database interactions.
- **Nodemon**: Tool for auto-reloading during development.

### Frontend
- **React.js**: JavaScript library for building user interfaces.
- **Vite**: Build tool and development server.
- **Axios**: HTTP client for making API requests.
- **CSS Modules**: For component-scoped styles.

### Python Script
- **Python**: Programming language for data analysis.

## Getting Started

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or later)
- [Python](https://www.python.org/) (v3.8 or later)
- [PostgreSQL](https://www.postgresql.org/) (v16 or later)

### Backend

1. **Navigate to the backend directory**:
    ```bash
    cd backend
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up environment variables**:
    Copy the `.env.example` file to a new file named `.env` in the `backend` directory and fill in your environment variables:
    ```bash
    cp .env.example .env
    ```
    Edit the `.env` file with your actual values:
    ```
    PORT=3000
    POSTGRES_USER=your_database_user
    POSTGRES_PASSWORD=your_database_password
    POSTGRES_DB=your_database_name
    POSTGRES_HOST=your_database_host
    POSTGRES_PORT=your_database_port
    ```

4. **Start the server**:
    ```bash
    npm run dev
    ```

5. **Run migrations and seeders**:
    ```bash
    npx sequelize-cli db:migrate
    npx sequelize-cli db:seed:all
    ```

### Frontend

1. **Navigate to the frontend directory**:
    ```bash
    cd frontend
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up environment variables**:
    Copy the `.env.example` file to a new file named `.env` in the `frontend` directory and edit it if needed:
    ```bash
    cp .env.example .env
    ```

4. **Start the development server**:
    ```bash
    npm run dev
    ```

5. **Open your browser** and go to view the application.

### Python Script

1. **Navigate to the Python script directory**:
    ```bash
    cd scripts
    ```

2. **Run the script**:
    ```bash
    python analyze_inventory.py --help

    usage: inventory_analysis.py [-h] --type {lowest_stock,highest_stock} [--num_records NUM_RECORDS]
    
    Analyze product inventory.
    
    options:
      -h, --help            show this help message and exit
      --type {lowest_stock,highest_stock}
                            Type of analysis: 'lowest_stock' for products with the lowest stock, 'highest_stock' for products with the
                            highest stock
      --num_records NUM_RECORDS
                            Number of records to include in the report
    ```

## API Endpoints

### Backend API

- **GET /api/products**: Retrieve a list of products.
- **POST /api/products**: Create a new product.
- **PUT /api/products/:id**: Update an existing product.
- **DELETE /api/products/:id**: Delete a product.
- **GET /api/categories**: Retrieve a list of product categories.

## Frontend Components

- **Home**: Displays the list of products.
- **CreatePage**: Form to add a new product.
- **UpdatePage**: Form to edit an existing product.
- **Category**: View products by category.

## Python Script Functionality

- **Data Analysis**: Analyzes inventory data to identify products with the lowest and highest stock.
- **Report Generation**: Outputs results in CSV.

## Agile Practices

I used the Trello for managing project tasks, organizing sprints, and tracking progress: [link](https://trello.com/invite/b/669af0e943d75e8b94476832/ATTIbbb973fcd5f329a54fa3fe0d4e614dce1D20F5A4/scrum-nextforce-case).
