import React, { useState } from 'react';
import axios from 'axios';

export default function AIAssistant() {
  const [prompt, setPrompt] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleQuery = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const userMessage = prompt;
    setChatLog(prev => [...prev, { sender: 'user', text: userMessage }]);
    setPrompt('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/api/ai/query', { prompt: userMessage }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setChatLog(prev => [...prev, { sender: 'ai', text: res.data.response }]);
    } catch (err) {
      setChatLog(prev => [...prev, { sender: 'ai', text: 'Error communicating with AI services.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h2>Clever AI Support Assistant</h2>
      <div style={{ border: '1px solid #ddd', borderRadius: '6px', height: '400px', overflowY: 'auto', padding: '20px', background: '#fafafa', marginBottom: '20px' }}>
        {chatLog.map((chat, idx) => (
          <div key={idx} style={{ marginBottom: '12px', textAlign: chat.sender === 'user' ? 'right' : 'left' }}>
            <span style={{ display: 'inline-block', padding: '10px 15px', borderRadius: '8px', background: chat.sender === 'user' ? '#3498db' : '#e0e0e0', color: chat.sender === 'user' ? '#fff' : '#000' }}>
              {chat.text}
            </span>
          </div>
        ))}
        {loading && <p style={{ fontStyle: 'italic', color: '#666' }}>AI is thinking...</p>}
      </div>
      <form onSubmit={handleQuery} style={{ display: 'flex', gap: '10px' }}>
        <input type="text" value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="Ask anything regarding assignments, events, reports..." style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
        <button type="submit" style={{ padding: '10px 20px', background: '#2ecc71', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Send</button>
      </form>
    </div>
  );
}
