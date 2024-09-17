"use client"
import { useState, useRef } from 'react';
import SidebarButton from "@/app/components/SidebarButton";
import { FaBox, FaReceipt, FaShoppingBag, FaPercent, FaShoppingCart, FaUserPlus } from 'react-icons/fa';
import { FaMoneyBillTrendUp, FaMoneyBillTransfer } from "react-icons/fa6";
import { TbReportMoney, TbBasketDown, TbReportSearch, TbCalendarPlus } from "react-icons/tb";
import { LuListChecks } from "react-icons/lu"
import { PiUserList } from "react-icons/pi"
import { CgFileDocument } from "react-icons/cg"
import { MdDashboard } from "react-icons/md";
import { IoMdPersonAdd } from "react-icons/io";
import { BiMoneyWithdraw } from "react-icons/bi"
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Sidebar = ({ isOpen }) => {

    const pathname = usePathname()

    const [hoveredItem, setHoveredItem] = useState(null);
    const dropdownRef = useRef(null);

    const handleMouseEnter = (item) => {
        setHoveredItem(item);
    };

    const handleMouseLeave = (e) => {
        // Ensure relatedTarget is a Node
        if (!dropdownRef.current || !(e.relatedTarget instanceof Node) || !dropdownRef.current.contains(e.relatedTarget)) {
            setHoveredItem(null);
        } else {
            setHoveredItem(e)
        }
    };

    const renderHoverContent = () => {
        switch (hoveredItem) {
            case 'Products':
                return (
                    <div
                        ref={dropdownRef}
                        className={`fixed left-32 sm:left-56 top-20 bottom-4 w-7/12 xs:w-64 dark:bg-gray-800 bg-custom-white text-white shadow-lg z-50 flex flex-col bg-opacity-90 h-full`}
                        onMouseEnter={() => handleMouseEnter("Products")} onMouseLeave={handleMouseLeave}
                    >
                        <Link href={"/products/create-product"}>
                            <button className={`dark:active:bg-custom-blue-dark active:bg-custom-blue-light dark:text-white text-black dark:hover:bg-custom-bg-dark hover:bg-custom-bg-light py-5 transition-ease duration-500 flex items-center px-4 gap-3 w-full ${pathname === "/products/create-product" ? "dark:bg-custom-blue-dark bg-custom-blue-light text-white hover:text-black dark:hover:text-white" : ""}`}> <TbCalendarPlus /> Create Product</button>
                        </Link>

                        <Link href={"/products/product-list"}>
                            <button className={`dark:active:bg-custom-blue-dark active:bg-custom-blue-light dark:text-white text-black dark:hover:bg-custom-bg-dark hover:bg-custom-bg-light py-5 transition-ease duration-500 flex items-center px-4 gap-3 w-full ${pathname === "/products/product-list" ? "dark:bg-custom-blue-dark bg-custom-blue-light text-white hover:text-black dark:hover:text-white" : ""}`}> <LuListChecks /> Product List</button>
                        </Link>
                    </div>
                );
            case 'Customers':
                return (
                    <div
                        ref={dropdownRef}
                        className={`fixed left-32 sm:left-56 top-20 bottom-4 w-7/12 xs:w-64 dark:bg-gray-800 bg-custom-white text-white shadow-lg z-50 flex flex-col bg-opacity-90 h-full`}
                        onMouseEnter={() => handleMouseEnter("Customers")} onMouseLeave={handleMouseLeave}
                    >
                        <Link href={"/customers/create-customer"}><button className={`dark:active:bg-custom-blue-dark active:bg-custom-blue-light dark:text-white text-black dark:hover:bg-custom-bg-dark hover:bg-custom-bg-light py-5 transition-ease duration-500 flex items-center px-4 gap-3 w-full ${pathname === "/customers/create-customer" ? "dark:bg-custom-blue-dark bg-custom-blue-light text-white hover:text-black dark:hover:text-white " : ""} `}> <FaUserPlus /> Create Customer</button></Link>
                        <Link href={"/customers/customer-list"}><button className={`dark:active:bg-custom-blue-dark active:bg-custom-blue-light dark:text-white text-black dark:hover:bg-custom-bg-dark hover:bg-custom-bg-light py-5 transition-ease duration-500 flex items-center px-4 gap-3 w-full ${pathname === "/customers/customer-list" ? "dark:bg-custom-blue-dark bg-custom-blue-light text-white hover:text-black dark:hover:text-white " : ""} `}> <PiUserList /> Customer List</button></Link>
                    </div>
                );
            case 'Expenses':
                return (
                    <div
                        ref={dropdownRef}
                        className={`fixed left-32 sm:left-56 top-20 bottom-4 w-7/12 xs:w-64 dark:bg-gray-800 bg-custom-white text-white shadow-lg z-50 flex flex-col bg-opacity-90 h-full`}
                        onMouseEnter={() => handleMouseEnter("Expenses")} onMouseLeave={handleMouseLeave}
                    >
                        <Link href={"/expense/create-expense"}><button className={`dark:active:bg-custom-blue-dark active:bg-custom-blue-light dark:text-white text-black dark:hover:bg-custom-bg-dark hover:bg-custom-bg-light py-5 transition-ease duration-500 flex items-center px-4 gap-3 w-full ${pathname === "/expense/create-expense" ? "dark:bg-custom-blue-dark bg-custom-blue-light text-white hover:text-black dark:hover:text-white" : ""} `}> <TbCalendarPlus /> Add Expense</button></Link>
                        <Link href={"/expense/expense-list"}><button className={`dark:active:bg-custom-blue-dark active:bg-custom-blue-light dark:text-white text-black dark:hover:bg-custom-bg-dark hover:bg-custom-bg-light py-5 transition-ease duration-500 flex items-center px-4 gap-3 w-full ${pathname === "/expense/expense-list" ? "dark:bg-custom-blue-dark bg-custom-blue-light text-white hover:text-black dark:hover:text-white" : ""} `}> <CgFileDocument /> Expense List</button></Link>
                    </div>
                );
            case 'Purchases':
                return (
                    <div
                        ref={dropdownRef}
                        className={`fixed left-32 sm:left-56 top-20 bottom-4 w-7/12 xs:w-64 dark:bg-gray-800 bg-custom-white text-white shadow-lg z-50 flex flex-col bg-opacity-90 h-full`}
                        onMouseEnter={() => handleMouseEnter("Purchases")} onMouseLeave={handleMouseLeave}>
                        <Link href={"/purchases/create-purchase"}><button className={`dark:active:bg-custom-blue-dark active:bg-custom-blue-light dark:text-white text-black dark:hover:bg-custom-bg-dark hover:bg-custom-bg-light py-5 transition-ease duration-500 flex items-center px-4 gap-3 w-full ${pathname === "/purchase/create-purchase" ? "dark:bg-custom-blue-dark bg-custom-blue-light text-white hover:text-black dark:hover:text-white " : ""} `}> <FaShoppingCart /> Create Purchase </button></Link>
                        <Link href={"/purchases/purchase-list"}><button className={`dark:active:bg-custom-blue-dark active:bg-custom-blue-light dark:text-white text-black dark:hover:bg-custom-bg-dark hover:bg-custom-bg-light py-5 transition-ease duration-500 flex items-center px-4 gap-3 w-full ${pathname === "/purchase/purchase-list" ? "dark:bg-custom-blue-dark bg-custom-blue-light text-white hover:text-black dark:hover:text-white " : ""} `}> <LuListChecks /> Purchase List </button></Link>
                    </div>
                );
            case 'Accounts':
                return (
                    <div
                        ref={dropdownRef}
                        className={`fixed left-32 sm:left-56 top-20 bottom-4 w-7/12 xs:w-64 dark:bg-gray-800 bg-custom-white text-white shadow-lg z-50 flex flex-col bg-opacity-90 h-full`}
                        onMouseEnter={() => handleMouseEnter("Accounts")} onMouseLeave={handleMouseLeave}
                    >
                        <Link href={"/accounts/ledger"}><button className={`dark:active:bg-custom-blue-dark active:bg-custom-blue-light dark:text-white text-black dark:hover:bg-custom-bg-dark hover:bg-custom-bg-light py-5 transition-ease duration-500 flex items-center px-4 gap-3 w-full ${pathname === "/accounts/ledger" ? "dark:bg-custom-blue-dark bg-custom-blue-light text-white hover:text-black dark:hover:text-white " : ""} `}><TbReportSearch />Ledger</button></Link>
                        <Link href={"/accounts/expense-report"}><button className={`dark:active:bg-custom-blue-dark active:bg-custom-blue-light dark:text-white text-black dark:hover:bg-custom-bg-dark hover:bg-custom-bg-light py-5 transition-ease duration-500 flex items-center px-4 gap-3 w-full ${pathname === "/accounts/expense-report" ? "dark:bg-custom-blue-dark bg-custom-blue-light text-white hover:text-black dark:hover:text-white " : ""} `}><TbReportMoney />Expense Report</button></Link>
                        <Link href={"/accounts/purchase-report"}><button className={`dark:active:bg-custom-blue-dark active:bg-custom-blue-light dark:text-white text-black dark:hover:bg-custom-bg-dark hover:bg-custom-bg-light py-5 transition-ease duration-500 flex items-center px-4 gap-3 w-full ${pathname === "/accounts/purchase-report" ? "dark:bg-custom-blue-dark bg-custom-blue-light text-white hover:text-black dark:hover:text-white " : ""} `}> <TbBasketDown />Purchase Report</button></Link>
                        <Link href={"/accounts/sales-report"}><button className={`dark:active:bg-custom-blue-dark active:bg-custom-blue-light dark:text-white text-black dark:hover:bg-custom-bg-dark hover:bg-custom-bg-light py-5 transition-ease duration-500 flex items-center px-4 gap-3 w-full ${pathname === "/accounts/sales-report" ? "dark:bg-custom-blue-dark bg-custom-blue-light text-white hover:text-black dark:hover:text-white " : ""} `}> <FaMoneyBillTrendUp />Sale Report</button></Link>
                        <Link href={"/accounts/credit-report"}><button className={`dark:active:bg-custom-blue-dark active:bg-custom-blue-light dark:text-white text-black dark:hover:bg-custom-bg-dark hover:bg-custom-bg-light py-5 transition-ease duration-500 flex items-center px-4 gap-3 w-full ${pathname === "/accounts/credit-report" ? "dark:bg-custom-blue-dark bg-custom-blue-light text-white hover:text-black dark:hover:text-white " : ""} `}> <BiMoneyWithdraw />Credit Report</button></Link>
                        <Link href={"/accounts/sales-return"}><button className={`dark:active:bg-custom-blue-dark active:bg-custom-blue-light dark:text-white text-black dark:hover:bg-custom-bg-dark hover:bg-custom-bg-light py-5 transition-ease duration-500 flex items-center px-4 gap-3 w-full ${pathname === "/accounts/credit-report" ? "dark:bg-custom-blue-dark bg-custom-blue-light text-white hover:text-black dark:hover:text-white " : ""} `}> <BiMoneyWithdraw />Sales Return</button></Link>
                    </div>
                );
            default:
                return null;
        }
    };
    return (
        <>
            <div className={`fixed left-0 top-20 dark:bg-gray-800 bg-custom-white text-white w-32 sm:w-56 flex flex-col gap-2 h-screen items-center z-50 ${isOpen ? 'translate-x-0 transition-all duration-[400ms]' : '-translate-x-full transition-all duration-500'}`} onMouseLeave={handleMouseLeave}>
                <div className=" sm:text-2xl font-bold mb-8 text-center dark:text-white text-black fixed top-0">Techno Metric</div>
                <nav className="flex-grow flex flex-col gap-6 relative mt-10 overflow-y-auto items-center w-full py-6">
                    <div onMouseEnter={() => handleMouseEnter('Dashboard')}>
                        <Link href={"/dashboard"}>
                            <SidebarButton icon={MdDashboard} text="Dashboard" isActive={pathname === "/dashboard"} />
                        </Link>
                    </div>
                    <div onMouseEnter={() => handleMouseEnter('Products')}>
                        <SidebarButton icon={FaBox} text="Products"
                            isActive={pathname === "/products/create-product" || pathname === "/products/product-list"} />
                    </div>
                    <div onMouseEnter={() => handleMouseEnter('Customers')}>
                        <SidebarButton icon={IoMdPersonAdd} text="Customers"
                            isActive={pathname === "/customers/create-customer" || pathname === "/customers/customer-list"} />
                    </div>
                    <div onMouseEnter={() => handleMouseEnter('Expenses')}>
                        <SidebarButton icon={FaReceipt} text="Expenses"
                            isActive={pathname === "/expense/create-expense" || pathname === "/expense/expense-list"} />
                    </div>
                    <div onMouseEnter={() => handleMouseEnter('Purchases')}>
                        {/* <Link href={"/purchases/create-purchase"}> */}
                            <SidebarButton icon={FaShoppingBag} text="Purchases"
                                isActive={pathname === "/purchases/create-purchase"} />
                        {/* </Link> */}
                    </div>
                    <div onMouseEnter={() => handleMouseEnter('Accounts')}>
                        <SidebarButton icon={FaMoneyBillTransfer} text="Accounts"
                            isActive={pathname === "/accounts/ledger" || pathname === "/accounts/expense-report" || pathname === "/accounts/purchase-report" || pathname === "/accounts/sales-report"}
                            classname={"mb-20"}
                        />
                    </div>
                </nav>
            </div>
            {hoveredItem && renderHoverContent()}
        </>
    );
};

export default Sidebar;
