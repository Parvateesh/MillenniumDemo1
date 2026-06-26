'use client';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

export default function ConfirmModal({ isOpen, onClose, title, message }: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">×</button>
        <div className="modal-icon-container">
          <div className="checkmark-circle">
            <div className="checkmark-stem"></div>
            <div className="checkmark-kick"></div>
          </div>
        </div>
        <h3 className="modal-title">{title}</h3>
        <p className="modal-message">{message}</p>
        <button className="btn btn-primary" onClick={onClose}>Awesome, Got It!</button>
      </div>
    </div>
  );
}
