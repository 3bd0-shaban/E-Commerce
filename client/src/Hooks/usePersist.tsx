'use client';
import { useState, useEffect } from "react";

const usePersist = (): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
    const [persist, setPersist] = useState<boolean>(() => {
        
        if (typeof window === 'undefined') {
            return false;
        }
        return JSON.parse(localStorage.getItem("persist") || "false");
    });

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }
        localStorage.setItem("persist", JSON.stringify(persist));
    }, [persist]);

    return [persist, setPersist];
};

export default usePersist;
