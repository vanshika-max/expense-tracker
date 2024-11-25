import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {CSVLink} from 'react-csv';



const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [monthlyBudget, setMonthlyBudget] = useState(0); 
  const [remainingBudget, setRemainingBudget] = useState(0); 
  const [budgetInput, setBudgetInput] = useState(''); 



  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/expenses', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setExpenses(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchExpenses();
  }, []);
     
     // Calculate the total amount spent overall
  const totalSpentOverall = expenses.reduce((acc, expense) => acc + expense.amount, 0);

   // Filter expenses based on selected month
   const filteredExpenses = expenses.filter(expense => {
    const expenseMonth = new Date(expense.date).getMonth() + 1; // getMonth() returns 0 for January
    return selectedMonth === '' || expenseMonth === parseInt(selectedMonth);
  });

    // Calculate the total amount spent for the filtered (monthly) expenses
    const totalSpentMonthly = filteredExpenses.reduce((acc, expense) => acc + expense.amount, 0);

    useEffect(() => {
      setRemainingBudget(monthlyBudget - totalSpentMonthly);
    }, [monthlyBudget, totalSpentMonthly]);
  
    const handleSetBudget = () => {
      if (!isNaN(budgetInput) && budgetInput >= 0) {
        setMonthlyBudget(Number(budgetInput));
        setBudgetInput('');
      } else {
        alert('Please enter a valid budget amount.');
      }
    };
   



  const csvData = filteredExpenses.map(expense => ({
    Category: expense.category,
    Amount: `$${expense.amount.toFixed(2)}`,
    Description: expense.description,
    Date: new Date(expense.date).toLocaleDateString(),
  }));
  
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold my-4">Expenses</h2>
     
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2 " htmlFor="month-select">Select Month:</label>
        <select
          id="month-select"
          className="border-2 border-[#060505] rounded px-4 py-2 w-full max-w-xs text-black font-bold "
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
         
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>
      
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <input
            type="number"
            placeholder="Set Monthly Budget"
            value={budgetInput}
            onChange={(e) => setBudgetInput(e.target.value)}
            className="border-2 px-4 py-2 rounded-lg mr-2 w-full max-w-xs border-[#060505]"
          />
          <button
            onClick={handleSetBudget}
            className="bg-[#574bbe] text-white py-2 px-4 rounded-lg hover:bg-green-600"
          >
            Set Budget
          </button>
        </div>
       

<div className="text-right">
      <p className="font-bold text-lg">Total Budget: ${monthlyBudget.toFixed(2)}</p>
      <p
        className={`font-bold text-lg ${
          remainingBudget < 0 ? 'text-red-600' : 'text-green-700'
        }`}
      >
        Remaining Budget: ${remainingBudget.toFixed(2)}
      </p>
    </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b bg-[#574bbe] text-white">Category</th>
              <th className="py-2 px-4 border-b bg-[#574bbe] text-white">Amount</th>
              <th className="py-2 px-4 border-b bg-[#574bbe] text-white">Description</th>
              <th className="py-2 px-4 border-b bg-[#574bbe] text-white">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map(expense => (
              <tr key={expense._id}>
                <td className="py-2 px-4 border-b text-center bg-[#ffd0d0] ">{expense.category}</td>
                <td className="py-2 px-4 border-b text-center bg-[#ffd0d0]">${expense.amount}</td>
                <td className="py-2 px-4 border-b text-center bg-[#ffd0d0]">{expense.description}</td>
                <td className="py-2 px-4 border-b text-center bg-[#ffd0d0]">{new Date(expense.date).toLocaleDateString()}</td>
              </tr>
            ))}
             
             <tr>
              <td className="py-2 px-4 border-b text-center font-bold bg-[#b4acf8]" colSpan="3">Total Spent (Selected Month)</td>
              <td className="py-2 px-4 border-b text-center font-bold bg-[#b4acf8]">${totalSpentMonthly.toFixed(2)}</td>
            </tr>
            {/* Row for displaying total spent overall */}
            <tr>
              <td className="py-2 px-4 border-b text-center font-bold bg-[#b4acf8]" colSpan="3">Total Spent (Overall)</td>
              <td className="py-2 px-4 border-b text-center font-bold bg-[#b4acf8]">${totalSpentOverall.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="fixed top-40 right-4">
        <CSVLink
          data={csvData}
          filename={`expenses_${selectedMonth || 'all_months'}.csv`}
          className="bg-[#1d3265] text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Download Expenses
        </CSVLink>
      </div>

    </div>
  );
};

export default ExpenseList;
