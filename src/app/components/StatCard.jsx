import Image from 'next/image';
import PropTypes from 'prop-types';
import Tilt from "react-parallax-tilt";
import { TfiMoreAlt } from "react-icons/tfi";
import { FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

const StatCard = ({ icon: Icon, imageLogo, image, imageClass, imageClassContainer, label, value, toggleExpand, onClickExpand, info, searchChange, filters, xPositionView, xPositionInit }) => {

    return (
        <Tilt gyroscope tiltEnable={toggleExpand ? false : true} tiltMaxAngleX={2} tiltMaxAngleY={2} className={`dark:bg-gray-800 bg-custom-white transition-all duration-200 text-white rounded-lg ${toggleExpand ? "md:w-full h-80 shadow-card" : "md:w-c49 hover:shadow-card"} sm:w-c48 w-full min-h-24 overflow-hidden flex justify-between items-center`}>
            <div className="dark:bg-gradient-to-br blur dark:from-gray-400 dark:via-gray-100 dark:to-gray-500 opacity-10 h-full w-full absolute">
            </div>
            <motion.div
                initial={{ opacity: 0, x: xPositionInit }}
                whileInView={{ opacity: 1, x: xPositionView }}
                transition={{ duration: 0.6 }}
                className={`flex ${toggleExpand ? "items-start p-2" : "items-center"} space-x-4 h-full w-full px-2`}>
                <div className={`p-2 rounded-lg hover:shadow-card hover:scale-110 transition-all duration-200 relative ${imageClassContainer}`}>
                    {imageLogo ? <Image src={image} className={imageClass} /> : <Icon className="w-10 h-10 text-custom-blue dark:invert-0 invert opacity-80" />}
                </div>
                <div className='relative'>
                    <div className="text-sm dark:text-gray-400 text-gray-700">{label}</div>
                    <div className="text-2xl font-bold dark:text-white text-black">{value}</div>
                </div>
            </motion.div>
            {toggleExpand ? <FaTimes className={`hover:scale-110 text-red-500 transition-all duration-200 mx-6 relative rounded-md cursor-pointer ${toggleExpand ? "self-start m-5" : ""}`} onClick={onClickExpand} size={23} /> : <TfiMoreAlt onClick={onClickExpand} className={`hover:scale-110 transition-all duration-200 mx-6 relative rounded-md cursor-pointer ${toggleExpand ? "self-start m-5" : ""}`} size={25} />}
        </Tilt>
    );
};

StatCard.propTypes = {
    icon: PropTypes.elementType.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
};

export default StatCard;
