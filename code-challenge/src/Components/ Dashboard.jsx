import React, { useEffect, useState } from "react";
import axios from "axios";
import GoalForm from "./GoalForm";
import GoalsList from "./GoalsList";

const Dashboard = () => {
  const [goals, setGoals] = useState([]);
  const [editingGoal, setEditingGoal] = useState(null);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    const res = await axios.get("http://localhost:3000/goals");
    setGoals(res.data);
  };

  const handleCreate = () => {
    setEditingGoal(null);
    fetchGoals();
  };

  const handleEdit = (goal) => {
    setEditingGoal(goal);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/goals/${id}`);
    fetchGoals();
  };

  const handleDeposit = () => {
    fetchGoals();
  };

  const totalGoals = goals.length;
  const totalSaved = goals.reduce((sum, g) => sum + g.savedAmount, 0);
  const completedGoals = goals.filter((g) => g.savedAmount >= g.targetAmount).length;

  return (
    <div>
      <h2>Smart Goal Planner</h2>
      <h3>Overview</h3>
      <p>Total Goals: {totalGoals}</p>
      <p>Total Saved: ${totalSaved.toFixed(2)}</p>
      <p>Goals Completed: {completedGoals}</p>

      <GoalForm onGoalUpdated={handleCreate} goal={editingGoal} />

      <GoalsList
        goals={goals}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onDeposit={handleDeposit}
      />
    </div>
  );
};

export default Dashboard;