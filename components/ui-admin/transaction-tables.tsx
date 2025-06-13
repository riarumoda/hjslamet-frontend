import { formatRupiah } from '@/lib/currency';
import { Trx } from '@/types';
import React from 'react'

interface TransactionTablesProps {
  transaction: Trx[];
  openModal: (trx: Trx) => void;
//   onUpdateTransaction: (transactionId: string) => void;
}

const TransactionTables: React.FC<TransactionTablesProps> = ({ transaction, openModal }) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        }).format(date);
    };

    const getStatusLabel = (status: string): string => {
        switch (status) {
            case "SELESAI":
            return "Completed";
            case "DIKIRIM":
            return "Shipped";
            case "PROSES":
            return "Processing";
            case "DIBATALKAN":
            return "Cancelled";
            default:
            return status;
        }
    };

    
    const getStatusBadgeClass = (status: string) => {
        switch (status) {
        case "SELESAI":
            return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
        case "DIKIRIM":
            return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
        case "PROSES":
            return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
        default:
            return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
        }
    };
    return (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">Invoice</th>
                <th scope="col" className="px-6 py-3">Customer Name</th>
                <th scope="col" className="px-6 py-3">Date</th>
                <th scope="col" className="px-6 py-3">Total Amount</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3 flex justify-center">Action</th>
            </tr>
            </thead>
            <tbody>
            {transaction.map((transaction, index) => (
                <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {transaction.invoiceId}
                    </th>
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {transaction.member?.name}
                    </td>
                    <td className="px-6 py-4">
                    {formatDate(transaction.trxDate)}
                    </td>


                    <td className="px-6 py-4">{formatRupiah(transaction.totalAmount)}</td>
                    <td className="px-6 py-4">
                        <span
                            className={`px-2 py-1 text-sm font-medium rounded ${getStatusBadgeClass(transaction.status)}`}
                        >
                            {getStatusLabel(transaction.status)}
                        </span>
                    </td>


                    <td className="px-6 py-4 flex items-center justify-center">
                        <button onClick={() => openModal(transaction)} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Detail</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default TransactionTables;
