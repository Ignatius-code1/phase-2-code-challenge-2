import React from "react";

const GoalItem = ({ goal, onDelete, onEdit, onDeposit }) => {
  console.log("Rendering goal item:", goal);
  const progress = (goal.savedAmount / goal.targetAmount) * 100;
  const deadlineDate = new Date(goal.deadline);
  const today = new Date();
  const daysLeft = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
  const isOverdue = today > deadlineDate && goal.savedAmount < goal.targetAmount;
  const isNearDeadline = daysLeft <= 30 && daysLeft > 0 && goal.savedAmount < goal.targetAmount;
  const isCompleted = goal.savedAmount >= goal.targetAmount;
  const remainingAmount = Math.max(goal.targetAmount - goal.savedAmount, 0);

  return (
    <div className="goal-item">
      <div className="goal-header">
        <h3>{goal.name}</h3>
        {isCompleted && <span className="status completed">Completed</span>}
        {isOverdue && <span className="status overdue">Overdue</span>}
        {isNearDeadline && <span className="status warning">Deadline in {daysLeft} days</span>}
      </div>
      
      <div className="goal-details">
        <p><strong>Category:</strong> {goal.category}</p>
        <p><strong>Target:</strong> ${goal.targetAmount.toFixed(2)}</p>
        <p><strong>Saved:</strong> ${goal.savedAmount.toFixed(2)}</p>
        <p><strong>Remaining:</strong> ${remainingAmount.toFixed(2)}</p>
        <p><strong>Deadline:</strong> {new Date(goal.deadline).toLocaleDateString()}</p>
        {daysLeft > 0 ? (
          <p><strong>Time left:</strong> {daysLeft} days</p>
        ) : (
          <p><strong>Time left:</strong> Expired</p>
        )}
      </div>
      
      <div className="progress-container">
        <div className="progress-bar">
          <div 
            className={`progress-fill ${isCompleted ? 'completed' : isOverdue ? 'overdue' : ''}`}
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>
        <p className="progress-text">{Math.min(progress, 100).toFixed(1)}% complete</p>
      </div>
      
      <div className="goal-actions">
        <button className="btn deposit" onClick={() => onDeposit(goal)}>Make Deposit</button>
        <button className="btn edit" onClick={() => onEdit(goal)}>Edit</button>
        <button className="btn delete" onClick={() => onDelete(goal.id)}>Delete</button>
      </div>
    </div>
  );
};

export default GoalItem;