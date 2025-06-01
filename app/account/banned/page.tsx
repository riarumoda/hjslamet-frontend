import React from "react";

export default function BannedPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-8 bg-red-50 rounded shadow text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-2">Account Banned</h2>
        <p className="text-red-500">
          Your account has been banned. Please contact support for more
          information.
        </p>
      </div>
    </div>
  );
}
