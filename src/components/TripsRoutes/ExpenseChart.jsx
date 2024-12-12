import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
  } from 'chart.js';
  
  ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title
  );
  

const ExpenseChart = ({ expenses,totalExpense }) => {
    // Aggregate expense data into categories
    const expenseBreakdown = expenses.reduce((acc, expense) => {
        const existingCategory = acc.find(item => item.category === expense.category);
        if (existingCategory) {
            existingCategory.amount += expense.amount;
        } else {
            acc.push({ category: expense.category, amount: expense.amount });
        }
        return acc;
    }, []);

    // Prepare data for the chart
    const data = {
        labels: expenseBreakdown.map(item => item.category), // Categories
        datasets: [
            {
                data: expenseBreakdown.map(item => item.amount), // Amounts
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
                ], // Colors for each category
                hoverBackgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
                ],
            }
        ]
    };

    const options = {
        
        plugins: {
          legend: {
            labels: {
              font: {
                size: 12, // Reduce the font size for legends
              },
            },
            position: 'right', // Adjust legend position if needed
          },
          animation: {
            animateScale: true, // Enable scale animation
            animateRotate: true, // Enable rotation animation
          }
        },
      };

    return (
      <>
        <div className="flex flex-col items-center justify-center pb-8 w-2/5 ">
        
          <Pie data={data} options={options}  />
          
        </div>
      </>
    );
};

export default ExpenseChart;