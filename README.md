# Financial Goal Tracker

A React application for managing and tracking financial goals.

## Features

- Add, edit, and delete financial goals
- Track progress for each goal with visual progress bars
- Make deposits to any goal
- Filter goals by category
- Sort goals by different criteria
- See overview statistics of all goals
- Deadline warnings and overdue indicators

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

### Running the Application

1. Start the JSON server (mock backend):

```bash
npm run server
```

This will start the JSON server on http://localhost:3000

2. In a new terminal, start the React application:

```bash
npm run dev
```

This will start the React application on http://localhost:5173 (or another port if 5173 is in use)

3. Open your browser and navigate to http://localhost:5173

## Project Structure

- `src/Components/Dashboard.jsx`: Main component that manages state and renders the application
- `src/Components/GoalsList.jsx`: Displays the list of goals with filtering and sorting options
- `src/Components/GoalItem.jsx`: Renders individual goal items with progress tracking
- `src/Components/GoalForm.jsx`: Form for adding and editing goals
- `src/Components/DepositForm.jsx`: Form for making deposits to goals
- `db.json`: JSON database file that stores all goal data

## API Endpoints

- `GET /goals`: Fetch all goals
- `POST /goals`: Create a new goal
- `PATCH /goals/:id`: Update a goal
- `DELETE /goals/:id`: Delete a goal

## Technologies Used

- React
- JSON Server
- Axios
- CSS3