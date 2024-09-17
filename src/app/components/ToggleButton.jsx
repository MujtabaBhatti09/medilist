const ToggleButton = ({isToggled, handleToggle}) => {
    return (
        <button
            className={`w-14 h-8 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer relative ${isToggled ? 'bg-gradient-to-r from-rose-400 to-red-900' : 'bg-gradient-to-r from-emerald-500 to-emerald-900'}`}
            onClick={handleToggle}
        >
            <div
                className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out ${isToggled ? 'translate-x-6' : ''}`}
            />
            {isToggled ? (
                <svg className="group-hover:scale-75 duration-300 absolute top-1 left-7 stroke-gray-900 w-6 h-6"
                     height="100" preserveAspectRatio="xMidYMid meet" viewBox="0 0 100 100" width="100" xmlns="http://www.w3.org/2000/svg">
                    <path d="M30,46V38a20,20,0,0,1,40,0v8a8,8,0,0,1,8,8V74a8,8,0,0,1-8,8H30a8,8,0,0,1-8-8V54A8,8,0,0,1,30,46Zm32-8v8H38V38a12,12,0,0,1,24,0Z" fillRule="evenodd">
                    </path>
                </svg>
            ) : (
                <svg className="group-hover:scale-75 duration-300 absolute top-1 left-1 stroke-gray-900 w-6 h-6"
                height="100" preserveAspectRatio="xMidYMid meet" viewBox="0 0 100 100" width="100" xmlns="http://www.w3.org/2000/svg">
                <path className="svg-fill-primary" d="M50,18A19.9,19.9,0,0,0,30,38v8a8,8,0,0,0-8,8V74a8,8,0,0,0,8,8H70a8,8,0,0,0,8-8V54a8,8,0,0,0-8-8H38V38a12,12,0,0,1,23.6-3,4,4,0,1,0,7.8-2A20.1,20.1,0,0,0,50,18Z">
                </path>
                </svg>
            )}
        </button>
    );
};

export default ToggleButton;