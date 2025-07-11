import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import './ChatBot.css';
import BotIcon from '../components/icons/BotIcon'
import UserIcon from '../components/icons/UserIcon';
import { useSelector, useDispatch } from 'react-redux';
import {
  addMessage,
  clearMessages,
  setRole,
  setError,
  setTyping,
  setLoading, setUserTyping
} from '../store/ChatSlice';
import { Send, Bot, User, Loader2, RefreshCw, AlertCircle, Settings, MessageSquare, Trash2 } from 'lucide-react';


const ChatBot = () => {
  const messages = useSelector(state => state.chat.messages);
  const selectedRole = useSelector(state => state.chat.selectedRole);
  const dispatch = useDispatch();
  const isTyping = useSelector(state => state.chat.isTyping);
  const isLoading = useSelector(state => state.chat.isLoading);
  const error = useSelector(state => state.chat.error);
  const isUserTyping = useSelector(state => state.chat.isUserTyping);
  const [inputText, setInputText] = useState('');
  const [apiEndpoint, setApiEndpoint] = useState('http://hackathon-2025-compute.snlhrprshared1.gbucdsint02lhr.oraclevcn.com:5050/api/chat');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const makeAPICall = async (endpoint, payload) => {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    dispatch(addMessage(userMessage));
    dispatch(setError(null));
    dispatch(setLoading(true));
    dispatch(setUserTyping(false));
    const currentInput = inputText;
    setInputText('');

    try {
      const previousQuestions = messages
        .filter(m => m.sender === 'user')
        .map(m => ({ question: m.text }));

      const payload = {
        role: 'Hospitalist',
        question: currentInput,
        previous_questions: previousQuestions
      };

      const responseData = await makeAPICall(apiEndpoint, payload);

      const botMessage = {
        id: Date.now() + 1,
        text: responseData.answer || 'I received your message but couldn\'t generate a response.',
        sender: 'bot',
        timestamp: new Date().toISOString()
      };

      dispatch(addMessage(botMessage));
    } catch (err) {
      console.error('API Error:', err);

      let errorMessage = 'Sorry, I encountered an error. Please try again.';

      if (err.name === 'AbortError') errorMessage = 'Request timed out. Please try again or check your connection.';
      else if (err.message.includes('401')) errorMessage = 'Authentication failed. Please check your API key in settings.';
      else if (err.message.includes('429')) errorMessage = 'Rate limit exceeded. Please wait a moment and try again.';
      else if (err.message.includes('400')) errorMessage = 'Invalid request format. Please check your API endpoint configuration.';
      else if (err.message.includes('500') || err.message.includes('502') || err.message.includes('503')) errorMessage = 'Server error. The API service may be temporarily unavailable.';
      else if (!navigator.onLine) errorMessage = 'No internet connection. Please check your network and try again.';

      dispatch(setError(errorMessage));

      const errorBotMessage = {
        id: Date.now() + 1,
        text: errorMessage,
        sender: 'bot',
        timestamp: new Date().toISOString(),
        isError: true
      };

      dispatch(addMessage(errorBotMessage));
    } finally {
      dispatch(setLoading(false));
       dispatch(setUserTyping(false));
    }
  };

  const clearConversation = () => {
    dispatch(clearMessages());
    setError(null);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatBotText = (text) => {
  if (!text) return '';

  // Escape HTML first
  let safeText = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Bold using markdown-style **bold**
  safeText = safeText.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  // Convert numbered lists if needed (optional, add later if required)

  // Convert newlines to <br/>
  safeText = safeText.replace(/\n/g, '<br/>');

  return safeText;
};


  return (
    <div className="chat-container">
      <header className="chat-header">
        <div className="chat-title">
          <BotIcon className="icon bot-icon" />
          <h1>AI Assistant</h1>
        </div>
        <div className="chat-controls">
          <div className="tooltip-wrapper">
            <button onClick={clearConversation}>
              <Trash2 />
            </button>
            <span className="tooltip-text">Clear chat history</span>
          </div>
        </div>
      </header>

      {/* <div className="chat-role-selector">
        <label htmlFor="role">Select Your Role:</label>
        <select
          id="role"
          value={selectedRole}
          onChange={(e) => dispatch(setRole(e.target.value))}
        >

          <option value="Hospitalist">Hospitalist</option>
          <option value="Nurse">Nurse</option>
          <option value="Doctor">Doctor</option>
        </select>
      </div> */}


      <main className="chat-messages">
        {messages.map((msg) => (
  <div key={msg.id} className={`message ${msg.sender}`}>
    <div className="avatar">
      {msg.sender === 'bot' ? <BotIcon className="icon bot-icon" /> : <UserIcon className="icon user-icon" />}
    </div>
    <div className="message-bubble">
      {msg.sender === 'bot' ? (
        <ReactMarkdown class="formatted-text">
          {msg.text}
        </ReactMarkdown>
      ) : (
        <p className="user-text">{msg.text}</p>
      )}
      <span className="timestamp">{formatTime(msg.timestamp)}</span>
    </div>
  </div>
))}
        {(isUserTyping || isLoading) && (
          <p className="status-text">
            {(isUserTyping && inputRef) ? 'Typing…' : isLoading ? 'Processing…' : ''}
          </p>
        )}

        {error && <p className="error-text">{error}</p>}
        <div ref={messagesEndRef} />
      </main>

      <footer className="chat-input">
        <form onSubmit={handleSendMessage}>
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
              dispatch(setUserTyping(e.target.value.trim() !== ""));
            }}
            placeholder="Ask Your Question..."
            disabled={isLoading}
          />

          <button type="submit" disabled={!inputText.trim() || isLoading}>
            {isLoading ? <Loader2 className="icon spin" /> : <Send className="icon" />}
          </button>
        </form>
      </footer>
    </div>
  );
};

export default ChatBot;
