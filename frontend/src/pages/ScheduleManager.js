import React, { useEffect, useState } from 'react';
import { scheduleAPI } from '../api/client';

export default function ScheduleManager() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await scheduleAPI.list();
      setItems(res.data);
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  };

  useEffect(()=>{ load(); }, []);

  const handleCreate = async () => {
    if (!title || !time) return;
    try {
      const res = await scheduleAPI.create({ title, time });
      setItems((s)=>[...s, res.data]);
      setTitle(''); setTime('');
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    try {
      await scheduleAPI.delete(id);
      setItems((s)=>s.filter(i=>i.id!==id));
    } catch (err) { console.error(err); }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Управление расписанием</h1>
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="grid grid-cols-3 gap-2">
            <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Название" className="col-span-2 px-3 py-2 border rounded" />
            <input value={time} onChange={(e)=>setTime(e.target.value)} placeholder="Время/дата" className="px-3 py-2 border rounded" />
          </div>
          <div className="flex justify-end mt-3">
            <button onClick={handleCreate} className="bg-green-600 text-white px-4 py-2 rounded">Добавить</button>
          </div>
        </div>

        <div className="space-y-3">
          {items.map(i => (
            <div key={i.id} className="p-4 bg-white rounded shadow flex justify-between items-center">
              <div>
                <div className="font-semibold">{i.title}</div>
                <div className="text-sm text-gray-500">{i.time}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={()=>handleDelete(i.id)} className="bg-red-500 text-white px-3 py-1 rounded">Удалить</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
