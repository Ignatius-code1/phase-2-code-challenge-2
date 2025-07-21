import React, { useState } from "react";
import GoalItem from "./GoalItem";

const GoalsList = ({ goals, onDelete, onEdit, onDeposit }) => {
  const [filterCategory, setFilterCategory] = useState("");
  const [sortBy, setSortBy] = useState("deadline");

  // Get unique categories for filter dropdown
  const categories = [...new Set(goals.map(goal => goal.category))].sort();

  // Filter goals by category if selected
  const filteredGoals = filterCategory
    ? goals.filter(goal => goal.category === filterCategory)
    : goals;

  // Sort goals based on selected criteria
  const sortedGoals = [...filteredGoals].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "deadline":
        return new Date(a.deadline) - new Date(b.deadline);
      case "progress":
        const progressA = (a.savedAmount / a.targetAmount) * 100;
        const progressB = (b.savedAmount / b.targetAmount) * 100;
        return progressB - progressA;
      case "amount":
        return b.targetAmount - a.targetAmount;
      default:
        return 0;
    }
  });

  return (
    <div className="goals-list">
      <div className="list-controls">
        <div className="filter">
          <label htmlFor="category-filter">Filter by category:</label>
          <select 
            id="category-filter"
            value={filterCategory} 
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        
        <div className="sort">
          <label htmlFor="sort-by">Sort by:</label>
          <select 
            id="sort-by"
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="deadline">Deadline (Closest First)</option>
            <option value="name">Name (A-Z)</option>
            <option value="progress">Progress (Highest First)</option>
            <option value="amount">Target Amount (Highest First)</option>
          </select>
        </div>
      </div>

      {sortedGoals.length === 0 ? (
        <p className="no-goals">No goals found. Add a new goal to get started!</p>
      ) : (
        <div className="goals-grid">
          {sortedGoals.map((goal) => (
            <GoalItem 
              key={goal.id} 
              goal={goal} 
              onDelete={onDelete} 
              onEdit={onEdit} 
              onDeposit={onDeposit} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default GoalsList;