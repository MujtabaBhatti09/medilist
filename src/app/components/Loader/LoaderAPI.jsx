import { Triangle } from "react-loader-spinner";

export default function LoaderAPI({ text, textClassName, className }) {
    return (
        <div className={`loader fixed flex justify-center items-center w-full left-0 top-0 bottom-0 right-10 z-60 bg-gray-900 bg-opacity-60 flex-col overflow-hidden ${className}`}>
            <Triangle
                visible={true}
                height="80"
                width="80"
                color="#2B3990"
                ariaLabel="triangle-loading"
            />
            <p className={`absolute mt-5 animate-pulse ${textClassName}`}>{text}</p>
        </div>
    )
}