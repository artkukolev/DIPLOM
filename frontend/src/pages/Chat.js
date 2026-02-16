import React, { useEffect, useState } from 'react';
import { messagesAPI } from '../api/client';

export default function Chat() {
  const [conversationId] = useState(1);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  const load = async () => {
    try {
      const res = await messagesAPI.listConversations();
      const conv = res.data.find(c => c.id === conversationId) || { messages: [] };
      setMessages(conv.messages || []);
    } catch (err) { console.error(err); }
  };

  useEffect(()=>{ load(); }, []);

  const handleSend = async () => {
    if (!text) return;
    try {
      const res = await messagesAPI.sendMessage(conversationId, text);
      setMessages((m)=>[...m, res.data]);
      setText('');
    } catch (err) { console.error(err); }
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Чат с преподавателем</h1>
      <div className="max-w-3xl mx-auto flex flex-col gap-3">
        <div className="bg-white p-4 rounded shadow h-80 overflow-y-auto">
          {messages.map(m => (
            <div key={m.id} className="mb-2">
              <div className="text-sm text-gray-600">{new Date(m.createdAt).toLocaleString()}</div>
              <div className="mt-1">{m.text}</div>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input value={text} onChange={(e)=>setText(e.target.value)} className="flex-1 px-3 py-2 border rounded" placeholder="Ваше сообщение..." />
          <button onClick={handleSend} className="bg-blue-600 text-white px-4 py-2 rounded">Отправить</button>
        </div>
      </div>
    </div>
  );
}
