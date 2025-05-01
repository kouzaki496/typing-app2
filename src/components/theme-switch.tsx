'use client';

import { useTheme } from 'next-themes';
import { Switch } from '@/components/ui/';
import { useEffect, useState } from 'react';
import { Moon, Sun } from "lucide-react"

export function ThemeSwitch() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
  setIsDark(resolvedTheme==="dark")
  },[resolvedTheme]);

  const handleThemeChange = (checked: boolean) => {
    setIsDark(checked);
    setTheme(checked ? "dark" : "light");
  };

  return (
    <div className="flex items-center space-x-2">
      <span><Sun className="size-4"/></span>
      <Switch
        checked={isDark}
        onCheckedChange={handleThemeChange}
        aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        className="transition-all duration-300 data-[state=checked]:bg-white data-[state=unchecked]:bg-yellow-400"
      />
      <span><Moon className="size-4"/></span>
    </div>
  );
}

