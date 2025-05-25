import React from 'react'

const AddIcon = () => (
  <svg
    className="w-6 h-6"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 18 18"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 1v16M1 9h16"
    />
  </svg>
);

const Admin = () => {
  return (
    <div className="p-4 border-2 border-dashed border-gray-200 rounded-lg dark:border-gray-700">
        {/* Grid 3 kolom */}
        <div className="grid grid-cols-3 gap-4 mb-4">
            {[...Array(3)].map((_, idx) => (
            <div
                key={`grid-top-${idx}`}
                className="flex items-center justify-center h-24 rounded-sm bg-gray-50 dark:bg-gray-800"
            >
                <AddIcon />
            </div>
            ))}
        </div>

        {/* Kotak besar */}
        <div className="flex items-center justify-center h-48 mb-4 rounded-sm bg-gray-50 dark:bg-gray-800">
            <AddIcon />
        </div>

        {/* Grid 2 kolom */}
        <div className="grid grid-cols-2 gap-4 mb-4">
            {[...Array(4)].map((_, idx) => (
            <div
                key={`grid-mid-${idx}`}
                className="flex items-center justify-center h-28 rounded-sm bg-gray-50 dark:bg-gray-800"
            >
                <AddIcon />
            </div>
            ))}
        </div>

        {/* Kotak besar kedua */}
        <div className="flex items-center justify-center h-48 mb-4 rounded-sm bg-gray-50 dark:bg-gray-800">
            <AddIcon />
        </div>

        {/* Grid terakhir */}
        <div className="grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, idx) => (
            <div
                key={`grid-bot-${idx}`}
                className="flex items-center justify-center h-28 rounded-sm bg-gray-50 dark:bg-gray-800"
            >
                <AddIcon />
            </div>
            ))}
        </div>
    </div>
  )
}

export default Admin