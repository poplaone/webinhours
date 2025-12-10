
import React from 'react';
import { cn } from "@/lib/utils";

interface SidebarLogoProps {
  isExpanded: boolean;
}

const SidebarLogo = ({ isExpanded }: SidebarLogoProps) => {
  return (
    <div className="flex items-center justify-between p-4 h-16 shrink-0 border-b border-[#1A1F2C]">
      <div className={cn("flex items-center overflow-hidden", !isExpanded && "justify-center w-full")}>
        <div className="bg-[#9b87f5] rounded-md p-1 flex-shrink-0">
          <img src="/logo.png" alt="WebInHours Logo" className="h-6 w-6 object-contain" />
        </div>
        <div className={cn(
          "ml-2 transition-all duration-300 whitespace-nowrap",
          isExpanded ? "opacity-100 translate-x-0 w-auto" : "opacity-0 -translate-x-4 w-0 pointer-events-none"
        )}>
          <span className="font-semibold text-white">Web in Hours</span>
        </div>
      </div>
    </div>
  );
};

export default SidebarLogo;
