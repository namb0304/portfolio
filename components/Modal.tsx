"use client";

import { ReactNode } from 'react';
import { IoClose } from 'react-icons/io5';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    // 背景のオーバーレイ
    <div 
      onClick={onClose} 
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 transition-opacity duration-300"
    >
      {/* ポップアップ本体 */}
      <div 
        onClick={(e) => e.stopPropagation()} // 中身のクリックで閉じないようにする
        className="bg-gray-800 rounded-lg shadow-xl relative w-auto max-w-lg m-4"
      >
        {/* 閉じるボタン */}
        <button 
          onClick={onClose} 
          className="absolute -top-4 -right-4 text-white bg-gray-700 rounded-full p-1 hover:bg-red-500 transition-colors"
        >
          <IoClose size={24} />
        </button>

        {/* 表示する中身 */}
        {children}
      </div>
    </div>
  );
};

export default Modal;