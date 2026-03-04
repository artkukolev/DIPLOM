import React, { useEffect, useState } from 'react';
import { messagesAPI } from '../api/client';

export default function Messages() {
  const [conv, setConv] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await messagesAPI.listConversations();
      setConv(res.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(()=>{ load(); }, []);

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Сообщения</h1>
      {loading && <p>Загрузка...</p>}
      {conv.length === 0 && !loading && <p className="text-gray-500">Нет бесед. Начните чат через страницу ученика или преподавателя.</p>}
      <div className="space-y-3 mt-4">
        {conv.map(c => (
          <div key={c.id} className="p-4 bg-white rounded shadow">
            <div className="flex justify-between">
              <div className="font-semibold">Беседа #{c.id}</div>
              <div className="text-sm text-gray-500">{c.messages?.length || 0} сообщений</div>
            </div>
            <div className="mt-2 text-sm text-gray-600">{c.messages?.slice(-1)[0]?.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
