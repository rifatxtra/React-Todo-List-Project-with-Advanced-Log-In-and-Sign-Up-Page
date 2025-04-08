import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState('');
    const [userID, setUserID] = useState(null);
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('Todolist_loggedInUser');
        if (userId) {
            setUserID(userId);
            const userdetails = JSON.parse(localStorage.getItem(`Todolist_user_${userId}`)) || {};
            setUser(userdetails);
            loadTasks(userId);
        } else {
            alert('Please Log In First');
            navigate('/log-in');
        }
    }, []);

    const loadTasks = (uid) => {
        // Get only the main task items (not the metadata keys)
        const taskKeys = Object.keys(localStorage).filter(key => 
            key.startsWith(`Todolist_task_user_${uid}_taskid_`) && 
            !key.includes('_completed') && 
            !key.includes('_createdDate') && 
            !key.includes('_completedDate')
        );
        
        const allTasks = taskKeys.map(key => {
            // Extract just the numeric task ID
            const taskId = key.replace(`Todolist_task_user_${uid}_taskid_`, '');
            return {
                id: taskId,
                text: localStorage.getItem(key),
                completed: JSON.parse(localStorage.getItem(`Todolist_task_user_${uid}_taskid_${taskId}_completed`)) || false,
                createdDate: localStorage.getItem(`Todolist_task_user_${uid}_taskid_${taskId}_createdDate`) || '',
                completedDate: localStorage.getItem(`Todolist_task_user_${uid}_taskid_${taskId}_completedDate`) || ''
            };
        });
        setTodos(allTasks.reverse());
    };

    const handleAddTask = () => {
        if (task.trim() === '') return;

        let task_tracker = 1;
        const latestKey = `Todolist_latest_task_user_${userID}`;
        if (localStorage.getItem(latestKey)) {
            task_tracker = parseInt(localStorage.getItem(latestKey)) + 1;
        }
        const currentDate = new Date().toISOString(); // Store the current date in ISO format
        localStorage.setItem(latestKey, task_tracker);
        localStorage.setItem(`Todolist_task_user_${userID}_taskid_${task_tracker}`, task);
        localStorage.setItem(`Todolist_task_user_${userID}_taskid_${task_tracker}_completed`, false);
        localStorage.setItem(`Todolist_task_user_${userID}_taskid_${task_tracker}_createdDate`, currentDate);

        alert('Task added successfully!');
        setTask('');
        loadTasks(userID);
    };

    const handleDeleteTask = (taskId) => {
        localStorage.removeItem(`Todolist_task_user_${userID}_taskid_${taskId}`);
        localStorage.removeItem(`Todolist_task_user_${userID}_taskid_${taskId}_completed`);
        localStorage.removeItem(`Todolist_task_user_${userID}_taskid_${taskId}_createdDate`);
        localStorage.removeItem(`Todolist_task_user_${userID}_taskid_${taskId}_completedDate`);
        loadTasks(userID); // Reload tasks after deletion
    };

    const toggleCompletion = (taskId) => {
        const currentStatus = JSON.parse(localStorage.getItem(`Todolist_task_user_${userID}_taskid_${taskId}_completed`));
        const currentDate = new Date().toISOString(); // Current date when completed
        localStorage.setItem(`Todolist_task_user_${userID}_taskid_${taskId}_completed`, !currentStatus);
        
        if (!currentStatus) {
            localStorage.setItem(`Todolist_task_user_${userID}_taskid_${taskId}_completedDate`, currentDate);
        } else {
            localStorage.removeItem(`Todolist_task_user_${userID}_taskid_${taskId}_completedDate`);
        }

        loadTasks(userID);
    };

    const handleLogout = () => {
        localStorage.removeItem('Todolist_loggedInUser');
        alert('Log Out Successful!');
        navigate('/log-in');
    };

    const activeTasks = todos.filter(todo => !todo.completed);
    const completedTasks = todos.filter(todo => todo.completed);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Hello, {user?.name || ''} 👋</h2>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                        Logout
                    </button>
                </div>

                <div className="flex mb-6">
                    <input
                        type="text"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        placeholder="Enter a new task"
                        className="flex-grow p-3 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                    <button
                        onClick={handleAddTask}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 rounded-r-lg"
                    >
                        Add
                    </button>
                </div>

                <h3 className="text-xl font-semibold mb-4">Active Tasks</h3>
                <ul className="space-y-3">
                    {activeTasks.map(todo => (
                        <li key={todo.id} className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-sm">
                            <div>
                                <span>{todo.text}</span>
                                <p className="text-sm text-gray-500">Added on: {new Date(todo.createdDate).toLocaleString()}</p>
                            </div>
                            <div>
                                <button
                                    onClick={() => toggleCompletion(todo.id)}
                                    className="text-green-500 hover:text-green-700"
                                >
                                    Mark as Completed
                                </button>
                                <button
                                    onClick={() => handleDeleteTask(todo.id)}
                                    className="text-red-500 hover:text-red-700 ml-2"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>

                {activeTasks.length === 0 && (
                    <p className="text-center text-gray-500 mt-6">No active tasks yet. Add something!</p>
                )}

                <h3 className="text-xl font-semibold mb-4 mt-8">Completed Tasks</h3>
                <ul className="space-y-3">
                    {completedTasks.map(todo => (
                        <li key={todo.id} className="flex justify-between items-center bg-gray-200 p-3 rounded-lg shadow-sm">
                            <div>
                                <span className="line-through text-gray-600">{todo.text}</span>
                                <p className="text-sm text-gray-500">Added on: {new Date(todo.createdDate).toLocaleString()}</p>
                                <p className="text-sm text-gray-500">Completed on: {new Date(todo.completedDate).toLocaleString()}</p>
                            </div>
                            <div>
                                <button
                                    onClick={() => toggleCompletion(todo.id)}
                                    className="text-yellow-500 hover:text-yellow-700"
                                >
                                    Undo
                                </button>
                                <button
                                    onClick={() => handleDeleteTask(todo.id)}
                                    className="text-red-500 hover:text-red-700 ml-2"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>

                {completedTasks.length === 0 && (
                    <p className="text-center text-gray-500 mt-6">No completed tasks yet.</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
