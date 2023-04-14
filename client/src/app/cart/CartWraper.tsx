'use client';
import Footer from "@Components/app/Footer";
import Header from "@Components/app/Header";
import React from "react";

export default function CartWraper({
    children
}: {
    children: React.ReactNode;
}) {
    
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}