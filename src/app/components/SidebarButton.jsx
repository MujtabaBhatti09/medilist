
import PropTypes from 'prop-types';

const SidebarButton = ({ icon: Icon, text, isActive, classname }) => {
    return (
        <button className={`flex flex-col items-center justify-center w-24 h-24 sm:w-32 sm:h-32 rounded-lg mb-2 ${isActive ? 'dark:bg-custom-blue-dark bg-custom-blue-light text-white' : 'dark:bg-gray-700 bg-custom-white-lighter dark:text-gray-400 text-gray-700 hover:text-white dark:hover-fill-bottom-to-top hover-fill-bottom-to-top'} ${classname}`}>
            <Icon className="w-6 h-6 sm:w-12 sm:h-12 mb-1 z-10" />
            <span className="text-xs z-10">{text}</span>
        </button>
    );
};

SidebarButton.propTypes = {
    icon: PropTypes.elementType.isRequired,
    text: PropTypes.string.isRequired,
    isActive: PropTypes.bool,
};

export default SidebarButton;
