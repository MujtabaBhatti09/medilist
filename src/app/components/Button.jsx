import PropTypes from "prop-types";
export default function Button({ text }) {
    return (
        <button type="submit"
            className="md:w-48 w-full py-4 px-5 dark:hover:text-white hover:text-white dark:text-gray-300 text-black dark:bg-gray-800 z-0 bg-custom-white rounded-md font-semibold shadow-md dark:hover-fill-bottom-to-top hover-fill-bottom-to-top">
            <span className={'z-20 relative '}>{text}</span>
        </button>
    )
}

Button.prototype = {
    text: PropTypes.string.isRequired,
}