"use client"
import { formatDateToDisplay } from '@/app/utils/config/dateFormatter';
import { numberFormat } from '@/app/utils/config/globalFunctions';
import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import 'jspdf-autotable';

const PdfGenerator = ({ data, fileName, reportName, medi }) => {

  const generatePdf = async () => {

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = doc.getTextWidth(reportName);
    const xOffset = (pageWidth - textWidth) / 2;
    // const canvas = await html2canvas(htmlContent);
    // const imgData = canvas.toDataURL('image/png');
    // doc.addImage(imgData, "PNG", 10, 10)

    // Set background color for the header
    doc.setFillColor('#2B3990');
    doc.rect(5, 1, pageWidth - 10, 30, 'F'); // Rectangle spanning the page width

    // Add text in the header
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.text(reportName, xOffset, 12);

    // Footer with page number
    const addFooterPage = (doc, pageNumber, totalPages) => {
      const pageHeight = doc.internal.pageSize.getHeight();
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);

      // Footer text
      doc.text(
        `Page ${pageNumber} of ${totalPages}`,
        pageWidth / 2,
        pageHeight - 10,
        { align: 'center' }
      );
    };

    // Footer with company info
    const addFooterPageCompany = (doc) => {
      const pageHeight = doc.internal.pageSize.getHeight();
      const pageWidth = doc.internal.pageSize.getWidth();
      doc.setFontSize(10);
      doc.setTextColor('#2B3990');

      const companyName = `Powered By Indus-Technetronic`;
      const phoneNumber = `Phone: +92 336-387-832-9`;

      const margin = 10;
      const companyNameX = margin;
      const phoneNumberX = pageWidth - margin - doc.getTextWidth(phoneNumber); // right-aligned

      // Footer text with company information
      doc.text(companyName, companyNameX, pageHeight - 5);

      // Add phone number text without showing the WhatsApp link
      doc.text(phoneNumber, phoneNumberX, pageHeight - 5);

      // Add an invisible link area over the phone number to open WhatsApp
      doc.link(phoneNumberX, pageHeight - 10, doc.getTextWidth(phoneNumber), 10, {
        url: `https://wa.me/923363878329`,
      });
    };

    if (fileName.split("-")[0] === "medicine") {
      const headers = [['S No.', 'Quantity', 'Product', 'Mg', 'Retail', 'Unit Price', 'Expiry', 'Sub', 'Total', 'Percent', 'Percent Amount', 'Grand Total']];

      // Prepare table rows from data
      const rows = data.map((item, index) => [
        index + 1 + ".",
        item.quantity,
        item.product,
        item.milligram + "mg",
        item.boxprice,
        Math.round(item.unitprice),
        formatDateToDisplay(item.expire),
        Math.round(item.subtotal),
        Math.round(item.total),
        "-" + item.percentageless + "%",
        Math.round(item.percentage_amount),
        "Rs " + item.grandtotal + " /-",
      ]);
      const addFooterPageCompany2 = (doc) => {
        const pageHeight = doc.internal.pageSize.getHeight();
        const pageWidth = doc.internal.pageSize.getWidth();
        doc.setFontSize(10);
        doc.setTextColor('#2B3990');

        const companyName = `Software Designed By Mujtaba`;
        const phoneNumber = `Phone: +92 313-358-962-3`;

        const margin = 10;
        const companyNameX = margin;
        const phoneNumberX = pageWidth - margin - doc.getTextWidth(phoneNumber); // right-aligned

        // Footer text with company information
        doc.text(companyName, companyNameX, pageHeight - 5);

        // Add phone number text without showing the WhatsApp link
        doc.text(phoneNumber, phoneNumberX, pageHeight - 5);

        // Add an invisible link area over the phone number to open WhatsApp
        doc.link(phoneNumberX, pageHeight - 10, doc.getTextWidth(phoneNumber), 10, {
          url: `https://wa.me/+92 3133589623`,
        });
      };
      // Add table to PDF
      doc.autoTable({
        head: headers,
        body: rows,
        margin: { top: 40, left: 5, right: 5 }, // Adjust left and right margins
        // startY: 40, // Start below the header
        didDrawPage: (data) => {
          const pageCount = doc.internal.getNumberOfPages();
          const currentPage = doc.internal.getCurrentPageInfo().pageNumber;
          addFooterPage(doc, currentPage, pageCount);
          addFooterPageCompany2(doc);
        }
      });
      doc.save(`${fileName}.pdf`);
    }

  };
  return (
    <button onClick={generatePdf}
      className={`p-4  font-semibold rounded border dark:border-red-500 border-red-800 dark:text-red-500 text-red-800 ${medi ? medi : "sm:w-fit w-full sm:text-start text-center"}`}>
      PDF
    </button>
  );
};

export default PdfGenerator;
