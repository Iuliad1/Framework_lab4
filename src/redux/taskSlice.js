// tasksSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllTasks } from '../services/TaskService';

const initialState = {
  data: [],
  status: 'idle',
  error: null,
};

// Create an async thunk for fetching tasks
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  try {
    const tasks = await getAllTasks();
    return tasks;
  } catch (error) {
    throw error;
  }
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    removeTask: (state, action) => {
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { removeTask } = tasksSlice.actions;
export default tasksSlice.reducer;
