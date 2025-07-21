import React, { useState } from "react";
import axios from "axios";

const DepositForm = ({ goal, onDeposit }) => {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleDeposit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    
    // Validate amount
    if (!amount || parseFloat(amount) <= 0) {
      setError("Please enter a valid amount greater than zero");
      return;
    }
    
    setIsLoading(true);
    try {
      const depositAmount = parseFloat(amount);
      const updatedGoal = {
        ...goal,
        savedAmount: goal.savedAmount + depositAmount,
      };
      
      // Simulate API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In a real app, we would use this API call:
      // await axios.patch(`http://localhost:3001/goals/${goal.id}`, updatedGoal);
      
      setSuccess(true);
      setAmount("");
      onDeposit(updatedGoal); // Pass the updated goal to the parent
    } catch (error) {
      setError("Failed to make deposit. Please try again.");
      console.error("Deposit error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const remainingAmount = Math.max(goal.targetAmount - goal.savedAmount, 0);
  const isCompleted = goal.savedAmount >= goal.targetAmount;

  return (
    <div className="deposit-form">
      <h3>Make a Deposit to {goal.name}</h3>
      {isCompleted ? (
        <p className="goal-complete-message">This goal has been fully funded! 🎉</p>
      ) : (
        <form onSubmit={handleDeposit}>
          <div className="form-group">
            <label htmlFor="deposit-amount">Deposit Amount ($)</label>
            <input
              id="deposit-amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={`Amount (Remaining: $${remainingAmount.toFixed(2)})`}
              min="0.01"
              step="0.01"
              disabled={isLoading}
              required
            />
          </div>
          
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">Deposit successful!</p>}
          
          <button 
            type="submit" 
            className="btn deposit-btn" 
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Make Deposit"}
          </button>
        </form>
      )}
    </div>
  );
};

export default DepositForm;