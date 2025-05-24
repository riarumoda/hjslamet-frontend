"use client";
import MemberTables from '@/components/ui-admin/member-tables'
import PaginationAdmin from '@/components/ui-admin/pagination-admin';
import { getMembers } from '@/lib/api';
import { Member } from '@/types';
import React, { useEffect, useState } from 'react'

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([])

  const getDataMember = async () => {
    const data = await getMembers()
    setMembers(data)
  }

  useEffect(() => {
    getDataMember()
  }, [])

  return (
    <div>
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl font-semibold'>Members</h1>
          <div>
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add</button>
          </div>
        </div>

        {/* card wrapper */}
        <div className='w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 mt-6'>
            {/* card header */}
            <div className='flex justify-between items-center space-x-6 w-full'>              
              <form className="w-full">   
                  <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                  <div className="relative">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                          </svg>
                      </div>
                      <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
                      <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                  </div>
              </form>
            </div>

            {/* card table */}
            <div className='mt-6'>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <MemberTables members={members}/>
              </div>
            </div>

            {/* pagination */}
            <div className='mt-4'>
              <PaginationAdmin/>
            </div>
        </div>
    </div>
  )
}
