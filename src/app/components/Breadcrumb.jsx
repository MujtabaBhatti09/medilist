// app/components/Breadcrumb.js
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Breadcrumb = ({ text, ref }) => {
    const pathname = usePathname();
    const pathParts = pathname.split('/').filter(part => part);

    const formatPart = (part) => {
        return part.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    };

    return (
        <div ref={ref} className="flex sm:flex-row flex-col sm:justify-between border-b border-1 border-gray-600 h-24 items-end py-4 px-3 sm:gap-0 gap-1">
            <div className="w-full sm:w-1/2">
                <p className="sm:text-2xl text-xl font-bold dark:text-custom-blue-dark text-black">{text}</p>
            </div>
            <div className="flex gap-1 sm:gap-3 flex-wrap relative w-full sm:w-1/2 sm:justify-end">
                <Link href={"/dashboard"}
                      className="cursor-pointer dark:text-custom-blue-dark text-custom-blue-light font-normal xs:font-semibold text-sm xs:text-lg">
                    Dashboard
                </Link>
                {pathParts.map((part, index) => {
                    const href = `/${pathParts.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathParts.length - 1;

                    return (
                        <div key={index} className="flex items-center gap-1 sm:gap-3 text-sm xs:text-lg">
                            /
                            {isLast ? (
                                <span className="text-gray-500">{formatPart(part)}</span>
                            ) : (
                                <a className="cursor-pointer dark:text-custom-blue-dark text-custom-blue-light font-normal xs:font-semibold text-sm xs:text-lg">
                                    {formatPart(part)}
                                </a>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Breadcrumb;
