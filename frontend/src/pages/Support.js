import React, { useEffect, useState } from 'react';
import { supportAPI } from '../api/client';

export default function Support() {
  const [tickets, setTickets] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await supportAPI.listTickets();
      setTickets(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async () => {
    if (!title) return;
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem('user')) || { username: 'guest' };
      const res = await supportAPI.createTicket({ title, description, createdBy: user.username });
      setTitle(''); setDescription('');
      setTickets((t) => [res.data, ...t]);
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Техподдержка</h1>
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Короткое описание проблемы" className="w-full px-3 py-2 border rounded mb-2" />
          <textarea value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Подробности" className="w-full px-3 py-2 border rounded mb-2" rows={4} />
          <div className="flex justify-end">
            <button onClick={handleCreate} disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">Отправить</button>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Мои тикеты</h2>
          {loading && <p>Загрузка...</p>}
          {tickets.length === 0 && !loading && <p className="text-gray-500">Пока нет тикетов.</p>}
          <div className="space-y-3 mt-3">
            {tickets.map(t => (
              <div key={t.id} className="p-4 bg-white rounded shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold">{t.title}</div>
                    <div className="text-sm text-gray-600">{t.description}</div>
                    <div className="text-xs text-gray-400 mt-2">Создано: {new Date(t.createdAt).toLocaleString()} by {t.createdBy}</div>
                  </div>
                  <div className="text-sm">
                    <span className={`px-2 py-1 rounded text-white ${t.status === 'open' ? 'bg-green-500' : 'bg-gray-500'}`}>{t.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
