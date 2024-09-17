import { FaTimes, FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";

export default function CustomModal({
    className,
    closeModal,
    openChildModal,
    modalText,
    icon,
    iconClassName,
    label,
    inputValue,
    onChangeInput,
    placeholder,
    handleSubmit,
    openModal,
    isChildModal,
    mainModal,
    error,
}) {

    const modalVariants = {
        hidden: { opacity: 0.2 },
        visible: { opacity: 1 }
    };

    return (
        <>
            {mainModal && (
                <div className={`loader fixed flex justify-center items-center w-full left-0 top-0 bottom-0 right-0 z-50 bg-gray-900 bg-opacity-60 flex-col overflow-hidden ${className}`}>
                    {openModal && (
                        <motion.div
                            className="modal h-56 w-5/6 sm:w-9/12 xl:w-6/12 rounded-lg dark:shadow-cxl-dark shadow-cxl-light px-4 py-5 bg-custom-bg-light dark:bg-custom-bg-dark"
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={modalVariants}
                        >
                            <div className="modal-body flex flex-col gap-8 rounded-xl justify-center h-full items-center py-1">
                                <div className={`icon ${iconClassName}`}>
                                    {icon}
                                </div>
                                <div className="info font-bold text-2xl dark:text-custom-blue-dark text-custom-blue-light text-center">
                                    {modalText}
                                </div>
                                <div className="btns flex gap-5 w-full items-center justify-around xs:justify-center">
                                    <button onClick={closeModal} className="w-24 justify-center text-center rounded-lg px-6 py-2 hover:animate-pulse bg-red-700 hover:shadow-crosss transition-all duration-200 flex gap-2 items-center text-white">No <FaTimes /></button>
                                    <button onClick={openChildModal} className="w-24 justify-center text-center rounded-lg px-6 py-2 hover:animate-pulse bg-custom-blue-light dark:bg-custom-blue-dark hover:shadow-cxl transition-all duration-200 flex gap-2 items-center text-white">Yes <FaCheck /></button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {isChildModal && (
                        <motion.div
                            className="modal h-56 w-5/6 sm:w-9/12 xl:w-6/12 rounded-lg dark:shadow-cxl-dark shadow-cxl-light  px-1 sm:px-4 py-5 bg-custom-bg-light dark:bg-custom-bg-dark"
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={modalVariants}
                        >
                            <div className="modal-body flex flex-col gap-8 rounded-xl justify-between h-full items-center py-1 w-full">
                                <div className="info flex flex-col h-full w-full justify-center px-3 sm:px-10 gap-1">
                                    <label>
                                        {label}
                                    </label>
                                    <input type="text"
                                        placeholder={placeholder}
                                        className="shadow-md w-full p-3 dark:bg-gray-800 bg-custom-white dark:text-white text-black rounded-md focus:outline-none focus:ring-2 dark:focus:ring-custom-blue-dark focus:ring-custom-blue-light"
                                        value={inputValue}
                                        onChange={onChangeInput} />
                                    {error && (<p className="text-red-500">Field Cannot Be Empty</p>)}
                                </div>
                                <div className="btns flex gap-5 w-full items-center justify-around xs:justify-center">
                                    <button onClick={closeModal} className=" w-24 justify-center text-center rounded-lg px-6 py-2 hover:animate-pulse bg-red-700 hover:shadow-crosss transition-all duration-200 flex gap-2 items-center text-white">Close</button>
                                    <button onClick={handleSubmit} className=" w-24 justify-center text-center rounded-lg px-6 py-2 hover:animate-pulse bg-custom-blue-light dark:bg-custom-blue-dark hover:shadow-cxl transition-all duration-200 flex gap-2 items-center text-white">Add</button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                    {/* Here */}
                </div >
            )
            }
        </>
    )
}


// // How To Use Modal

// // This will be defined in the page, where you want to use this Component.

// // const [isChildModal, setChildModal] = useState(false)
// // const [openModalScreen, setOpenModalScreen] = useState(false)
// // const [openModal, setOpenModal] = useState(false)
// // const [success, setSuccess] = useState(false)

// // const handleOpenModalScreen = () => {
// //     setOpenModalScreen(true)
// //     setOpenModal(true)
// // }
// // const handleCloseModal = () => {
// //     setOpenModalScreen(false)
// //     setChildModal(false)
// //     setSuccess(false)
// // }
// // const handleChildModal = () => {
// //     setChildModal(true)
// //     setOpenModal(false)
// // }
// // const handleSuccessModal = () => {
// //     setSuccess(true)
// //     setChildModal(false)
// // }

// // This is How You Write The Component

// {/* <CustomModal
//     closeModal={handleCloseModal}
//     openChildModal={handleChildModal}
//     handleSubmit={handleSuccessModal}
//     mainModal={openModalScreen}
//     openModal={openModal}
//     isChildModal={isChildModal}
//     isSuccess={success} /> */}

// // Listener For Opening The Modal
// // <button onClick={handleOpenModalScreen} className="bg-blue-700 hover:bg-blue-900 rounded-lg p-4 transition-all duration-200">Open Modal</button>
