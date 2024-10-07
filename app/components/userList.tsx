'use client';

import { useState } from 'react';
import { paginate } from 'paginationah';
// import { User } from '../page';
import { User } from '../lib/validation';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { removeUser } from '@/features/users/usersSlice';
// import { z } from 'zod';

interface UsersListProps {
   // users: UserSchema[];
   users: User[];
}

const UsersList: React.FC<UsersListProps> = ({ users }) => {
   const dispatch: AppDispatch = useDispatch();

   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 4;
   const pagination = paginate({
      currentPage,
      totalItems: users.length,
      itemsPerPage,
   });

   const paginatedUsers = users.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
   );

   const pageNumbers = Array.from(
      { length: pagination.totalPages },
      (_, i) => i + 1
   );

   const handleDelete = (userId: number) => {
      if (userId) {
         console.log(userId, 'user id');
         dispatch(removeUser(userId)); // Ensure userId is a number
      } else {
         console.error('Invalid userId:', userId);
      }
   };

   return (
      <div className="max-w-4xl mx-auto py-10">
         <h1 className="text-3xl font-bold text-center mb-8">Users List</h1>
         <ul className="space-y-4">
            {paginatedUsers.length > 0 ? (
               paginatedUsers.map((user) => (
                  <li
                     key={user.id}
                     className="bg-white shadow-lg rounded-lg p-6"
                  >
                     <div className="flex justify-between items-center">
                        <div>
                           <h2 className="text-xl font-semibold">
                              {user.firstname} {user.lastname}
                           </h2>
                           <p className="text-gray-600">
                              {user.age} years old, {user.sex}
                           </p>
                           <p className="text-gray-500 text-sm">
                              Created at:{' '}
                              {new Date(user?.createdAt || '').toLocaleString()}
                           </p>
                        </div>
                        <button
                           onClick={() => handleDelete(user.id!)}
                           className="text-red-500 hover:text-red-700"
                        >
                           Delete
                        </button>
                     </div>
                  </li>
               ))
            ) : (
               <p className="text-center text-gray-500">No users found.</p>
            )}
         </ul>

         <div className="flex justify-center space-x-4 mt-8">
            <button
               onClick={() => setCurrentPage(currentPage - 1)}
               disabled={pagination.previousPage === null}
               className={`px-4 py-2 rounded ${
                  pagination.previousPage === null
                     ? 'bg-gray-300'
                     : 'bg-blue-500 text-white'
               }`}
            >
               Previous
            </button>
            <div className="flex justify-center space-x-2 ">
               {pageNumbers.map((page) => (
                  <button
                     key={page}
                     onClick={() => setCurrentPage(page)}
                     className={`px-4 py-2 rounded ${
                        currentPage === page
                           ? 'bg-blue-500 text-white'
                           : 'bg-gray-300'
                     }`}
                  >
                     {page}
                  </button>
               ))}
            </div>

            <button
               onClick={() => setCurrentPage(currentPage + 1)}
               disabled={pagination.nextPage === null}
               className={`px-4 py-2 rounded ${
                  pagination.nextPage === null
                     ? 'bg-gray-300'
                     : 'bg-blue-500 text-white'
               }`}
            >
               Next
            </button>
         </div>
      </div>
   );
};

export default UsersList;
