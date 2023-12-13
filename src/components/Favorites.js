// Favorites.js
import React, { useState, useEffect } from 'react';
import { FaHeartBroken } from 'react-icons/fa';
import TaskList from './TaskList';

const Favorites = () => {
  const [favoriteTasks, setFavoriteTasks] = useState([]);
  const [removeMessage, setRemoveMessage] = useState('');

  useEffect(() => {
    const favoritesFromStorage = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavoriteTasks(favoritesFromStorage);
  }, []);

  const handleRemoveFavorite = (taskId) => {
    const updatedFavorites = favoriteTasks.filter((task) => task.id !== taskId);
    setFavoriteTasks(updatedFavorites);

    // Update LocalStorage
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

    // Set remove message and clear it after a short delay
    setRemoveMessage('Task removed from favorites');
    setTimeout(() => setRemoveMessage(''), 3000);
  };

  return (
    <div>
      <h2>Favorites</h2>
      {removeMessage && (
        <p style={{ color: 'green', fontSize: '1.2em' }}>{removeMessage}</p>
      )}
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {Array.isArray(favoriteTasks) && favoriteTasks.length > 0 ? (
          favoriteTasks.map((task) => (
            <li key={task.id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}>
              <p>{`${task.firstName} ${task.lastName}`}</p>
              <button
                onClick={() => handleRemoveFavorite(task.id)}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <FaHeartBroken style={{ color: 'red', fontSize: '1.5em' }} />
              </button>
            </li>
          ))
        ) : (
          <p style={{ textAlign: 'center', fontSize: '1.2em' }}>No favorite tasks</p>
        )}
      </ul>
    </div>
  );
};

export default Favorites;
