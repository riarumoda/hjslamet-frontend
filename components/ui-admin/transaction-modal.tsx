import { formatRupiah } from "@/lib/currency";
import { Trx } from "@/types";
import { useEffect, useState } from "react";

interface TransactionModalProps {
  trx: Trx;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (newStatus: string) => void;
}

const statusOptions = ["PROSES", "DIKIRIM", "SELESAI", "DIBATALKAN"];

const statusLabelMap: Record<string, string> = {
  PROSES: "Processing",
  DIKIRIM: "Shipped",
  SELESAI: "Completed",
  DIBATALKAN: "Cancelled",
};

export default function TransactionModal({
  trx,
  isOpen,
  onClose,
  onStatusChange,
}: TransactionModalProps) {
    const [editedStatus, setEditedStatus] = useState<Trx["status"] | null>(null);

    useEffect(() => {
        if (trx) setEditedStatus(trx.status);
    }, [trx]);

    if (!isOpen || !trx || !editedStatus) return null;

    return (
        <div id="printable-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6 overflow-y-auto print:static print:bg-white">
            <div className="bg-white dark:bg-gray-900 w-full max-w-xl rounded-xl shadow-2xl p-6 space-y-4 print:shadow-none print:max-w-full">
                {/* Header */}
                <div className="flex justify-between items-center border-b pb-3">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                        INVOICE <span className="text-sm text-gray-500 dark:text-gray-400">#{trx.invoiceId}</span>
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-white print:hidden"
                        aria-label="Close modal"
                    >
                        ✕
                    </button>
                </div>

                {/* Transaction Info */}
                <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <p><strong>Date:</strong> {new Date(trx.trxDate).toLocaleString()}</p>
                    <p className="flex items-center gap-2">
                        <strong>Status:</strong> <span>{statusLabelMap[trx.status]}</span>
                    </p>
                </div>

                {/* Customer Info */}
                <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1 border-t pt-3">
                    <p><strong>Customer:</strong> {trx.member?.name}</p>
                    <p><strong>Address:</strong> {trx.member?.address}</p>
                    <p><strong>Phone:</strong> {trx.member?.pnumber}</p>
                </div>

                {/* Items */}
                <div className="border-t pt-4">
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Purchased Items:</h3>
                    <div className="overflow-x-auto rounded-lg shadow-sm">
                        <table className="min-w-full text-sm text-left text-gray-700 dark:text-gray-300">
                        <thead className="bg-gray-100 dark:bg-gray-800 text-xs uppercase text-gray-600 dark:text-gray-400">
                            <tr>
                            <th className="px-4 py-2">#</th>
                            <th className="px-4 py-2">Product</th>
                            <th className="px-4 py-2">Qty</th>
                            <th className="px-4 py-2 text-right">Unit Price</th>
                            <th className="px-4 py-2 text-right">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {trx.details.map((item, idx) => (
                            <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                <td className="px-4 py-2">{idx + 1}</td>
                                <td className="px-4 py-2">{item.product.name}</td>
                                <td className="px-4 py-2">{item.qty}</td>
                                <td className="px-4 py-2 text-right whitespace-nowrap">
                                {formatRupiah(item.subtotal)}
                                </td>
                                <td className="px-4 py-2 text-right font-medium whitespace-nowrap">
                                {formatRupiah(item.subtotal * item.qty)}
                                </td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>
                </div>

                {/* Total */}
                <div className="text-right border-t pt-3">
                    <p className="text-lg font-bold text-gray-800 dark:text-white">
                        Total: Rp {trx.totalAmount.toLocaleString("id-ID")}
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap justify-between items-center gap-x-6 gap-y-3 pt-4 print:hidden">
                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3">
                        {trx.status === "PROSES" && (
                        <>
                            <button
                            onClick={() => onStatusChange("DIKIRIM")}
                            className="min-w-[160px] px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                            >
                            Mark as Shipped
                            </button>
                            <button
                            onClick={() => onStatusChange("DIBATALKAN")}
                            className="min-w-[160px] px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
                            >
                            Cancel Transaction
                            </button>
                        </>
                        )}

                        {trx.status === "DIKIRIM" && (
                        <button
                            onClick={() => onStatusChange("SELESAI")}
                            className="min-w-[160px] px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Mark as Completed
                        </button>
                        )}
                    </div>

                    {/* Download Button */}
                    <div>
                        <button
                        onClick={() => window.print()}
                        className="min-w-[160px] px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
                        >
                        Download Invoice
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
