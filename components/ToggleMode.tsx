'use client';

import { Moon,Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";


const ToggleMode = () => {

    const { theme, setTheme } = useTheme();
    // to get the current mounted state
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return    <Button
      variant="outline"
      size="icon"
      className=""
      disabled= {true}
   
    >
        </Button>;
    }

    const dark = theme === "dark";
  return (
    <Button
      variant="outline"
      size="icon"
      className=""
      onClick={() => setTheme(dark ? "light" : "dark")}
    >
        {mounted && (dark ? <Sun className="size-4 cursor-pointer text-primary" /> : <Moon className="size-4 cursor-pointer text-primary" />)}
    </Button>
  );
}

export default ToggleMode
