"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface TouchCardProps {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}

export default function TouchCard({ onClick, children, className = "", disabled = false }: TouchCardProps) {
  return (
    <motion.div
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      onClick={disabled ? undefined : onClick}
      className={`rounded-3xl shadow-lg cursor-pointer select-none touch-manipulation ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
    >
      {children}
    </motion.div>
  );
}
