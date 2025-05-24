import React from 'react'

export interface Member {
  name: string;
  pnumber: string;
  address: string;
  email: string;
  isBanned: boolean;
}

interface MemberTablesProps {
  members: Member[];
}

const MemberTables: React.FC<MemberTablesProps> = ({ members }) => {
    return (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Phone Number</th>
                <th scope="col" className="px-6 py-3">Address</th>
                <th scope="col" className="px-6 py-3">Email</th>
                <th scope="col" className="px-6 py-3">Banned</th>
                <th scope="col" className="px-6 py-3">Action</th>
            </tr>
            </thead>
            <tbody>
            {members.map((member, index) => (
                <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {member.name}
                </th>
                <td className="px-6 py-4">
                    <span
                        className="relative group text-gray-700 dark:text-gray-300 cursor-default"
                        data-full={member.pnumber}
                    >
                        <span className="group-hover:invisible">***************</span>
                        <span className="absolute top-0 left-0 invisible group-hover:visible">
                        {member.pnumber}
                        </span>
                    </span>
                </td>

                <td className="px-6 py-4">{member.address}</td>
                <td className="px-6 py-4">{member.email}</td>
                <td className="px-6 py-4">
                {member.isBanned ? (
                    <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-red-800 bg-red-100 rounded-full dark:bg-red-900 dark:text-red-300">
                    Banned
                    </span>
                ) : (
                    <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full dark:bg-green-900 dark:text-green-300">
                    Active
                    </span>
                )}
                </td>
                <td className="flex items-center px-6 py-4">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Remove</a>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default MemberTables;
