import { Triangle } from "react-loader-spinner"

export default function Loader(){
    return (
        <div className="h-screen w-full flex items-center justify-center">
            <Triangle
                visible={true}
                height="80"
                width="80"
                color="#2B3990"
                ariaLabel="triangle-loading"
            />
            <p className="absolute z-10 animate-pulse">Loading</p>
            <Triangle
                visible={true}
                height="80"
                width="80"
                color="#2B3990"
                wrapperClass="rotate-180"
                ariaLabel="triangle-loading"
            />
            <Triangle
                visible={true}
                height="80"
                width="80"
                color="#2B3990"
                ariaLabel="triangle-loading"
            />
        </div>
    )
}