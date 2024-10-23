## How to Start the Application

To run the application locally, follow these steps:

### Prerequisites

Make sure you have the following installed on your machine:

- **Node.js** (version 14 or later)
- **npm** (version 5.6 or later)

### Installation Steps

1. **Clone the Repository**

   First, clone the repository to your local machine:

   ```bash
   git clone <repository-url>
   cd front-end-internship

2. **Install Dependencies**
  `
   ```bash
   npm install

3. **Start the Development Server**
    ```bash
   npm start

This command will start the development server, 
and you can access the application in your web browser 
at http://localhost:3000.

## File Structure

- `public/`: Contains static files .
- `src/`: The main folder with the application code.
    - `components/`: Reusable components. For example, Home — the main page.
    - `pages/`: Application pages. For example, HomePage.tsx.
    - `store/`: Folder for global state management.
    - `api/`: Files for API requests.
    - `utils/`: Helper functions and utilities.
    - `App.tsx`: The main application component.
    - `index.tsx`: The entry point of the application.
    - `index.css`: Global styles for the application.
- `README.md`: Instructions for running the app and project description.
- `package.json`: Project dependencies and scripts. Конфігурація TypeScript.
- `.gitignore`: Files to be ignored by Git.

## Running the application in Docker

1. Ensure that Docker and Docker Compose are installed.
2. Build the Docker image:
    ```bash
    docker-compose build
    ```
3. Start the container:
    ```bash
    docker-compose up
    ```
4. Open your browser and navigate to `http://localhost:80`.

