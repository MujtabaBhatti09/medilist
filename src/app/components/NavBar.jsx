import Image from "next/image";
import Tilt from "react-parallax-tilt"
import { FaBell, FaTimes, FaUser } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import LogoDark from "@/public/T-Metrics Dark.svg";
import LogoLight from "@/public/T-Metrics.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Avatar } from "@mui/material";
import { BiLogOut } from "react-icons/bi";
import indusLogo from "@/public/Indus Logo.svg"

const NavBar = ({ toggleSidebar, isSidebarOpen, isModalClicked, modal, signOut }) => {

    const pathname = usePathname();
    const { data: session, status } = useSession()
    const userName = session?.user?.name || "Client Panel"

    return (
        <div className="fixed flex flex-row items-center justify-between dark:bg-gray-800 bg-custom-white px-2 sm:px-8 py-2 shadow-md w-full h-20 z-50">
            <div className="flex items-center sm:gap-8 gap-3">
                <Link href={"/dashboard"}>
                    <Image src={LogoDark} className="w-16 dark:block hidden" alt="LOGO" />
                    <Image src={LogoLight} className="w-16 dark:hidden block" alt="LOGO" />
                </Link>
                <button onClick={toggleSidebar} className="outline-none">
                    {isSidebarOpen ? (
                        <FaTimes className="text-gray-400 hover:dark:text-white hover:text-black active:dark:text-custom-blue-dark active:text-custom-blue-light" size={30} />
                    ) : (
                        <GiHamburgerMenu className="dark:text-gray-300 text-gray-600 hover:dark:text-white hover:text-black active:dark:text-custom-blue-dark active:text-custom-blue-light" size={30} />
                    )}
                </button>
            </div>
            <div className="flex items-center sm:gap-8 gap-3">
                <div className="flex xs:flex-row flex-row-reverse items-center sm:gap-8 gap-5">
                    <Link href={"/sales/create-sale"}>
                        <button>
                            <Tilt className={`dark:bg-gray-700 bg-custom-white-lighter dark:text-gray-400 text-gray-700 hover:text-white hover:dark:bg-custom-blue-dark hover:bg-custom-blue-light cursor-pointer xs:px-6 xs:py-2 px-4 py-1 transition-ease duration-150 border-2 border-blue-400 shadow-cxl-dark rounded font-semibold ${pathname === "/sales/create-sale" ? "dark:bg-custom-blue-light bg-black dark:text-white" : ""}`}>
                                POS
                            </Tilt>
                        </button>

                    </Link>
                    <button className="relative ">
                        <FaBell className="h-14 dark:text-gray-400 text-gray-800 dark:hover:text-custom-blue-dark hover:text-custom-blue-light " />
                        <span className="absolute top-5 right-0 block h-2.5 w-2.5 bg-green-400 rounded-full"></span>
                    </button>
                </div>
                <div className="flex items-center">
                    <div className="text-sm flex flex-row items-center text-right gap-3 ">
                        <div className="flex-col hidden xs:flex">
                            <p className="dark:text-gray-400 text-gray-700 font-semibold">Hello Admin</p>
                            <p className="dark:text-gray-400 text-gray-700">{userName}</p>
                        </div>
                        <div onClick={isModalClicked} className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer">
                            <Avatar className={`bg-custom-blue-light text-gray-300 w-12 h-12 rounded-full text-2xl font-semibold`}></Avatar>
                        </div>
                        {modal && (
                            <ul className="bg-custom-white dark:bg-gray-800 absolute top-20 w-64 right-10 h-36 rounded-b-lg justify-around flex-col flex px-6 shadow-md">
                                <Link href={"/client-profile"}><li><button className={'w-full flex gap-5 items-center p-2  transition-ease duration-200 cursor-pointer dark:text-gray-400 text-black hover:bg-custom-blue-light hover:text-white hover:dark:bg-custom-blue-dark rounded-lg'}><FaUser /> Profile Status</button></li></Link>
                                <li><button className={'w-full flex gap-5 items-center p-2  transition-ease duration-200 cursor-pointer dark:text-gray-400 text-black hover:bg-custom-blue-light hover:text-white hover:dark:bg-custom-blue-dark rounded-lg'} onClick={signOut}><BiLogOut /> Log out</button></li>
                                <Link href={"https://industechnetronic.com"} target={`_blank`}><li className="p-2 text-start text-xs flex justify-center items-center gap-4 transition-ease duration-200 cursor-pointer"><Image className="object-contain w-6" src={indusLogo} />Powered By Industechnetronic</li></Link>
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
