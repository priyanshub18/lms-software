"use client";

import { Moon, Sun, Settings, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";

interface HeaderProps {
  onLanguageChange: (language: string) => void;
  selectedLanguage: string;
}

export default function Header({ onLanguageChange, selectedLanguage }: HeaderProps) {
  const { theme, setTheme } = useTheme();

  return (
    <div className="h-16 border-b dark:border-gray-700 flex items-center justify-between px-4 bg-white dark:bg-gray-900">
      <div className="flex items-center gap-4">
        <select
          value={selectedLanguage}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="bg-transparent border dark:border-gray-700 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
        </select>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <Settings size={20} />
        </button>
        <div className="flex items-center gap-2">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
          <ChevronDown size={16} />
        </div>
      </div>
    </div>
  );
} 