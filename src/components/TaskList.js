// TaskList.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Skeleton from '../services/Skeleton';
import { fetchTasks, removeTask } from '../redux/taskSlice';
import TaskBlock from './TaskBlock';

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.data);
  const status = useSelector((state) => state.tasks.status);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleDeleteTask = async (taskId) => {
    try {
      await dispatch(removeTask(taskId));
      window.location.reload(); // Face refresh la pagina după ștergere
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '1.5em', color: '#333', marginBottom: '15px' }}>Task List</h2>

      {status === 'loading' ? (
        <div>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : status === 'failed' ? (
        <p style={{ textAlign: 'center', fontSize: '1.2em', color: 'red' }}>Failed to fetch tasks</p>
      ) : tasks.length === 0 ? (
        <p style={{ textAlign: 'center', fontSize: '1.2em' }}>No tasks found</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {tasks.map((task) => (
            <li key={task.id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}>
              <TaskBlock task={task} onDelete={() => handleDeleteTask(task.id)} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;

