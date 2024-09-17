import { formatDateToDisplay } from '@/app/utils/config/dateFormatter';
import { numberFormat } from '@/app/utils/config/globalFunctions';
import React from 'react';
import * as XLSX from 'xlsx';

const ExcelGenerator = ({ data, fileName, reportName }) => {
    const generateExcel = () => {
        // Create a new workbook and a new sheet
        const workbook = XLSX.utils.book_new();
        if (fileName.split("-")[1] === "product") {
            const worksheetData = [
                ['Part Number', 'Product Name', 'Category', 'Brand', 'Available Units'], // Headers
                ...data.map(item => [
                    item.partNumber,
                    item.productName,
                    item.productCategory,
                    item.productBrand,
                    item.availableUnits
                ])
            ];

            // Convert the data to a worksheet
            const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

            // Apply bold styling to the headers
            const headerRange = XLSX.utils.decode_range(worksheet['!ref']);
            for (let C = headerRange.s.c; C <= headerRange.e.c; ++C) {
                const cellAddress = XLSX.utils.encode_cell({ r: 0, c: C });
                if (!worksheet[cellAddress]) continue;
                worksheet[cellAddress].s = {
                    font: {
                        bold: true
                    }
                };
            }

            // Append the sheet to the workbook
            XLSX.utils.book_append_sheet(workbook, worksheet, reportName);

            // Generate and download the Excel file
            XLSX.writeFile(workbook, `${fileName}.xlsx`);
        } else if (fileName.split("-")[1] === "customer") {
            const worksheetData = [
                ['Customer Name', 'Contact #', 'Shop Name', 'Shop Address'], // Headers
                ...data.map(item => [
                    item.customerName,
                    item.customerContact,
                    item.shopName,
                    item.shopAddress,
                ])
            ];

            // Convert the data to a worksheet
            const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

            // Apply bold styling to the headers
            const headerRange = XLSX.utils.decode_range(worksheet['!ref']);
            for (let C = headerRange.s.c; C <= headerRange.e.c; ++C) {
                const cellAddress = XLSX.utils.encode_cell({ r: 0, c: C });
                if (!worksheet[cellAddress]) continue;
                worksheet[cellAddress].s = {
                    font: {
                        bold: true
                    }
                };
            }

            // Append the sheet to the workbook
            XLSX.utils.book_append_sheet(workbook, worksheet, reportName);

            // Generate and download the Excel file
            XLSX.writeFile(workbook, `${fileName}.xlsx`);
        } else if (fileName.split("-")[1] === "purchase") {

            const worksheetData = [
                ['Purchase Id', 'Supplier Name', 'Contact', 'Shipping Cost', 'Tax', 'Total', 'Date'], // Headers
                ...data.map(item => [
                    item.p_Id,
                    item.supplierName,
                    item.supplierContact,
                    numberFormat(item.shippingCost) + " /- " + "PKR",
                    numberFormat(item.tax) + " /- " + "PKR",
                    numberFormat(item.grandTotal) + " /- " + "PKR",
                    formatDateToDisplay(item.createdOn),
                ])
            ];

            // Convert the data to a worksheet
            const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

            // Apply bold styling to the headers
            const headerRange = XLSX.utils.decode_range(worksheet['!ref']);
            for (let C = headerRange.s.c; C <= headerRange.e.c; ++C) {
                const cellAddress = XLSX.utils.encode_cell({ r: 0, c: C });
                if (!worksheet[cellAddress]) continue;
                worksheet[cellAddress].s = {
                    font: {
                        bold: true
                    }
                };
            }

            // Append the sheet to the workbook
            XLSX.utils.book_append_sheet(workbook, worksheet, reportName);

            // Generate and download the Excel file
            XLSX.writeFile(workbook, `${fileName}.xlsx`);
        }
    };

    return (
        <button onClick={generateExcel}
            className=" p-4 sm:w-fit sm:text-start text-center font-semibold rounded border dark:border-green-500 border-green-800 dark:text-green-500 text-green-800">
            EXCEL
        </button>
    );
};

export default ExcelGenerator;
