// src/components/UserForm.tsx
'use client';
import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
import { convertDataToUser } from '../lib/validation';
// import { saveUser } from '@/actionns/actions';
import { useDispatch } from 'react-redux';
import { addUser } from '@/features/users/usersSlice';
import { AppDispatch } from '../store';
// import { Loading } from './loading';
import DynamicFormGenerator from 'dynamic-form-generator-o';

const UserForm: React.FC = () => {
   const [isModalOpen, setIsModalOpen] = useState(false);

   // const {
   //    register,
   //    handleSubmit,
   //    formState: { errors, isSubmitting },
   // } = useForm<User>({
   //    resolver: zodResolver(UserSchema),
   // });

   // const onSubmit = async (data: User) => {
   //    setIsSubmitting(true);
   //    try {
   //       await saveUser(data);
   //    } catch (error) {
   //       console.error('Error submitting form:', error);
   //    } finally {
   //       setIsSubmitting(false);
   //    }
   // };

   const dispatch: AppDispatch = useDispatch();
   const onSubmit = async (data: Partial<Record<string, unknown>>) => {
      console.log(data, 'data data');
      const user = convertDataToUser(data);
      console.log(user, ' u s e r ');
      await dispatch(addUser(user)).unwrap();
      setIsModalOpen(false);
   };

   // Function to toggle the modal
   const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
   };

   const customStyles = {
      title: 'text-xl font-bold mb-6 text-center',
      formWrapper: 'w-[50%] p-6 shadow-md bg-white',
      input: 'w-full p-2 border rounded-md',
      select: 'w-full p-2 border rounded-md',
      label: 'block mb-2 text-sm font-medium text-gray-700',
      errorText: 'text-red-500 text-xs mt-1',
      submitButton:
         'w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600',
   };

   // Define your form schema
   const formSchema = {
      title: 'Add New User',
      fields: [
         {
            name: 'firstname',
            type: 'text' as const,
            label: 'First Name',
            placeholder: 'Enter your First Name',
         },
         {
            name: 'lastname',
            type: 'text' as const,
            label: 'Last Name',
            placeholder: 'Enter your Last Name',
         },
         {
            name: 'sex',
            type: 'select' as const,
            label: 'Sex',
            options: ['male', 'female'],
            placeholder: 'Select your gender',
         },
         {
            name: 'age',
            type: 'number' as const,
            label: 'Age',
            placeholder: 'Enter your age',
         },
      ],
   };

   return (
      <>
         <div className="text-end">
            <button
               className=" bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
               onClick={toggleModal}
            >
               Add User
            </button>
         </div>

         {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-10">
               <DynamicFormGenerator
                  formSchema={formSchema}
                  styles={customStyles}
                  onSubmit={onSubmit}
                  buttonText="Register"
               />
            </div>

            // <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-10">
            //    <div className="bg-white shadow-lg p-6 rounded-md w-full max-w-lg">
            //       {/* Modal header */}
            //       <div className="flex justify-between items-center mb-4">
            //          <h2 className="text-xl font-bold">Add New User</h2>
            //          <button
            //             className="text-gray-500 hover:text-gray-700"
            //             onClick={toggleModal}
            //          >
            //             &#x2715;
            //          </button>
            //       </div>

            //       {/* Form */}
            //       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            //          <div>
            //             <label
            //                htmlFor="firstname"
            //                className="block text-sm font-medium text-gray-700 mb-1"
            //             >
            //                First Name:
            //             </label>
            //             <input
            //                {...register('firstname')}
            //                id="firstname"
            //                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            //             />
            //             {errors.firstname && (
            //                <span className="text-red-500 mt-1">
            //                   {errors.firstname.message}
            //                </span>
            //             )}
            //          </div>

            //          <div>
            //             <label
            //                htmlFor="lastname"
            //                className="block text-sm font-medium text-gray-700 mb-1"
            //             >
            //                Last Name:
            //             </label>
            //             <input
            //                {...register('lastname')}
            //                id="lastname"
            //                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            //             />
            //             {errors.lastname && (
            //                <span className="text-red-500 mt-1">
            //                   {errors.lastname.message}
            //                </span>
            //             )}
            //          </div>

            //          <div>
            //             <label
            //                htmlFor="sex"
            //                className="block text-sm font-medium text-gray-700 mb-1"
            //             >
            //                Sex:
            //             </label>
            //             <select
            //                {...register('sex')}
            //                id="sex"
            //                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            //             >
            //                <option value="">Select</option>
            //                <option value="male">Male</option>
            //                <option value="female">Female</option>
            //             </select>
            //             {errors.sex && (
            //                <span className="text-red-500 mt-1">
            //                   {errors.sex.message}
            //                </span>
            //             )}
            //          </div>

            //          <div>
            //             <label
            //                htmlFor="age"
            //                className="block text-sm font-medium text-gray-700 mb-1"
            //             >
            //                Age:
            //             </label>
            //             <input
            //                type="number"
            //                {...register('age')}
            //                id="age"
            //                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            //             />
            //             {errors.age && (
            //                <span className="text-red-500 mt-1">
            //                   {errors.age.message}
            //                </span>
            //             )}
            //          </div>

            //          <button
            //             type="submit"
            //             disabled={isSubmitting}
            //             className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            //          >
            //             {isSubmitting ? <Loading /> : 'Submit'}
            //          </button>
            //       </form>
            //    </div>
            // </div>
         )}
      </>
   );
};

export default UserForm;
