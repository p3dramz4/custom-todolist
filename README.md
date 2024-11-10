# custom-todolist
This is a Todo List app built with React and JSON Server for mock backend. You can add, remove, and mark tasks as completed. SweetAlert2 handles alerts, and Concurrently runs both the frontend and backend together. It’s created to practice React, APIs, and data fetching.

Installation
1. Clone the repository First, clone the project from GitHub to your local machine:
2. git clone https://github.com/your-username/custom-todolist.git cd custom-todolist 2. Install dependencies Run the following command to install all required dependencies: bash Copy code npm install 3. Run both frontend and backend with concurrently This project uses concurrently to run both the frontend and backend at the same time. The frontend (React) will run on port 3000, and the backend (JSON Server) will run on port 3001. To run both the frontend and backend simultaneously, use: bash Copy code npm start This command will run: The React frontend via react-scripts start The JSON Server backend via json-server --watch db.json --port 3001 4. Access the app Once both the frontend and backend are running, you can open the app by visiting http://localhost:3000 in your browser.
