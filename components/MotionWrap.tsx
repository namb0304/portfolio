"use client";

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

const MotionWrap = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // 初期状態：透明で少し下にある
      whileInView={{ opacity: 1, y: 0 }} // 画面内に入ったら：不透明になり元の位置に戻る
      viewport={{ once: false, amount: 0.2 }} // 一度だけ実行、要素が20%見えたら
      transition={{ duration: 0.5, ease: 'easeOut' }} // 0.5秒かけてアニメーション
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default MotionWrap;