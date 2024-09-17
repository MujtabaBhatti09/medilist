import { FaPlus, FaMinus } from "react-icons/fa"

export default function IncrementQuantity({ quantity, onChange, disable }) {

    const handleIncrement = (e) => {
        e.preventDefault()
        onChange(quantity + 1)
    }

    const handleDecrement = (e) => {
        e.preventDefault()
        if (quantity > 0) {
            onChange(quantity - 1)
        }
    }

    return (
        <div className="container bg-black flex justify-between w-28 p-1 rounded-full">
            <button onClick={handleDecrement} disabled={disable} className="bg-custom-blue-dark p-1 rounded-full">
                <FaMinus className="text-white" />
            </button>
            <p className="bg-dark px-2 text-white">{quantity}</p>
            <button onClick={handleIncrement} disabled={disable} className="bg-custom-blue-dark p-1 rounded-full">
                <FaPlus className="text-white" />
            </button>
        </div>
    )
}
