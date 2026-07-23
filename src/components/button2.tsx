import React from "react";


interface BtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> 
{
  title: string;
}

function Button2({ title, className = "", onClick, ...props }: BtnProps) {
  return (
    <button
      onClick={onClick}
      {...props}
      className={`relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-slate-900 border border-cyan-300/20 rounded-lg group cursor-pointer shadow-lg shadow-black/20 ${className}`}
    >
      <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-amber-400 rounded-full group-hover:w-56 group-hover:h-56"></span>
      <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-40 bg-gradient-to-b from-cyan-500/20 via-transparent to-slate-950"></span>
      <span className="relative">{title}</span>
    </button>
  );
}

export default Button2;
