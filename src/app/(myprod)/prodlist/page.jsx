"use client"

import { LuArrowUpDown, LuSettings2 } from "react-icons/lu";
import Loader from "../../components/Loader/Loader";
import { useState, useEffect } from "react";
import LoadingLoader from "../../components/Loader/LoaderLoading";
import { formatDateToDisplay } from "../../config/dateFormatter";
import { arrayVerification } from "../../config/globalFunctions";
import PdfGenerator from "../../components/PdfGenerator/pdf";
import axios from "axios";

export default function MedicineList() {

    const [isLoading, setIsLoading] = useState(true);
    const [medicineList, setMedicineList] = useState([]);
    const [viewData, setViewData] = useState(null)
    const [modal, setModal] = useState(false)


    useEffect(() => {
        const fetchMedicineList = async () => {
            setIsLoading(false);
            try {
                const res = await axios.get("/api/prodapi/");
                if (res.data) {
                    setMedicineList(res.data.medicines);
                } else {
                    alert("Data not found");
                }
            } catch (error) {
                console.error("Error fetching medicine list", error);
            }
        };

        fetchMedicineList();
    }, []);


    if (isLoading) {
        return <Loader />;
    }

    const view = async value => {
        console.log(value);
        setViewData(value);
        setModal(true)
    }

    const handlecloseModal = _ => {
        setModal(false)
    }

    return (
        <>

            <section className="w-full flex flex-col gap-4">
                <div className="heading py-10">
                    <p className="text-center font-bold text-3xl dark:text-custom-blue-light">Medicine List</p>
                </div>
                <div className={'w-full flex xl:flex-row flex-col gap-4'}>
                    <div className={'w-full xl:w-fit px-2 flex flex-row gap-3'}>
                        <button
                            className="p-4 border dark:border-custom-blue-dark border-custom-blue-light text-custom-blue-light dark:text-custom-blue-dark flex items-center justify-center rounded gap-3">
                            Filter
                            <LuSettings2 />
                        </button>
                        <input type="text"
                            placeholder="Search Product"
                            className={'relative shadow-md w-full sm:w-80 p-4 dark:bg-gray-800 bg-custom-white dark:text-white text-black rounded-md focus:outline-none focus:ring-2 dark:focus:ring-custom-blue-dark focus:ring-custom-blue-light'} />
                    </div>
                    <div className={''}>
                        {arrayVerification(medicineList) && medicineList.length > 0 && (
                            <PdfGenerator data={medicineList} reportName={"Medicine-List"} fileName={`medicine-list`} medi={"md:w-[20rem] text-center hover:bg-red-600 transition-all duration-150 hover:text-black"}/>
                        )}
                    </div>
                </div>
                {arrayVerification(medicineList) &&
                    medicineList === 0 ?
                    <LoadingLoader />

                    :
                    <div className="dark:bg-gray-800 bg-custom-white text-white py-8 px-4 rounded-lg shadow-md gap-6 flex flex-col w-full relative">
                        <div className="overflow-x-auto">
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
                                                <p className="text-sm truncate">Quantity</p>
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
                                                <p className="text-sm truncate">Unit Price</p>
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
                                                <p className="text-sm truncate">Sub-Total</p>
                                                <LuArrowUpDown className="text-gray-400" />
                                            </div>
                                        </th>
                                        <th className="text-left font-light dark:text-gray-200 text-gray-700 px-2">
                                            <div className={'flex items-center gap-3'}>
                                                <p className="text-sm truncate">Total</p>
                                                <LuArrowUpDown className="text-gray-400" />
                                            </div>
                                        </th>
                                        <th className="text-left font-light dark:text-gray-200 text-gray-700 px-2">
                                            <div className={'flex items-center gap-3'}>
                                                <p className="text-sm truncate">Percentage</p>
                                                <LuArrowUpDown className="text-gray-400" />
                                            </div>
                                        </th>
                                        <th className="text-left font-light dark:text-gray-200 text-gray-700 px-2">
                                            <div className={'flex items-center gap-3'}>
                                                <p className="text-sm truncate">Percentage Amount</p>
                                                <LuArrowUpDown className="text-gray-400" />
                                            </div>
                                        </th>
                                        <th className="text-left font-light dark:text-gray-200 text-gray-700 px-2">
                                            <div className={'flex items-center gap-3'}>
                                                <p className="text-sm truncate">Grand-Total</p>
                                                <LuArrowUpDown className="text-gray-400" />
                                            </div>
                                        </th>
                                        <th className="text-left font-light dark:text-gray-200 text-gray-700 px-2">
                                            <div className={'flex items-center gap-3'}>
                                                <p className="text-sm truncate">Date</p>
                                                <LuArrowUpDown className="text-gray-400" />
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-700">
                                    {arrayVerification(medicineList) && medicineList.map((med, index) => (
                                        <tr key={index}>
                                            <td className="px-2 whitespace-nowrap dark:text-gray-400 text-gray-500 text-sm">
                                                {index++ && index <= 9 ? "0" + index : index}
                                            </td>
                                            <td className="px-2 py-4 whitespace-nowrap text-blue-500 cursor-pointer">
                                                {med.quantity}
                                            </td>
                                            <td className="px-2 whitespace-nowrap dark:text-gray-100 text-gray-600 font-semibold text-sm">{med.product}</td>
                                            <td className="px-2 whitespace-nowrap dark:text-gray-200 text-gray-500 text-sm">{med.milligram}</td>
                                            <td className="px-2 whitespace-nowrap dark:text-gray-200 text-gray-500 text-sm">{med.boxprice}</td>
                                            <td className="px-2 whitespace-nowrap dark:text-gray-200 text-gray-500 text-sm">{Math.round(med.unitprice)}</td>
                                            <td className="px-2 whitespace-nowrap dark:text-yellow-500 text-yellow-500 text-sm">{formatDateToDisplay(med.expire)}</td>
                                            <td className="px-2 whitespace-nowrap dark:text-gray-200 text-gray-500 text-sm">{med.subtotal}</td>
                                            <td className="px-2 whitespace-nowrap dark:text-gray-200 text-gray-500 text-sm">{med.total}</td>
                                            <td className="px-2 whitespace-nowrap dark:text-gray-200 text-gray-500 text-sm">{med.percentageless}</td>
                                            <td className="px-2 whitespace-nowrap dark:text-gray-200 text-gray-500 text-sm">{med.percentage_amount}</td>
                                            <td className="px-2 whitespace-nowrap dark:text-gray-200 text-gray-500 text-sm">{med.grandtotal}</td>
                                            <td className="px-2 whitespace-nowrap dark:text-gray-200 text-gray-500 text-sm">{formatDateToDisplay(med.createdat)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                }
            </section>
        </>
    )
}