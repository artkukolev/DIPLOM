import React, { useEffect } from 'react';

export function Modal({
  open,
  onClose,
  children,
  id,
}: {
  id?: string;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (open) window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  return (
    <div
      className="modal"
      id={id}
      style={{ display: open ? 'flex' : 'none' }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      {children}
    </div>
  );
}

