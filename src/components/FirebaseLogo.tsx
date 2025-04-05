
import React from "react";
import { cn } from "@/lib/utils";

type FirebaseLogoProps = {
  className?: string;
};

export const FirebaseLogo: React.FC<FirebaseLogoProps> = ({ className }) => {
  return (
    <svg
      className={cn("text-yellow-600", className)}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.3 16.5a.64.64 0 0 0-.2.5c0 .33.24.65.65.76l11.21 3.7c.5.16 1.1.11 1.56-.13l4.38-2.75c.2-.13.33-.36.33-.61 0-.24-.13-.46-.32-.59l-11.03-6.12c-.18-.1-.38-.13-.58-.11a1.48 1.48 0 0 0-.49.15L4.3 16.5Z" />
      <path d="M20.04 7.13c0-.2-.12-.37-.32-.46l-3.16-1.4a.62.62 0 0 0-.42-.05L4.3 11.8 9.8 13.1l10.23-5.97Z" />
      <path d="M4.28 16.51 4.3 11.8l5.5 1.31" />
    </svg>
  );
};
