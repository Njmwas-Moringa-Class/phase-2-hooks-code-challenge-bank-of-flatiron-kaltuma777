import React, { useState } from "react";

const AddTransactionForm = () => {
  const [transactionData, setTransactionData] = useState({
    date: "",
    description: "",
    category: "",
    amount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransactionData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8001/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transactionData),
      });

      if (response.ok) {
        alert("Transaction added successfully");
        // You may want to clear the form after a successful submission
        setTransactionData({
          date: "",
          description: "",
          category: "",
          amount: "",
        });
      } else {
        console.error("Failed to add transaction");
      }
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  return (
    <div className="ui segment">
      <form onSubmit={handleSubmit} className="ui form">
        <div className="inline fields">
          <input
            value={transactionData.date}
            onChange={handleChange}
            type="date"
            name="date"
          />
          <input
            value={transactionData.description}
            onChange={handleChange}
            type="text"
            name="description"
            placeholder="Description"
          />
          <input
            value={transactionData.category}
            onChange={handleChange}
            type="text"
            name="category"
            placeholder="Category"
          />
          <input
            value={transactionData.amount}
            onChange={handleChange}
            type="number"
            name="amount"
            placeholder="Amount"
            step="0.01"
          />
        </div>
        <button className="ui button" type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default AddTransactionForm;
