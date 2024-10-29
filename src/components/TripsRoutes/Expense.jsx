import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../provider/authProvider';
import { useLocation } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {QuickAccess} from "../QuickAccess";

export const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    date: '',
    paidBy: '',
  });
  const { token } = useAuth();
  const location = useLocation();
  const tripId = location.state?.trip?._id;

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/trips/${tripId}/expenses`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setExpenses(response.data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    if (tripId) {
      fetchExpenses();
    }
  }, [tripId, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewExpense({
      ...newExpense,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8000/trips/${tripId}/expenses`, newExpense, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setExpenses([...expenses, response.data]);
      setNewExpense({ description: '', amount: '', date: '', paidBy: '' });
      console.log(expenses);
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  return (
    <>
    <QuickAccess />
    <div className="expenses p-4" style={{fontFamily:'Open Sans'}}>
    
      <h2 className="text-2xl font-bold mb-4 text-5xl text-green-700" style={{fontFamily:'Helvetica'}}>Expenses</h2>
      <div className="grid grid-cols-2 gap-4">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {expenses.map(expense => (
            <Paper key={expense._id} elevation={3} className="bg-green-400 text-white p-4 mb-2">
              <p className="text-gray-200"><strong className="text-white">Description:</strong> {expense.description}</p>
              <p className="text-gray-200"><strong className="text-white">Amount:</strong> ${expense.amount}</p>
              <p className="text-gray-200"><strong className="text-white">Date:</strong> {new Date(expense.date).toLocaleDateString()}</p>
              <p className="text-gray-200"><strong className="text-white">Paid By:</strong> {expense.paidBy}</p>
            </Paper>
          ))}
        </Box>
        <div className="flex flex-col p-5">
            
        <Box component="form" className="bg-white p-4" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} onSubmit={handleSubmit}>
        <div className="mb-4">
              <label className="block text-lg font-bold mb-2" htmlFor="source">
                Description
              </label>
              <TextField className="bg-transparent border-b-0 border-t-0 border-l-0 border-r-0 w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                label="Description"
            name="description"
            value={newExpense.description}
            onChange={handleChange}
            required
          /></div>
          <div className="mb-4">
              <label className="block text-lg font-bold mb-2" htmlFor="source">
                Amount
              </label>
              <TextField className="bg-transparent border-b-0 border-t-0 border-l-0 border-r-0 w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                 label="Amount"
                 name="amount"
                 type="number"
                 value={newExpense.amount}
                 onChange={handleChange}
                 required
               /></div>
          
          <div className="mb-4">
              <label className="block text-lg font-bold mb-2" htmlFor="source">
                Amount
              </label>
              <TextField className="bg-transparent border-b-0 border-t-0 border-l-0 border-r-0 w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  label="Date"
                  name="date"
                  type="date"
                  value={newExpense.date}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  required
                /></div>
          
          <div className="mb-4">
              <label className="block text-lg font-bold mb-2" htmlFor="source">
                Amount
              </label>
             
          <TextField className="bg-transparent border-b-0 border-t-0 border-l-0 border-r-0 w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            label="Paid By (Email)"
            name="paidBy"
            value={newExpense.paidBy}
            onChange={handleChange}
            required
          /></div>
          <Button
                color="success"
                type="submit"
                size="lg"
                type="button"
                className="my-2 rounded-2xl bg-green-400 min-w-full text-white"
                onClick={handleSubmit}
              >Add Expense</Button>
        </Box></div>
      </div>
    </div>
    </>
  );
};
