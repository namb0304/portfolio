"use client";

import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { IoClose } from 'react-icons/io5';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 transition-opacity duration-300"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-800 rounded-lg shadow-xl relative w-auto max-w-lg m-4"
      >
        <button
          onClick={onClose}
          aria-label="閉じる"
          className="absolute -top-4 -right-4 text-white bg-gray-700 rounded-full p-1 hover:bg-red-500 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          <IoClose size={24} />
        </button>

        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;