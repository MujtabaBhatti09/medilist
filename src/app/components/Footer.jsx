import React from 'react';

const Footer = () => {
    return (
        <footer className="rounded-lg dark:bg-gray-800 bg-custom-white shadow-md py-2 w-full  flex justify-center xs:justify-between items-center px-2 sm:px-8">
            <p className={'text-xs xs:text-sm font-medium text-gray-400'}>
                © Techno-Metric is proudly owned by <a href="https://industechnetronic.com" className="text-blue-500">Indus Technetronic</a>
            </p>
            <p className={'text-xs xs:text-sm font-medium text-gray-400'}>
                T-Metric Complete Inventory Solution
            </p>
        </footer>
    );
}

export default Footer;
