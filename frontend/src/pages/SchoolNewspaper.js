import React, { useState, useEffect } from 'react';
import { newsAPI } from '../api/client';

export default function SchoolNewspaper() {
  const [news, setNews] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    setLoading(true);
    try {
      const response = await newsAPI.getAll();
      setNews(response.data || []);
    } catch (err) {
      setError('Ошибка при загрузке новостей');
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      setError('Заполните название и текст статьи');
      return;
    }

    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const newArticle = await newsAPI.create({
        title,
        content,
        author: author || user?.fullName || 'Автор',
      });
      setNews([newArticle.data, ...news]);
      setTitle('');
      setContent('');
      setAuthor('');
      setSuccess('✓ Статья опубликована');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Ошибка при опубликовании статьи');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteArticle = async (id) => {
    if (window.confirm('Удалить статью?')) {
      try {
        await newsAPI.delete(id);
        setNews(news.filter((n) => n.id !== id));
        setSuccess('✓ Статья удалена');
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError('Ошибка при удалении статьи');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">📰 Школьная газета</h1>
          <p className="text-purple-100 mt-1">Новости, статьи и объявления</p>
        </div>
      </div>

      {/* Alerts */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 mb-4">
            ❌ {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-700 mb-4">
            {success}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Publish Form */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Написать статью</h2>
              <form onSubmit={handlePublish} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Заголовок *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                    placeholder="Заголовок статьи"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Автор
                  </label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                    placeholder="Ваше имя"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Текст статьи *
                  </label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={6}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                    placeholder="Текст вашей статьи..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Публикация...' : '📤 Опубликовать'}
                </button>
              </form>
            </div>
          </div>

          {/* News Feed */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">
                Все статьи ({news.length})
              </h2>

              {news.length === 0 ? (
                <p className="text-gray-500 text-center py-12">
                  📰 Еще нет опубликованных статей. Напишите первую!
                </p>
              ) : (
                <div className="space-y-4">
                  {news.map((article) => {
                    const publishDate = new Date(article.createdAt);

                    return (
                      <div
                        key={article.id}
                        className="p-4 rounded-xl border-2 border-gray-100 hover:border-purple-200 hover:bg-purple-50 transition"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <h3 className="font-bold text-lg text-gray-900">
                              {article.title}
                            </h3>
                            <div className="flex gap-4 text-sm text-gray-500 mt-1">
                              <span>✍️ {article.author}</span>
                              <span>📅 {publishDate.toLocaleDateString('ru-RU')}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDeleteArticle(article.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition"
                          >
                            Удалить
                          </button>
                        </div>

                        <p className="text-gray-700 mt-3 leading-relaxed line-clamp-3">
                          {article.content}
                        </p>

                        <div className="mt-3 text-right">
                          <button className="text-purple-600 font-semibold hover:text-purple-700 transition">
                            Читать полностью →
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
