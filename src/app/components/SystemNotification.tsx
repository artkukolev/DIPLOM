import React from 'react';
import { useUnit } from 'effector-react';
import { $notification, hideNotification } from '../model/notifications';

export function SystemNotification() {
  const { visible, message, type } = useUnit($notification);

  const className = [
    'system-notification',
    visible ? 'show' : '',
    type === 'error' ? 'error' : '',
    type === 'warning' ? 'warning' : '',
    type === 'info' ? 'info' : '',
  ]
    .filter(Boolean)
    .join(' ');

  // Icon in CSS is decorative; keep existing HTML structure
  return (
    <div className={className} id="systemNotification" role="status" aria-live="polite" onClick={() => hideNotification()}>
      <i className="fas fa-check-circle"></i>
      <span id="notificationText">{message || 'Операция выполнена успешно!'}</span>
    </div>
  );
}

