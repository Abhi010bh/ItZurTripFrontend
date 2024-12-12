import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../provider/authProvider';

const TodoList = ({ tripId }) => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [isAddingTask, setIsAddingTask] = useState(false);
  const { token } = useAuth();

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/Task/tasks/${tripId}`, {
        headers: {
          Authorization: `bearer ${token}`
        }
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async () => {
    if (taskInput.trim() === '') return;
    try {
      const newTask = {
        tripId,
        taskDescription: taskInput.trim(),
        priority
      };
      const response = await axios.post(`http://localhost:8000/Task/tasks`, newTask, {
        headers: {
          Authorization: `bearer ${token}`
        }
      });
      setTasks([...tasks, response.data]);
      setTaskInput('');
      setIsAddingTask(false);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const removeTask = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/Task/tasks/${id}`, {
        headers: {
          Authorization: `bearer ${token}`
        }
      });
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error('Error removing task:', error);
    }
  };

  const toggleTaskCompletion = async (id, isCompleted) => {
    try {
      const updatedTask = { isCompleted: !isCompleted };
      const response = await axios.put(`http://localhost:8000/Task/tasks/${id}`, updatedTask, {
        headers: {
          Authorization: `bearer ${token}`
        }
      });
      setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  useEffect(() => {
    if (tripId) {
      fetchTasks();
    }
  }, [tripId]);

  return (
    <div className="todo-list" style={{ fontFamily: 'Open Sans', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <h2 className="text-2xl font-extrabold px-5 mb-4">To do</h2>

      {/* Task Container with Scroll */}
      <div
        className="task-container"
        style={{
          maxHeight: '250px', // Limit the height of the task container
          overflowY: 'auto', // Enable scrolling if tasks overflow
          paddingRight: '15px',
          flexGrow: 1, // Ensure this grows to fill available space
          marginBottom: '10px', // Space between the task list and the button
          scrollbarWidth: 'thin', // Optional: style the scrollbar for Firefox
        }}
      >
        <ul className="list-disc pl-5 flex-grow">
          {tasks.length > 0 ? (
            tasks.map((task) => (
                <li key={task._id} className="flex items-center justify-between mb-2">
                <div className="flex items-center w-full justify-between">
                  {/* Task description */}
                  <div className="flex-1">
                    <input
                      type="checkbox"
                      checked={task.isCompleted}
                      onChange={() => toggleTaskCompletion(task._id, task.isCompleted)}
                      className="mr-2 border-gray-50 custom-checkbox"
                    />
                    <span className={`${task.isCompleted ? 'text-gray-600' : ''}`}>
                      {task.taskDescription}
                    </span>
                  </div>
              
                  {/* Priority */}
                  <div className="ml-4 flex items-center pr-5">
                    <span
                      className={`
                        ${task.priority === 'High' ? 'text-red-500' : ''}
                        ${task.priority === 'Medium' ? 'text-yellow-500' : ''}
                        ${task.priority === 'Low' ? 'text-blue-500' : ''}
                      `}
                    >
                      {task.priority}
                    </span>
                  </div>
                </div>
              
                {/* Remove Button */}
                <div>
                  <button
                    onClick={() => removeTask(task._id)}
                    className="text-red-500 hover:text-red-700 px-10  font-bold"
                  >
                    Remove
                  </button>
                </div>
              </li>
              
            ))
          ) : (
            <p>No tasks yet.</p>
          )}
        </ul>
      </div>

      {/* Add Task Button - Positioned at the left */}
      <div className="mt-auto">
        <button
          onClick={() => setIsAddingTask(true)}
          className="text-green-500 font-bold px-4 py-2 rounded-l hover:text-green-400 mb-4 mt-auto block"
        >
          Add Task
        </button>
      </div>

      {/* Add Task Input and Buttons */}
      {isAddingTask && (
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Enter a task..."
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            className="border-gray-50 p-2 flex-grow rounded-l"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="border-gray-50 p-2 rounded-l ml-2"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <button
            onClick={addTask}
            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
          >
            Add
          </button>
          <button
            onClick={() => setIsAddingTask(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded-r hover:bg-gray-600 ml-2"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoList;
