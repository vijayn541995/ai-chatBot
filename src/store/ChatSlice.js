import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [
    {
      id: 1,
      text: "Hello, I’m your AI Assistant. How may I assist you today?",
      sender: 'bot',
      timestamp: new Date().toISOString()
    }
  ],
  selectedRole: 'Hospitalist',
  error: null,
  isTyping: false,
  isUserTyping: false, 
  isLoading: false
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    clearMessages: (state) => {
      state.messages = [...initialState.messages];
      state.error = null;
      state.isTyping = false;
    },
    setRole: (state, action) => {
      state.selectedRole = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setTyping: (state, action) => {
      state.isTyping = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setUserTyping: (state, action) => {
  state.isUserTyping = action.payload;
},

  }
});

export const {
  addMessage,
  clearMessages,
  setRole,
  setError,
  setTyping,
  setLoading,
  setUserTyping
} = chatSlice.actions;

export default chatSlice.reducer;
