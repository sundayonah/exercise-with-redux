import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Example schema
const formSchema = {
   title: 'User Registration',
   fields: [
      {
         name: 'username',
         type: 'text',
         label: 'Username',
         validation: {
            required: true,
            minLength: 12,
         },
         placeholder: 'Enter username',
      },
      {
         name: 'fullname',
         type: 'text',
         label: 'Fullname',
         validation: {
            required: true,
            minLength: 12,
         },
         placeholder: 'Enter fullname',
      },
      {
         name: 'email',
         type: 'email',
         label: 'Email',
         validation: {
            required: true,
            pattern: '[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-zA-Z]{2,}',
         },
         placeholder: 'Enter your email',
      },
      {
         name: 'password',
         type: 'password',
         label: 'Password',
         validation: {
            required: true,
            minLength: 8,
         },
         placeholder: 'Enter a password',
      },
      {
         name: 'role',
         type: 'select',
         label: 'Role',
         options: ['User', 'Admin'],
         validation: {
            required: true,
         },
      },
   ],
};

// Zod schema generated from JSON schema
const zodValidationSchema = z.object({
   username: z.string().min(3, 'Please enter a valid username'),
   fullname: z.string().min(3, 'Please enter your fullname'),
   email: z.string().email('Invalid email address'),
   password: z.string().min(4, 'Password must be at least 8 characters'),
   role: z.string().nonempty('Role is required'),
});

const DynamicForm = () => {
   const {
      handleSubmit,
      control,
      formState: { errors },
   } = useForm({
      resolver: zodResolver(zodValidationSchema),
   });

   const onSubmit = (data: Partial<FormData>) => {
      console.log(data);
   };

   return (
      <div className="max-w-md mx-auto p-8 bg-white shadow-md rounded-md mb-12">
         <h2 className="text-xl font-semibold mb-6 text-center">
            {formSchema.title}
         </h2>

         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {formSchema.fields.map((field, index) => {
               if (field.type === 'select') {
                  return (
                     <div key={index} className="flex flex-col">
                        <label className="text-sm font-medium mb-1">
                           {field.label}
                        </label>
                        <Controller
                           name={field.name}
                           control={control}
                           render={({ field: selectField }) => (
                              <select
                                 {...selectField}
                                 className={`border p-2 rounded focus:ring focus:ring-blue-300 ${
                                    errors[field.name]
                                       ? 'border-red-500'
                                       : 'border-gray-300'
                                 }`}
                              >
                                 <option value="">Select an option</option>
                                 {field.options?.map((option: string) => (
                                    <option key={option} value={option}>
                                       {option}
                                    </option>
                                 ))}
                              </select>
                           )}
                        />
                        {errors[field.name] && (
                           <p className="text-red-500 text-sm mt-1">
                              {errors[field.name]?.message as string}
                           </p>
                        )}
                     </div>
                  );
               }

               return (
                  <div key={index} className="flex flex-col">
                     <label className="text-sm font-medium mb-1">
                        {field.label}
                     </label>
                     <Controller
                        name={field.name}
                        control={control}
                        render={({ field: inputField }) => (
                           <input
                              type={field.type}
                              placeholder={field.placeholder}
                              {...inputField}
                              className={`border p-2 rounded focus:ring focus:ring-blue-300 ${
                                 errors[field.name]
                                    ? 'border-red-500'
                                    : 'border-gray-300'
                              }`}
                           />
                        )}
                     />
                     {errors[field.name] && (
                        <p className="text-red-500 text-sm mt-1">
                           {errors[field.name]?.message as string}
                        </p>
                     )}
                  </div>
               );
            })}

            <button
               type="submit"
               className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600 transition duration-200"
            >
               Submit
            </button>
         </form>
      </div>
   );
};

export default DynamicForm;
