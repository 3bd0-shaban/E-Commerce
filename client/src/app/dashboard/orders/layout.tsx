import Link from "next/link";
import React from "react";
export const metadata = {
    title: "All Orders Dashboard",
};
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="container px-1 max-w-full">
                <p className="text-4xl xl:text-5xl font-Rubik ">Features</p>
                <div className="flex gap-6 font-light text-xl mt-5">
                    <Link
                        draggable={false}
                        href='category'
                        className="border-b-transparent hover:border-b-black"
                    >
                        Categores
                    </Link>
                    <Link
                        draggable={false}
                        href='brand'
                        className="border-b-transparent hover:border-b-black"
                    >
                        Brands
                    </Link>
                    <Link
                        draggable={false}
                        href='banner'
                        className="border-b-transparent hover:border-b-black"
                    >
                        Banners
                    </Link>
                </div>
                <hr className="mt-3 h-[2px] bg-gray-400 rounded" />
                {children}
            </div>
        </>
    );
}
