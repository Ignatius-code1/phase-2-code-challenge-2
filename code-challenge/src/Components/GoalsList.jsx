import React from "react";
import GoalItem from "./GoalItem";

const GoalsList = ({ goals, onDelete, onEdit, onDeposit }) => {
  return (
    <div>
      {goals.map((goal) => (
        <GoalItem key={goal.id} goal={goal} onDelete={onDelete} onEdit={onEdit} onDeposit={onDeposit} />
      ))}
    </div>
  );
};

export default GoalsList;