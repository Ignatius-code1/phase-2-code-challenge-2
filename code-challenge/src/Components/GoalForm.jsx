import React, { useState } from "react";
import axios from "axios";

const GoalForm = ({ onGoalUpdated, goal = {} }) => {
  const [name, setName] = useState(goal.name || "");
  const [targetAmount, setTargetAmount] = useState(goal.targetAmount || "");
  const [category, setCategory] = useState(goal.category || "");
  const [deadline, setDeadline] = useState(goal.deadline || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newGoal = {
      name,
      targetAmount: parseFloat(targetAmount),
      savedAmount: goal.savedAmount || 0,
      category,
      deadline,
      createdAt: goal.createdAt || new Date().toISOString().split("T")[0],
    };

    if (goal.id) {
      await axios.patch(`http://localhost:3000/goals/${goal.id}`, newGoal);
    } else {
      await axios.post("http://localhost:3000/goals", newGoal);
    }

    onGoalUpdated();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Goal Name" required />
      <input
        type="number"
        value={targetAmount}
        onChange={(e) => setTargetAmount(e.target.value)}
        placeholder="Target Amount"
        required
      />
      <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" />
      <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
      <button type="submit">{goal.id ? "Update Goal" : "Add Goal"}</button>
    </form>
  );
};

export default GoalForm;