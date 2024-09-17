import { Triangle } from "react-loader-spinner";

export default function LoadingLoader() {
    return (
        <div className="flex items-center justify-center flex-col py-5 w-full shadow-cxl animate-pulse">
            <Triangle
                visible={true}
                height="80"
                width="80"
                color="#2B3990"
                wrapperClass="rotate-180"
                ariaLabel="triangle-loading"
            />
            <p className="animate-pulse absolute">Loading</p>
        </div>
    )
}