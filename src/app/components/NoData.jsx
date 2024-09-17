import { FaTimes } from "react-icons/fa"
export default function NoDataCard({ text, boxClassName, textClassName, iconClassName }) {
    return (
        <div className={`w-11/12 animate-pulse transition-all duration-200 text-white rounded-lg flex items-center justify-center space-x-4 cursor-pointer ${boxClassName}`}>
            <div className="bg-gradient-to-bl blur from-red-600 via-red-900 to-red-500 opacity-30 h-40 w-11/12 absolute left-14">
            </div>
            <p className={`flex items-center justify-center text-red-500 ${textClassName}`}><FaTimes /> {text} <FaTimes /></p>
        </div>
    )
}