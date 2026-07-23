import { Link } from "react-router-dom";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface Button1Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  title: string;
  children?: ReactNode;
}

const buttonClasses =
  "relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group cursor-pointer";

function ButtonContents({ title }: { title: string }) {
  return (
    <>
      <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-green-500 rounded-full group-hover:w-56 group-hover:h-56" />
      <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700" />
      <span className="relative">{title}</span>
    </>
  );
}

function Button1({ href, title, children, className = "", ...props }: Button1Props) {
  const classes = `${buttonClasses} ${className}`;

  if (href) {
    return (
      <Link to={href} className={classes}>
        <ButtonContents title={title} />
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      <ButtonContents title={title} />
      {children}
    </button>
  );
}

export default Button1;
