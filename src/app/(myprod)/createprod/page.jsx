"use client"

import { LuArrowUpDown } from "react-icons/lu";
import IncrementQuantity from "../../components/IncrementQuantity";
import ActionIcons from "../../components/ActionIcons"
import { useState, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import CustomModal from "../../components/Modal/Modal";
import { todayDate } from "../../config/dateFormatter";
import SearchSelect from "../../components/Search-select/Search-Select";
import { FaArrowRotateLeft } from "react-icons/fa6";
import axios from "axios";
import { FaPercent } from "react-icons/fa";

export default function ReturnMedicine() {

    const [selectedProduct, setSelectedProduct] = useState(null)
    const [tableData, setTableData] = useState([])
    const [openResetModal, setOpenResetModal] = useState(false)
    const productRef = useRef()
    const [lessPercentage, setLessPercentage] = useState(0)
    const [name, setName] = useState("")

    const boxPrice = 0
    const quantities = 0
    const expire = 0
    const milligram = 0

    const handleCloseModal = e => {
        e.preventDefault()
        setOpenResetModal(false)
    }

    const handleNameChange = e => {
        const value = e.target.value
        setName(value)
    }

    const handleExpireDate = (e, index) => {
        const newTableData = [...tableData];
        let input = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters

        // Insert slashes at the correct positions for dd/mm/yyyy
        if (input.length >= 3 && input.length <= 4) {
            input = input.replace(/(\d{2})(\d{1,2})/, "$1/$2");
        } else if (input.length >= 5) {
            input = input.replace(/(\d{2})(\d{2})(\d{1,4})/, "$1/$2/$3");
        }

        // Update the expireDate for the specific row at the index
        newTableData[index].expireDate = input;

        // Update the tableData state
        setTableData(newTableData);
    };

    const handleBoxPrice = (e, index) => {
        const newTableData = [...tableData];
        const productCost = parseFloat(e.target.value);

        // Ensure productCost is a valid number, default to 0 if not
        newTableData[index].productBoxPrice = isNaN(productCost) ? 0 : productCost;
        // Recalculate unit price based on total quantities
        newTableData[index].productUnitPrice = newTableData[index].productBoxPrice / newTableData[index].totalQuantities;
        newTableData[index].subTotal
        setTableData(newTableData);
    };

    const handleQuantitiesChange = (e, index) => {
        const newTableData = [...tableData];
        const quantities = parseFloat(e.target.value);

        // Ensure quantities is a valid number, default to 0 if not
        newTableData[index].totalQuantities = isNaN(quantities) ? 0 : quantities;
        // Recalculate unit price based on updated quantities
        newTableData[index].productUnitPrice = newTableData[index].productBoxPrice / newTableData[index].totalQuantities;

        setTableData(newTableData);
    };

    const handleMilligramChange = (e, index) => {
        const newTableData = [...tableData];
        const milligramValue = isNaN(e.target.value) ? 0 : (e.target.value);

        // Update milligram value for the specific row at the index
        newTableData[index].productMilligram = milligramValue;

        setTableData(newTableData);
    };

    // Add item to table function
    const addItemToTable = (e) => {
        e.preventDefault();
        const newProductName = selectedProduct?.productName;
        const existingProduct = tableData.find(v => v.productName === newProductName);

        console.log(newProductName);
        if (!newProductName) {
            toast.warn("Enter or select one product!");
        } else if (!existingProduct) {
            const newProduct = {
                productName: newProductName,
                productMilligram: milligram,
                productBoxPrice: boxPrice || 0,
                totalQuantities: quantities || 0,
                expireDate: expire || '',
                productUnitPrice: boxPrice / (quantities || 1),
                quantity: parseInt(selectedProduct.quantity) || 1,
                subTotal: (parseFloat(selectedProduct.productCost) || 0) * (parseInt(selectedProduct.quantity) || 1),
            };

            // Add new product to tableData
            setTableData([...tableData, newProduct]);

            // Clear input fields
            productRef.current.clearSearchTerm();
            productRef.current.clearSelect();
        } else {
            toast.warn("Product already added!");
            productRef.current.clearSearchTerm();
            productRef.current.clearSelect();
        }
    };

    const calculateTotalCost = () => {
        return tableData.reduce((acc, item) => acc + item.subTotal, 0).toFixed(2);
    };

    const calculateTotalQuantity = () => {
        return tableData.reduce((acc, item) => acc + item.quantity, 0);
    };

    const handleQuantityChange = (quantity, index) => {
        const newTableData = [...tableData];
        // Ensure quantity is a valid number, default to 1 if not
        newTableData[index].quantity = isNaN(quantity) ? 1 : quantity;
        newTableData[index].subTotal = newTableData[index].quantity * newTableData[index].productUnitPrice;
        setTableData(newTableData);
    };

    const handleTotal = () => {
        const totalCost = parseFloat(calculateTotalCost());
        return totalCost.toFixed(2) + " " + "PKR"
    }

    const handlePercentage = e => {
        const value = isNaN(e.target.value) ? 0 : (e.target.value)
        setLessPercentage(value)
    }

    const handlePercentageAmount = (percentage = lessPercentage) => {
        const totalCost = parseFloat(calculateTotalCost());
        const percent = totalCost * (percentage / 100);
        return percent;
    };

    const handleGrandTotal = () => {
        const totalCost = parseFloat(calculateTotalCost());
        const shipping = parseFloat(handlePercentageAmount()) || 0;
        return (totalCost - shipping)
    }

    const handleRemove = (index) => {
        setTableData((prevTableData) => {
            const newTableData = [...prevTableData];
            newTableData.splice(index, 1); // Remove one item at the specified index
            return newTableData;
        });
    };

    const handleSubmit = async e => {
        e.preventDefault()
        const res = await axios.post("/api/prodapi", {
            bid: Math.floor(Math.random() * 900000),
            products: tableData,
            total: calculateTotalCost() || 0,
            percentage: lessPercentage || 0,
            percentageAmount: handlePercentageAmount() || 0,
            grandTotal: handleGrandTotal() || 0,
            createdat: todayDate(),
            createdby: !name || name === "" ? toast.warn("Enter Name") : name
        })
        if (res.message) toast.success(res.message)
        else toast.error(res.error)
    }

    const handleResetButton = e => {
        e.preventDefault()
        setOpenResetModal(true)
    }

    const handleReset = e => {
        e.preventDefault()
        setTableData([])
        setName("")
        productRef.current.clearSearchTerm();
        setOpenResetModal(false)
    }

    return (
        <>
            <h1 className="text-center w-full font-semibold text-3xl dark:bg-gray-900 bg-custom-white sticky top-0 z-20 text-custom-blue-light pb-3">Create Medicine List</h1>
            <div className="container py-5 px-6 divide-y divide-gray-600">
                <ToastContainer autoClose={2000} position="top-center" draggable />
                {openResetModal && (
                    <CustomModal
                        mainModal={true}
                        openModal={true}
                        closeModal={handleCloseModal}
                        openChildModal={handleReset}
                        icon={<FaArrowRotateLeft size={30} />}
                        iconClassName={"text-red-600"}
                        modalText={"Do you want to Reset The From ?"}
                    />)}
                <form className={'w-full flex flex-col gap-8'} onSubmit={handleSubmit}>
                    <div className={'flex flex-col lg:flex-row w-full gap-6 items-center py-2'}>
                        <div className={'flex flex-col w-full gap-2'}>
                            <label className="block dark:text-gray-200 text-gray-700 text-sm font-medium mb-1">
                                Date
                            </label>
                            <input id="customerName"
                                type="text"
                                disabled
                                value={todayDate()}
                                className="shadow-md w-full p-4 dark:bg-gray-800 bg-custom-white dark:text-white text-black rounded-md focus:outline-none focus:ring-2 dark:focus:ring-custom-blue-dark focus:ring-custom-blue-light cursor-not-allowed"
                            />
                        </div>
                        <div className={'flex flex-col w-full gap-2'}>
                            <label className="block dark:text-gray-200 text-gray-700 text-sm font-medium mb-1">
                                Enter Your Name *
                            </label>
                            <input id="customerName"
                                type="text"
                                onChange={handleNameChange}
                                value={name}
                                placeholder="Name"
                                className="shadow-md w-full p-4 dark:bg-gray-800 bg-custom-white dark:text-white text-black rounded-md focus:outline-none focus:ring-2 dark:focus:ring-custom-blue-dark focus:ring-custom-blue-light"
                            />
                        </div>
                    </div>
                    <div className={'flex flex-col lg:flex-row w-full gap-6 lg:items-end'}>
                        <div className={'flex flex-col w-full gap-2'}>
                            <label className="block dark:text-gray-200 text-gray-700 text-sm font-medium mb-1">
                                Choose Product
                            </label>
                            <SearchSelect
                                onSelect={(selectedOption) => setSelectedProduct(selectedOption)}
                                ref={productRef}
                                sale={false}
                            />
                        </div>
                        <button onClick={addItemToTable} className={'w-full md:w-48 py-4 px-5 dark:bg-gray-800 bg-custom-white rounded-md font-semibold shadow-md dark:hover-fill-bottom-to-top hover-fill-bottom-to-top'}>
                            Add Item
                        </button>
                    </div>
                    {tableData.length !== 0 && (
                        <div className={"dark:bg-gray-800 bg-custom-white text-white py-8 px-4 rounded-lg shadow-md gap-6 flex flex-col w-full relative max-h-[70vh]"}>
                            <p className="text-2xl font-semibold px-8 pb-4">Medicine Items</p>
                            <div className="overflow-x-hidden overflow-y-auto">
                                <table className="w-full divide-y divide-gray-700">
                                    <thead>
                                        <tr>
                                            <th className="text-left font-light dark:text-gray-200 text-gray-700 px-2">
                                                <div className={'flex items-center gap-3'}>
                                                    <p className="text-sm truncate">S No.#</p>
                                                    <LuArrowUpDown className="text-gray-400" />
                                                </div>
                                            </th>
                                            <th className="text-left font-light dark:text-gray-200 text-gray-700 px-2">
                                                <div className={'flex items-center gap-3'}>
                                                    <p className="text-sm truncate">Product Name</p>
                                                    <LuArrowUpDown className="text-gray-400" />
                                                </div>
                                            </th>
                                            <th className="text-left font-light dark:text-gray-200 text-gray-700 px-2">
                                                <div className={'flex items-center gap-3'}>
                                                    <p className="text-sm truncate">Milligram</p>
                                                    <LuArrowUpDown className="text-gray-400" />
                                                </div>
                                            </th>
                                            <th className="text-left font-light dark:text-gray-200 text-gray-700 px-2">
                                                <div className={'flex items-center gap-3'}>
                                                    <p className="text-sm truncate">Box Price</p>
                                                    <LuArrowUpDown className="text-gray-400" />
                                                </div>
                                            </th>
                                            <th className="text-left font-light dark:text-gray-200 text-gray-700 px-2">
                                                <div className={'flex items-center gap-3'}>
                                                    <p className="text-sm truncate">Total Unit Quantity</p>
                                                    <LuArrowUpDown className="text-gray-400" />
                                                </div>
                                            </th>
                                            <th className="text-left font-light dark:text-gray-200 text-gray-700 px-2">
                                                <div className={'flex items-center gap-3'}>
                                                    <p className="text-sm truncate">Expire Date</p>
                                                    <LuArrowUpDown className="text-gray-400" />
                                                </div>
                                            </th>
                                            <th className="text-left font-light dark:text-gray-200 text-gray-700 px-2">
                                                <div className={'flex items-center gap-3'}>
                                                    <p className="text-sm truncate">Unit Price</p>
                                                    <LuArrowUpDown className="text-gray-400" />
                                                </div>
                                            </th>
                                            <th className="text-left font-light dark:text-gray-200 text-gray-700 px-2">
                                                <div className={'flex items-center gap-3'}>
                                                    <p className="text-sm truncate">Quantity</p>
                                                    <LuArrowUpDown className="text-gray-400" />
                                                </div>
                                            </th>
                                            <th className="text-left font-light dark:text-gray-200 text-gray-700 px-2">
                                                <div className={'flex items-center gap-3'}>
                                                    <p className="text-sm truncate">Sub-Total</p>
                                                    <LuArrowUpDown className="text-gray-400" />
                                                </div>
                                            </th>
                                            <th className="text-left font-light dark:text-gray-200 text-gray-700 px-2">
                                                <div className={'flex items-center gap-3'}>
                                                    <p className="text-sm truncate">Action</p>
                                                    <LuArrowUpDown className="text-gray-400" />
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-700">
                                        {tableData && tableData.map((product, index) => (
                                            <tr key={index}>
                                                <td className="px-2 py-4 whitespace-nowrap text-blue-500">{index + 1}</td>
                                                <td className="px-2 whitespace-nowrap dark:text-gray-400 text-gray-500 text-sm">{product.productName}</td>
                                                <td className="px-1 whitespace-nowrap dark:text-gray-400 text-gray-500 text-sm">
                                                    <input
                                                        type="text"
                                                        onChange={(e) => handleMilligramChange(e, index)}
                                                        value={product.productMilligram || ''}
                                                        className="py-2 px-1 border border-gray-400 dark:bg-gray-800 bg-custom-white dark:text-white text-black rounded focus:outline-none focus:ring-2 dark:focus:ring-custom-blue-dark focus:ring-custom-blue-light"
                                                        placeholder="Enter Product Mg"
                                                    />
                                                </td>
                                                <td className="px-1 whitespace-nowrap dark:text-gray-400 text-gray-500 text-sm">
                                                    <input
                                                        type="text"
                                                        onChange={(e) => handleBoxPrice(e, index)}
                                                        value={product.productBoxPrice || ''}
                                                        className="py-2 px-1 border border-gray-400 dark:bg-gray-800 bg-custom-white dark:text-white text-black rounded focus:outline-none focus:ring-2 dark:focus:ring-custom-blue-dark focus:ring-custom-blue-light"
                                                        placeholder="Enter Box Retail"
                                                    />
                                                </td>
                                                <td className="px-1 whitespace-nowrap dark:text-gray-400 text-gray-500 text-sm">
                                                    <input
                                                        type="text"
                                                        onChange={(e) => handleQuantitiesChange(e, index)}
                                                        value={product.totalQuantities || ''}
                                                        className="py-2 px-1 border border-gray-400 dark:bg-gray-800 bg-custom-white dark:text-white text-black rounded focus:outline-none focus:ring-2 dark:focus:ring-custom-blue-dark focus:ring-custom-blue-light"
                                                        placeholder="Enter Total Quantity"
                                                    />
                                                </td>
                                                <td className="px-1 whitespace-nowrap dark:text-gray-400 text-gray-500 text-sm">
                                                    <input
                                                        type="text"
                                                        maxLength={10}
                                                        onChange={(e) => handleExpireDate(e, index)}
                                                        value={product.expireDate || ''}
                                                        className="py-2 px-1 border border-gray-400 dark:bg-gray-800 bg-custom-white dark:text-white text-black rounded focus:outline-none focus:ring-2 dark:focus:ring-custom-blue-dark focus:ring-custom-blue-light"
                                                        placeholder="DD/MM/YYYY"
                                                    />
                                                </td>
                                                <td className="px-2 whitespace-nowrap dark:text-gray-400 text-gray-500 text-sm">{product.productUnitPrice?.toFixed(2) || '0.00'}</td>
                                                <td className="px-2 whitespace-nowrap dark:text-gray-400 text-gray-500 text-sm">
                                                    <IncrementQuantity quantity={product.quantity} onChange={(quantity) => handleQuantityChange(quantity, index)} />
                                                </td>
                                                <td className="px-2 whitespace-nowrap dark:text-gray-400 text-gray-500 text-sm">
                                                    {isNaN(product.subTotal) ? '0.00' : product.subTotal.toFixed(2)}
                                                </td>
                                                <td className="px-6 whitespace-nowrap dark:text-gray-400 text-gray-500 text-sm">
                                                    <ActionIcons remove={() => handleRemove(index, product)} disableEdit />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>)}
                    <div className={'flex flex-col lg:flex-row justify-between'}>
                        <div className="flex md:w-8/12 flex-col gap-y-4 justify-center px-2">
                            <button type="submit"
                                className="w-full md:py-8 py-4 px-5 dark:hover:text-white hover:text-white dark:text-gray-300 text-black dark:bg-transparent border border-custom-blue-light z-0 bg-custom-white rounded-md font-semibold shadow-md dark:hover-fill-bottom-to-top hover-fill-bottom-to-top">
                                <span className={'relative z-20'}>Create List</span>
                            </button>
                            <button onClick={handleResetButton}
                                className="w-full md:py-8 py-4 z-0 px-5 bg-transparent border border-red-600 rounded-md font-semibold shadow-md hover:bg-red-600 transition-all duration-200 hover:text-black">
                                <span className={'z-10'}>Reset Form</span>
                            </button>
                        </div>
                        <div className={'dark:bg-gray-800 bg-custom-white text-white py-3 px-5 rounded-lg shadow-md gap-6 flex flex-col w-full lg:w-2/5 relative '}>
                            <div className={'flex flex-row w-full gap-2'}>
                                <label className="block dark:text-gray-200 text-gray-700 text-sm font-medium mb-1 w-2/3">
                                    Total Item's Quantity
                                </label>
                                <input
                                    disabled
                                    type="text"
                                    value={!calculateTotalQuantity() ? "0" : calculateTotalQuantity()}
                                    className="text-right w-1/3 p-2 dark:bg-gray-800 bg-custom-white dark:text-gray-300 text-black rounded-md focus:outline-none focus:ring-2 dark:focus:ring-custom-blue-dark focus:ring-custom-blue-light"
                                    placeholder="Quantity"
                                />
                            </div>
                            <div className={'flex flex-row w-full gap-2'}>
                                <label className="block text-2xl dark:text-custom-blue-dark text-custom-blue-light font-semibold mb-1 w-2/3">
                                    Total
                                </label>
                                <input
                                    disabled
                                    type="text"
                                    value={!handleTotal() ? "" : handleTotal()}
                                    className="text-right w-1/3 p-2 text-lg font-semibold dark:bg-gray-800 bg-custom-white dark:text-gray-100 text-black rounded-md focus:outline-none focus:ring-2 dark:focus:ring-custom-blue-dark focus:ring-custom-blue-light"
                                    placeholder="PKR"
                                />
                            </div>
                            <div className={'flex flex-row w-full gap-2'}>
                                <label className="block dark:text-gray-200 text-gray-700 text-sm font-medium mb-1 w-2/3">
                                    Percentage
                                </label>
                                <input
                                    type="text"
                                    onChange={handlePercentage}
                                    value={lessPercentage}
                                    className=" border w-1/3 p-2 dark:bg-gray-800 bg-custom-white dark:text-gray-300 text-black rounded-md focus:outline-none focus:ring-2 dark:focus:ring-custom-blue-dark focus:ring-custom-blue-light"
                                />
                                <FaPercent className="absolute right-10 mt-3 z-10" />
                            </div>
                            <div className={'flex flex-row w-full gap-2'}>
                                <label className="block dark:text-gray-200 text-gray-700 text-sm font-medium mb-1 w-2/3">
                                    Percentage Amount
                                </label>
                                <input disabled={true}
                                    type="text"
                                    value={!handlePercentageAmount() ? "-0.00" : "-" + handlePercentageAmount()}
                                    className="text-right w-1/3 p-2 dark:bg-gray-800 bg-custom-white dark:text-gray-300 text-black rounded-md focus:outline-none focus:ring-2 dark:focus:ring-custom-blue-dark focus:ring-custom-blue-light"
                                />
                            </div>
                            <div className={'flex flex-row w-full gap-2'}>
                                <label className="block dark:text-custom-blue-dark text-custom-blue-light xs:text-2xl text-xl mb-1 font-bold w-2/3">
                                    Grand Total
                                </label>
                                <input
                                    disabled
                                    type="text"
                                    value={!handleGrandTotal() ? "0.00 PKR" : handleGrandTotal().toFixed(2) + " " + "PKR"}
                                    className="font-bold xs:text-2xl text-xl text-right w-full p-4 dark:bg-gray-800 bg-custom-white dark:text-white text-black rounded-md focus:outline-none focus:ring-2 dark:focus:ring-custom-blue-dark focus:ring-custom-blue-light"
                                    placeholder="PKR"
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}