import React, { useState } from "react";
import axios from "axios";

const DepositForm = ({ goal, onDeposit }) => {
  const [amount, setAmount] = useState("");

  const handleDeposit = async () => {
    if (!amount || amount <= 0) return;
    const updatedGoal = {
      ...goal,
      savedAmount: goal.savedAmount + parseFloat(amount),
    };
    await axios.patch(`http://localhost:3000/goals/${goal.id}`, updatedGoal);
    onDeposit();
  };

  return (
    <div>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Deposit Amount"
      />
      <button onClick={handleDeposit}>Deposit</button>
    </div>
  );
};

export default DepositForm;