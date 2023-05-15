"use client";
import { FC } from "react";
import React, { useState } from "react";
import { ImSpinner7 } from "react-icons/im";
import { BsTrash } from "react-icons/bs";
import { useGetBrandQuery } from "@Redux/APIs/BrandApi";
import { useCreateProductsMutation } from "@Redux/APIs/ProductsApi";
import Category from "./(components)/Category";
import AddImage from "./(components)/AddImage";
import { specificationsType } from "@lib/types/product";
import PreviewImege from "./(components)/PreviewImage";
import { toast } from "react-toastify";
// import JoditReact from "jodit-react-ts";
// import 'jodit/build/jodit.min.css';
interface FormProps { }

const Form: FC<FormProps> = ({ }) => {

    const { data: Brand } = useGetBrandQuery();
    const [inputs, setInputs] = useState({
        name: "",
        des: "",
        stock: "",
        price: "",
        brand: "",
        category: "",
        subcategory: "",
        discountprice: "",
    });
    const [fulldes, setFullDes] = useState<string>("");
    const [warranty, setWarranty] = useState(false);
    const [more, setMore] = useState(false);

    const [images, setImages] = useState<string[]>([]);
    const loadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files as FileList;
        for (const file of Array.from(fileList)) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (typeof reader.result === "string") {
                    setImages((imgs: string[]) => [...imgs, reader.result as string]);
                }
            };
            reader.onerror = () => {
                console.log(reader.error);
            };
        }
    };


    const [specs, setSpecs] = useState<specificationsType[]>([]);
    const [specsInput, setSpecsInput] = useState<specificationsType>({
        title: "",
        description: "",
    });

    const handleSpecsChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void => {
        setSpecsInput({ ...specsInput, [e.target.name]: e.target.value });
    };

    const addSpecs = () => {
        if (!specsInput?.title?.trim() || !specsInput?.description?.trim()) return;
        setSpecs([...specs, specsInput]);
        setSpecsInput({ title: "", description: "" });
    };
    const handleChange = ({
        currentTarget: input,
    }: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >) => {
        setInputs({ ...inputs, [input.name]: input.value });
    };
    const [createProducts, { isLoading, isSuccess, isError, error }] =
        useCreateProductsMutation();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { name, des, stock, price, brand, category, subcategory, discountprice,
        } = inputs;
        // if (!name || !des || !stock || !price || !brand || !category || !subcategory || !images || !specs)
        // return {};
        createProducts({ name, des, stock, price, brand, category, subcategory, images, specs, fulldes, discountprice, warranty })
            .unwrap()
            .then(() => {
                console.log('object')
                setImages([]);
                setInputs({
                    name: "", des: "", stock: "", price: "", brand: "",
                    category: "", subcategory: "", discountprice: "",
                });
                setFullDes('');
                setSpecs([]);
                setWarranty(false);
                setMore(false);
            })
            .catch((error: any) => { toast.error(error.data.message); console.log('object') });
    };
    return (
        <>
            {/* {isError && <GetError error={error} danger />}
            {isSuccess && <GetError error={error} success />} */}
            <form onSubmit={handleSubmit} id="submit" className="rounded-xl h-full">
                <div className="grid grid-cols-1 xl:grid-cols-6 gap-y-5 xl:gap-8">
                    <div className="col-span-4 order-2 xl:order-1 space-y-5">
                        <div className="sm:shadow-[.2px_.2px_3px_1px] sm:shadow-gray-200  rounded-lg sm:px-5 xl:px-10  py-5">
                            <div className="w-full">
                                <label className="text-sm py-3 font-light font-serif text-gray-500">
                                    Product Name
                                </label>
                                <input
                                    onChange={handleChange}
                                    value={inputs.name}
                                    name="name"
                                    className="inputfield w-full"
                                    type="text"
                                    placeholder="Product name"
                                />
                            </div>
                            <label className="text-sm py-3 font-light font-serif text-gray-500">
                                Brief Description
                            </label>
                            <textarea
                                onChange={handleChange}
                                value={inputs.des}
                                name="des"
                                className="inputfield w-full h-52 resize-none"
                                cols={10}
                            />
                            <div>
                                <label className="text-sm py-3 font-light font-serif text-gray-500">
                                    Quentity in stock
                                </label>
                                <input
                                    onChange={handleChange}
                                    value={inputs.stock}
                                    name="stock"
                                    className="inputfield w-full"
                                    type="number"
                                    placeholder="Available Pieces"
                                />
                                <label className="text-sm py-3 font-light font-serif text-gray-500">
                                    Brand
                                </label>
                                <select
                                    onChange={handleChange}
                                    value={inputs.brand}
                                    name="brand"
                                    className="inputfield w-full"
                                >
                                    <option value=""> --- Choose One --- </option>
                                    {Brand?.map((cat) => (
                                        <option key={cat._id} value={cat._id}>
                                            {cat.brand}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <Category
                                onChange={handleChange}
                                valuecat={inputs.category}
                                valuesub={inputs.subcategory}
                            />
                        </div>
                        <div className="col-span-2 rounded-lg sm:shadow-[.2px_.2px_3px_1px] sm:shadow-gray-200  xl:py-5 sm:px-5 xl:px-6 xxl:px-10">
                            <p className="my-4 font-serif text-lg">Pricing</p>
                            <div className="flex gap-3 mt-4">
                                <div className="w-1/2">
                                    <label className="text-sm py-3 font-light font-serif text-gray-500">
                                        Price
                                    </label>
                                    <input
                                        onChange={handleChange}
                                        value={inputs.price}
                                        name="price"
                                        min="0"
                                        className="inputfield w-full"
                                        type="number"
                                        placeholder="Price in EG"
                                    />
                                </div>
                                <div className="w-1/2">
                                    <label className="text-sm py-3 font-light font-serif text-gray-500">
                                        Set Old Price{" "}
                                    </label>
                                    <input
                                        onChange={handleChange}
                                        value={inputs.discountprice}
                                        name="discountprice"
                                        min="0"
                                        className="inputfield w-full"
                                        type="number"
                                        placeholder="Price in EG"
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex gap-4">
                                <p>Add More Features ?</p>
                                <input type="checkbox" onChange={() => setMore(!more)} />
                            </div>

                            {!more && (
                                <button
                                    type="submit"
                                    className="btn-success xl:!w-60"
                                    disabled={isLoading}
                                    form="submit"
                                >
                                    {isLoading ? (
                                        <span className="flex items-center justify-center text-2xl py-1 animate-spin">
                                            <ImSpinner7 />
                                        </span>
                                    ) : (
                                        "Submit"
                                    )}
                                </button>
                            )}
                        </div>
                        {more && (
                            <div className="xl:border mt-5 rounded-lg lg:px-5 xl:px-10 py-5">
                                <p className="mb-5 text-base font-Rubik text-gray-500 font-light">
                                    This part is an optainal for product , you can apply all field
                                    or just one
                                </p>

                                <label className="text-sm py-3 font-light font-serif text-gray-500">
                                    Full Description
                                </label>
                                <div className="my-4">
                                    {/* <JoditReact onChange={(content: string) => setFullDes(content)} /> */}
                                </div>
                                <label className="text-sm mb-2 font-light font-serif text-gray-500 py-4">
                                    Specifications
                                </label>
                                <div className="border px-4 rounded-xl py-3 mt-3">
                                    {specs?.map((spic) => (
                                        <div key={spic._id} className="flex gap-5">
                                            <input
                                                className="inputfield w-full"
                                                defaultValue={spic.title}
                                                disabled
                                            />
                                            <input
                                                className="inputfield w-full"
                                                defaultValue={spic.description}
                                                disabled
                                            />
                                            <button
                                                onClick={() =>
                                                    setSpecs((specs) => specs.filter((t) => t !== spic))
                                                }
                                            >
                                                <BsTrash />
                                            </button>
                                        </div>
                                    ))}
                                    <div className=" gap-5 items-center">
                                        <label className="text-sm py-3 font-light font-serif text-gray-500">
                                            Title of Specification
                                        </label>
                                        <div className="flex gap-5">
                                            <input
                                                className="inputfield w-full"
                                                onChange={handleSpecsChange}
                                                value={specsInput.title}
                                                type="text"
                                                name="title"
                                                placeholder="Enter a title for a specification …"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => addSpecs()}
                                                className="border rounded-lg px-4 hover:bg-gray-200 focus:bg-gray-300"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <label className="text-sm py-3 font-light font-serif text-gray-500">
                                            Description of Specification
                                        </label>
                                        <textarea
                                            onChange={handleSpecsChange}
                                            value={specsInput.description}
                                            name="description"
                                            className="inputfield w-full h-52 resize-none"
                                            cols={10}
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-4 py-5 pb-1">
                                    <p className="text-base font-serif font-medium">
                                        Apply Warranty ?
                                    </p>
                                    <input
                                        type="checkbox"
                                        onChange={() => setWarranty(!warranty)}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn-success xl:!w-60"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <span className="flex items-center justify-center text-2xl py-1 animate-spin cursor-progress">
                                            <ImSpinner7 />
                                        </span>
                                    ) : (
                                        "Submit"
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="col-span-2 order-1 xl:order-2 rounded-lg sm:shadow-[.2px_.2px_3px_1px] sm:shadow-gray-200  xl:py-5 lg:px-5 xl:px-6 xxl:px-10">
                        <p className="my-4 font-serif text-lg">Add Images</p>
                        <AddImage onChangeEvent={loadFile} IsMultiple={true} Height={10} />
                        {images?.map((image, index) => (
                            <div key={index}>
                                <PreviewImege
                                    img={image}
                                    onClick={() => setImages(images.filter((e) => e !== image))}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </form>
        </>
    );
};

export default Form;
