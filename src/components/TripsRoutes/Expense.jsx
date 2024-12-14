import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../provider/authProvider';
import { useLocation } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { QuickAccess } from "../QuickAccess";
import { Snackbar } from '@mui/material';
import { ClearIcon } from '@mui/x-date-pickers';

export const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    category: '',
    date: '',
    paidBy: '',
  });
  const { token } = useAuth();
  const location = useLocation();
  const tripId = location.state?.trip?._id;

  const [loading, setLoading] = useState(false); // Loading state for async operations
  const [alertMessage, setAlertMessage] = useState('');
  const [openAlert, setOpenAlert] = useState(false);

  // Fetch expenses with error handling
  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/Expense/${tripId}/activeExpenses`, {
        headers: { Authorization: `bearer ${token}` },
      });
      setExpenses(response.data);
    } catch (error) {
      setAlertMessage('Error fetching expenses');
      setOpenAlert(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tripId) {
      fetchExpenses();
    }
  }, [tripId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewExpense({
      ...newExpense,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`http://localhost:8000/Expense/${tripId}/expenses`, newExpense, {
        headers: { Authorization: `bearer ${token}` },
      });
      setExpenses([...expenses, response.data]);
      setNewExpense({ description: '', amount: '', date: '', paidBy: '' });
      setAlertMessage('Expense added successfully');
      setOpenAlert(true);
    } catch (error) {
      setAlertMessage('Error adding expense');
      setOpenAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const handleReimburse = async (expenseId) => {
    setLoading(true);
    try {
      const response = await axios.put(`http://localhost:8000/Expense/${tripId}/${expenseId}/reimburse`, {
        headers: { Authorization: `bearer ${token}` },
      });
      if (response.status === 200) {
        fetchExpenses();
        setAlertMessage('Expense reimbursed successfully');
        setOpenAlert(true);
      }
    } catch (error) {
      setAlertMessage('Error reimbursing expense');
      setOpenAlert(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <QuickAccess />
      <div className="expenses p-4" style={{ fontFamily: 'Open Sans' }}>
        <h2 className="text-2xl font-bold mb-4 text-5xl text-green-700" style={{ fontFamily: 'Helvetica' }}>
          Expenses
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {expenses.map((expense) => (
              <Paper key={expense._id} elevation={3} className="bg-green-400 text-white p-4 mb-2">
                <p className="text-gray-200">
                  <strong className="text-white">Description:</strong> {expense.description}
                </p>
                <p className="text-gray-200">
                  <strong className="text-white">Category:</strong> {expense.category}
                </p>
                <p className="text-gray-200">
                  <strong className="text-white">Amount:</strong> ${expense.amount}
                </p>
                <p className="text-gray-200">
                  <strong className="text-white">Date:</strong> {new Date(expense.date).toLocaleDateString()}
                </p>
                <p className="text-gray-200">
                  <strong className="text-white">Paid By:</strong> {expense.paidBy}
                </p>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleReimburse(expense._id)}
                  className="text-red-700 font-bold"
                >
                  Reimburse
                </Button>
              </Paper>
            ))}
          </Box>
          <div className="flex flex-col p-5">
            <Box component="form" className="bg-white p-4" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} onSubmit={handleSubmit}>
              <TextField
                label="Description"
                name="description"
                value={newExpense.description}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                margin="normal"
              />
              <TextField
                label="Amount"
                name="amount"
                type="number"
                value={newExpense.amount}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                margin="normal"
              />
              <TextField
                label="Category"
                name="category"
                value={newExpense.category}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                margin="normal"
              />
              <TextField
                label="Date"
                name="date"
                type="date"
                value={newExpense.date}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Paid By (Email)"
                name="paidBy"
                value={newExpense.paidBy}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                margin="normal"
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className="my-2 rounded-2xl bg-green-400 min-w-full"
                disabled={loading}
              >
                {loading ? 'Adding...' : 'Add Expense'}
              </Button>
            </Box>
          </div>
        </div>
      </div>

      {/* Snackbar for alerts */}
      <Snackbar
        open={openAlert}
        autoHideDuration={4000}
        onClose={() => setOpenAlert(false)}
        message={alertMessage}
      />
    </>
  );
};
