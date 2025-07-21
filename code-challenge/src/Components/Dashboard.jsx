import React, { useEffect, useState } from "react";
import axios from "axios";
import GoalForm from "./GoalForm";
import GoalsList from "./GoalsList";
import DepositForm from "./DepositForm";

const Dashboard = () => {
  const [goals, setGoals] = useState([]);
  const [editingGoal, setEditingGoal] = useState(null);
  const [showDepositForm, setShowDepositForm] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const res = await axios.get("http://localhost:3001/goals");
      setGoals(res.data);
    } catch (error) {
      console.error("Error fetching goals:", error);
    }
  };

  const handleCreate = () => {
    setEditingGoal(null);
    fetchGoals();
  };

  const handleEdit = (goal) => {
    setEditingGoal(goal);
    setShowDepositForm(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/goals/${id}`);
      fetchGoals();
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
  };

  const handleDeposit = () => {
    fetchGoals();
    setShowDepositForm(false);
  };

  const handleShowDepositForm = (goal) => {
    setSelectedGoal(goal);
    setShowDepositForm(true);
    setEditingGoal(null);
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