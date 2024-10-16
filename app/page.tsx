'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserForm from './components/useForm';
import UsersList from './components/userList';
import { fetchUsers } from '@/features/users/usersSlice';
import { User } from './lib/validation';
import { AppDispatch } from './store';
// import DynamicFormGenerator from 'dynamic-form-generator-o';

import DynamicFormBuilder from './components/dynamicFormWithProps';

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

   const status = useSelector(
      (state: { users: { status: string } }) => state.users.status
   );

   // const customStyles = {
   //    title: 'text-xl font-bold mb-6 text-center',
   //    formWrapper: 'max-w-2xl mx-auto p-6 shadow-md',
   //    input: 'w-full p-2 border rounded-md',
   //    select: 'w-full p-2 border rounded-md',
   //    label: 'block mb-2 text-sm font-medium text-gray-700',
   //    errorText: 'text-red-500 text-xs mt-1',
   //    submitButton:
   //       'w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600',
   // };

   // // Define your form schema
   // const formSchema = {
   //    title: 'User Registration',
   //    fields: [
   //       {
   //          name: 'username',
   //          type: 'text' as const,
   //          label: 'Username',
   //          placeholder: 'Enter your username',
   //          validation: { required: true, minLength: 6 },
   //       },
   //       {
   //          name: 'email',
   //          type: 'email' as const,
   //          label: 'Email',
   //          placeholder: 'Enter your email',
   //          validation: { required: true },
   //       },
   //       {
   //          name: 'password',
   //          type: 'password' as const,
   //          label: 'Password',
   //          placeholder: 'Enter your password',
   //          validation: { required: true, minLength: 8 },
   //       },
   //       {
   //          name: 'age',
   //          type: 'number' as const,
   //          label: 'Age',
   //          placeholder: 'Enter your age',
   //          validation: {
   //             required: false,
   //             minLength: 2,
   //          },
   //       },
   //       {
   //          name: 'Sex',
   //          type: 'select' as const,
   //          label: 'Sex',
   //          options: ['male', 'female'],

   //          placeholder: 'Select your gender',
   //          validation: { required: true, minLength: 6 },
   //       },
   //       {
   //          name: 'Date',
   //          type: 'date' as const,
   //          label: 'Date',
   //          placeholder: 'Enter Date',
   //          validation: { required: true, minLength: 6 },
   //       },
   //    ],
   // };

   const onSubmit = (data: Partial<FormData>) => {
      console.log('Form Data:', data);
   };

   // const onSubmit = (data: Partial<FormData>) => {
   //    console.log('Form Data:', data);
   //    // Optionally, you can also display the data in the parent component
   //    console.log(JSON.stringify(data, null, 2)); // Pretty-printed JSON
   // };

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

         <DynamicFormBuilder onSubmit={onSubmit} />

         {/* <DynamicFormBuilder
            formSchema={formSchema}
            styles={customStyles}
            onSubmit={onSubmit}
            buttonText="Register"
         /> */}

         {/* <DynamicFormGenerator onSubmit={onSubmit} /> */}
      </div>
   );
}
