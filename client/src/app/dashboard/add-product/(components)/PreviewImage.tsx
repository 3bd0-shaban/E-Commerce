'use client';
import Image from "next/image";
import React from "react";
import { BsTrash } from "react-icons/bs";

interface PreviewImageProps {
    img: string;
    onClick: () => void;
}

const PreviewImege: React.FC<PreviewImageProps> = ({ onClick, img }) => {
    return (
        <div className="mb-4">
            <div className="border rounded-md  py-3 mt-5 w-full flex justify-between">
                <div className="flex items-center">
                    <Image
                        draggable={false}
                        className="h-12 w-12 object-cover mx-3"
                        src={img}
                        alt=""
                        width={48}
                        height={48}
                    />
                    <div>
                        <p>product name</p>
                        <p className="text-xs">product name</p>
                    </div>
                </div>
                <button
                    type="button"
                    className="mr-2 text-3xl flex items-center"
                    onClick={onClick}
                >
                    <BsTrash />
                </button>
            </div>
        </div>
    );
};

export default PreviewImege;
