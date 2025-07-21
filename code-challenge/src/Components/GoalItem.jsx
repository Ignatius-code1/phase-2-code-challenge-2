import React from "react";
import DepositForm from "./DepositForm";

const GoalItem = ({ goal, onDelete, onEdit, onDeposit }) => {
  const progress = (goal.savedAmount / goal.targetAmount) * 100;
  const deadlineDate = new Date(goal.deadline);
  const today = new Date();
  const daysLeft = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
  const isOverdue = today > deadlineDate && goal.savedAmount < goal.targetAmount;
  const isNearDeadline = daysLeft <= 30 && !isOverdue;

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
      <h3>{goal.name}</h3>
      <p>
        Category: {goal.category} | Target: ${goal.targetAmount} | Saved: ${goal.savedAmount}
      </p>
      <p>Deadline: {goal.deadline}</p>
      <div style={{ width: "100%", background: "#eee" }}>
        <div
          style={{
            width: `${progress}%`,
            background: progress >= 100 ? "green" : "blue",
            height: "20px",
          }}
        ></div>
      </div>
      <p>Progress: {Math.min(progress, 100).toFixed(2)}%</p>
      {isOverdue && <p style={{ color: "red" }}>Overdue</p>}
      {isNearDeadline && <p style={{ color: "orange" }}>Deadline near!</p>}
      <DepositForm goal={goal} onDeposit={onDeposit} />
      <button onClick={() => onEdit(goal)}>Edit</button>
      <button onClick={() => onDelete(goal.id)}>Delete</button>
    </div>
  );
};

export default GoalItem;