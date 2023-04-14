'use client';
import React from 'react'
import { useTheme } from 'next-themes'
import { BsMoonFill, BsSunFill } from 'react-icons/bs';

export default function Themetoggle() {
    const { theme, setTheme } = useTheme()
    return (
        <div>
            <button
                aria-label='change mode'
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full p-3">
                {theme === "light" ? (
                    <BsSunFill
                        fontSize={20}
                    />
                ) : (
                    <BsMoonFill
                        fontSize={20}
                    />
                )}
            </button>
        </div>
    )
}