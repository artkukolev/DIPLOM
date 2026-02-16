#!/bin/bash

# Quick Start Script for Student Records System
# Скрипт быстрого старта системы учёта личных дел учащихся

echo "================================================"
echo "📚 Система учёта личных дел учащихся"
echo "================================================"
echo ""

# Проверка Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js не установлен"
    echo "Скачайте Node.js с https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js установлен: $(node --version)"
echo "✅ npm установлен: $(npm --version)"
echo ""

# Установка зависимостей
echo "📦 Установка зависимостей..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Ошибка при установке зависимостей backend"
    exit 1
fi

cd frontend
npm install

if [ $? -ne 0 ]; then
    echo "❌ Ошибка при установке зависимостей frontend"
    exit 1
fi

cd ..

echo ""
echo "================================================"
echo "✅ Установка завершена успешно!"
echo "================================================"
echo ""
echo "🚀 Для запуска используйте:"
echo ""
echo "  npm run dev     - запустить оба сервера"
echo ""
echo "  Или отдельно:"
echo "  npm start       - backend (порт 5000)"
echo "  npm run client  - frontend (порт 3000)"
echo ""
echo "🌐 Приложение откроется на http://localhost:3000"
echo ""
echo "🔐 Учётные данные:"
echo "   Пользователь: admin"
echo "   Пароль: admin123"
echo ""
echo "📚 Документация в папке docs/"
echo "================================================"
