import React, { useEffect, useState } from "react";
import axios from "axios";
import GoalForm from "./GoalForm";
import GoalsList from "./GoalsList";
import DepositForm from "./DepositForm";

const Dashboard = () => {
  // Sample data for demonstration
  const sampleGoals = [
    {
      "id": "1",
      "name": "Travel Fund - Japan",
      "targetAmount": 5000,
      "savedAmount": 3200,
      "category": "Travel",
      "deadline": "2025-12-31",
      "createdAt": "2024-01-15"
    },
    {
      "id": "2",
      "name": "Emergency Fund",
      "targetAmount": 10000,
      "savedAmount": 7500,
      "category": "Emergency",
      "deadline": "2026-06-30",
      "createdAt": "2023-05-01"
    },
    {
      "id": "3",
      "name": "New Laptop",
      "targetAmount": 1500,
      "savedAmount": 1500,
      "category": "Electronics",
      "deadline": "2024-07-20",
      "createdAt": "2024-03-10"
    }
  ];

  const [goals, setGoals] = useState(sampleGoals);
  const [editingGoal, setEditingGoal] = useState({});
  const [showDepositForm, setShowDepositForm] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);

  useEffect(() => {
    // No need to fetch goals as we're using sample data
    // fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      // In a real app with a running server:
      // const res = await axios.get("http://localhost:3001/goals");
      // setGoals(res.data);
      console.log("Fetching goals (simulated)");
    } catch (error) {
      console.error("Error fetching goals:", error);
    }
  };

  const handleCreate = (newGoal) => {
    // In a real app, we would fetch updated goals from the server
    // For demo, we'll update the local state directly
    if (newGoal) {
      console.log("Received goal in handleCreate:", newGoal);
      
      if (newGoal.id && goals.some(g => g.id === newGoal.id)) {
        // Update existing goal
        setGoals(goals.map(g => g.id === newGoal.id ? newGoal : g));
        console.log("Updated existing goal");
      } else {
        // Add new goal
        setGoals([...goals, newGoal]);
        console.log("Added new goal");
      }
    }
    setEditingGoal({});
  };

  const handleEdit = (goal) => {
    setEditingGoal(goal);
    setShowDepositForm(false);
  };

  const handleDelete = (id) => {
    // In a real app, we would call the API
    // For demo, we'll update the local state directly
    setGoals(goals.filter(goal => goal.id !== id));
    console.log(`Deleted goal with id: ${id}`);
  };

  const handleDeposit = (updatedGoal) => {
    // Update the goal in our local state
    if (updatedGoal) {
      setGoals(goals.map(g => g.id === updatedGoal.id ? updatedGoal : g));
    }
    setShowDepositForm(false);
  };

  const handleShowDepositForm = (goal) => {
    setSelectedGoal(goal);
    setShowDepositForm(true);
    setEditingGoal({});
  };

  const totalGoals = goals.length;
  const totalSaved = goals.reduce((sum, g) => sum + g.savedAmount, 0);
  const completedGoals = goals.filter((g) => g.savedAmount >= g.targetAmount).length;
  const overdueGoals = goals.filter(
    (g) => new Date(g.deadline) < new Date() && g.savedAmount < g.targetAmount
  ).length;

  return (
    <div className="dashboard">
      <h1>Financial Goal Dashboard</h1>
      
      <div className="overview-section">
        <h2>Overview</h2>
        <div className="stats">
          <div className="stat-card">
            <h3>Total Goals</h3>
            <p>{totalGoals}</p>
          </div>
          <div className="stat-card">
            <h3>Total Saved</h3>
            <p>${totalSaved.toFixed(2)}</p>
          </div>
          <div className="stat-card">
            <h3>Goals Completed</h3>
            <p>{completedGoals}</p>
          </div>
          <div className="stat-card">
            <h3>Overdue Goals</h3>
            <p>{overdueGoals}</p>
          </div>
        </div>
      </div>

      {showDepositForm && selectedGoal && (
        <div className="form-section">
          <h2>Make a Deposit</h2>
          <DepositForm goal={selectedGoal} onDeposit={handleDeposit} />
          <button className="btn" onClick={() => setShowDepositForm(false)}>Cancel</button>
        </div>
      )}

      {!showDepositForm && (
        <div className="form-section">
          <h2>{editingGoal ? "Edit Goal" : "Add New Goal"}</h2>
          <GoalForm onGoalUpdated={handleCreate} goal={editingGoal} />
        </div>
      )}

      <div className="goals-section">
        <h2>Your Goals</h2>
        <GoalsList
          goals={goals}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onDeposit={handleShowDepositForm}
        />
      </div>
    </div>
  );
};

export default Dashboard;