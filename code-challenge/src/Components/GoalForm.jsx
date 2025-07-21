import React, { useState, useEffect } from "react";
import axios from "axios";

const GoalForm = ({ onGoalUpdated, goal = {} }) => {
  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [category, setCategory] = useState("");
  const [deadline, setDeadline] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Predefined categories for selection
  const categoryOptions = [
    "Travel", "Emergency", "Electronics", "Real Estate", "Vehicle", 
    "Education", "Shopping", "Home", "Retirement", "Other"
  ];

  // Set form values when editing a goal
  useEffect(() => {
    if (goal.id) {
      setName(goal.name || "");
      setTargetAmount(goal.targetAmount || "");
      setCategory(goal.category || "");
      setDeadline(goal.deadline || "");
    } else {
      // Reset form when not editing
      setName("");
      setTargetAmount("");
      setCategory("");
      setDeadline("");
    }
  }, [goal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // For demo purposes, simulate successful API call
      console.log("Submitting goal:", { name, targetAmount, category, deadline });
      
      // Create the goal object
      const newGoal = {
        name,
        targetAmount: parseFloat(targetAmount),
        savedAmount: goal.savedAmount || 0,
        category: category || "Other",
        deadline,
        createdAt: goal.createdAt || new Date().toISOString().split("T")[0],
        id: goal.id || String(Date.now())
      };
      
      console.log("Created goal object:", newGoal);

      // Simulate API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In a real app, we would use these API calls:
      // if (goal.id) {
      //   await axios.patch(`http://localhost:3001/goals/${goal.id}`, newGoal);
      // } else {
      //   await axios.post("http://localhost:3001/goals", newGoal);
      // }
      
      // Reset form after successful submission
      if (!goal.id) {
        setName("");
        setTargetAmount("");
        setCategory("");
        setDeadline("");
      }

      // Call the parent component's callback with the new goal
      onGoalUpdated(newGoal);
    } catch (error) {
      setError("Failed to save goal. Please check if the server is running.");
      console.error("Goal form error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate minimum date for deadline (today)
  const today = new Date().toISOString().split("T")[0];

  return (
    <form onSubmit={handleSubmit} className="goal-form">
      <div className="form-group">
        <label htmlFor="goal-name">Goal Name</label>
        <input 
          id="goal-name"
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="e.g., Travel Fund, Emergency Fund" 
          required 
        />
      </div>

      <div className="form-group">
        <label htmlFor="target-amount">Target Amount ($)</label>
        <input
          id="target-amount"
          type="number"
          value={targetAmount}
          onChange={(e) => setTargetAmount(e.target.value)}
          placeholder="e.g., 5000"
          min="1"
          step="0.01"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select 
          id="category"
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="" disabled>Select a category</option>
          {categoryOptions.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="deadline">Target Date</label>
        <input 
          id="deadline"
          type="date" 
          value={deadline} 
          onChange={(e) => setDeadline(e.target.value)} 
          min={today}
          required
        />
      </div>

      {error && <p className="error-message">{error}</p>}

      <button 
        type="submit" 
        className="btn submit-btn" 
        disabled={isLoading}
      >
        {isLoading ? "Saving..." : (goal.id ? "Update Goal" : "Add Goal")}
      </button>
    </form>
  );
};

export default GoalForm;