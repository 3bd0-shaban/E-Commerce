'use client';
import { PathContext } from "@Contexts/PathContext";
import { useContext } from "react";

const usePath = () => {
    const { isDash } = useContext(PathContext);
    console.log(isDash)
    return { isDash };
};
export default usePath