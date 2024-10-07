// import { getUsers } from '@/actionns/actions';
// import UserForm from './components/useForm';
// import UsersList from './components/userList';
// import { useDispatch, useSelector } from 'react-redux';
// // import { User } from './lib/validation';

// export interface User {
//    id: number;
//    firstname: string;
//    lastname: string;
//    age: number;
//    sex: string;
//    createdAt: string | Date;
// }

// export default async function Home() {
//    const dispatch = useDispatch();

//    // Access users and status from Redux state
//    const userss = useSelector(
//       (state: { users: { users: User[] } }) => state.users.users
//    );
//    console.log(userss);
//    const status = useSelector(
//       (state: { users: { status: string } }) => state.users.status
//    );

//    // Use a full URL to fetch users
//    const url = process.env.LOCAL_URL;
//    // Check if url is defined
//    if (!url) {
//       throw new Error('LOCAL_URL environment variable is not set');
//    }

//    //    useEffect(() => {
//    //    // Fetch users when the component mounts
//    //    const fetchUsers = async () => {
//    //       const data = await getUsers();
//    //       console.log(data, 'data');
//    //       // setUsers(data);
//    //    };

//    //    fetchUsers();
//    // }, []);

//    const datas = await getUsers();
//    // console.log(datas, 'data data');

//    // const data = await fetch(url);
//    const users: User[] = await datas;

//    return (
//       <div className="max-w-2xl mx-auto mt-24 space-y-20">
//          <UserForm />
//          <UsersList users={users} />
//       </div>
//    );
// }

// This directive makes the component a Client Component
'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserForm from './components/useForm';
import UsersList from './components/userList';
import { fetchUsers } from '@/features/users/usersSlice';
import { User } from './lib/validation';
import { AppDispatch } from './store';

// export interface User {
//    id: number;
//    firstname: string;
//    lastname: string;
//    age: number;
//    sex: string;
//    createdAt: string | Date;
// }

export default function Home() {
   // const dispatch = useDispatch();

   const dispatch: AppDispatch = useDispatch();
   const users = useSelector(
      (state: { users: { users: User[] } }) => state.users.users
   );

   console.log(users, 'users from redux');

   const status = useSelector(
      (state: { users: { status: string } }) => state.users.status
   );

   useEffect(() => {
      dispatch(fetchUsers());
   }, [dispatch]);

   return (
      <div className="max-w-2xl mx-auto mt-24 space-y-20">
         <UserForm />
         {status === 'loading' ? (
            <p>Loading...</p>
         ) : (
            <UsersList users={users} />
         )}
      </div>
   );
}
