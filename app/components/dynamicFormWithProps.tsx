import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type InputType =
   | 'number'
   | 'text'
   | 'select'
   | 'checkbox'
   | 'enum'
   | 'email'
   | 'phone'
   | 'password'
   | 'url'
   | 'search'
   | 'date'
   | 'time'
   | 'month'
   | 'week'
   | 'datetime-local'
   | 'color'
   | 'file'
   | 'hidden'
   | 'radio'
   | 'textarea'
   | 'range'
   | 'slider'
   | 'toggle-switch'
   | 'autocomplete'
   | 'multi-select'
   | 'rating'
   | 'star-rating'
   | 'progress-bar'
   | 'currency'
   | 'percentage'
   | 'year'
   | 'hour12'
   | 'hour24'
   | 'minute'
   | 'second'
   | 'dayofweek'
   | 'monthyear'
   | 'weekyear'
   | 'custom';

interface FormField {
   name: string;
   type: InputType;
   label: string;
   validation?: {
      required?: boolean;
      minLength?: number;
      pattern?: string;
      min?: number;
   };
   placeholder?: string;
   options?: string[];
}

interface DynamicFormBuilderProps {
   formSchema?: {
      title: string;
      fields: FormField[];
   };
   styles?: {
      title?: string;
      formWrapper?: string;
      input?: string;
      select?: string;
      label?: string;
      errorText?: string;
      submitButton?: string;
   };
   onSubmit: (data: Partial<Record<string, unknown>>) => void;
   buttonText?: string;
}

const defaultFormSchema = {
   title: 'Default Form',
   fields: [
      {
         name: 'username',
         type: 'text' as const,
         label: 'Username',
         placeholder: 'Enter your username',
         validation: { required: true, minLength: 6 },
      },
      {
         name: 'email',
         type: 'email' as const,
         label: 'Email',
         placeholder: 'Enter your email',
         validation: { required: true },
      },
      {
         name: 'password',
         type: 'password' as const,
         label: 'Password',
         placeholder: 'Enter your password',
         validation: { required: true, minLength: 8 },
      },
      {
         name: 'age',
         type: 'number' as const,
         label: 'Age',
         placeholder: 'Enter your age',
         validation: {
            required: false,
            minLength: 2,
         },
      },
      {
         name: 'Sex',
         type: 'select' as const,
         label: 'Sex',
         options: ['male', 'female'],
         placeholder: 'Select your gender',
         validation: { required: true, minLength: 6 },
      },
      {
         name: 'Date',
         type: 'date' as const,
         label: 'Date',
         placeholder: 'Enter Date',
         validation: { required: true, minLength: 6 },
      },
      {
         name: 'Image',
         type: 'file' as const,
         label: 'image',
         placeholder: 'Enter Date',
         //  validation: { required: true, minLength: 6 },
      },
   ],
};

const defaultStyles = {
   formWrapper: 'max-w-2xl mx-auto p-8 bg-white shadow-md rounded-md',
   title: 'text-xl font-bold mb-6 text-center',
   input: 'border p-2 rounded focus:ring focus:ring-blue-300',
   select: 'border p-2 rounded focus:ring focus:ring-blue-300',
   label: 'text-sm font-medium mb-1',
   errorText: 'text-red-500 text-sm mt-1',
   submitButton: 'w-full bg-blue-500 text-white p-2 rounded mt-4',
};

const createZodSchema = (
   fields: FormField[]
): z.ZodObject<Record<string, z.ZodTypeAny>> => {
   const shape: Record<string, z.ZodTypeAny> = {};

   fields.forEach((field) => {
      let fieldSchema: z.ZodTypeAny;

      // Set the schema type based on field type
      switch (field.type) {
         case 'number':
            fieldSchema = z.number();
            break;
         case 'text':
         case 'email':
         case 'password':
         case 'url':
         case 'phone':
         case 'search':
         case 'date':
         case 'time':
         case 'month':
         case 'week':
         case 'datetime-local':
         case 'color':
         case 'hidden':
         case 'radio':
         case 'textarea':
         case 'range':
         case 'slider':
         case 'toggle-switch':
         case 'autocomplete':
         case 'multi-select':
         case 'rating':
         case 'star-rating':
         case 'currency':
         case 'percentage':
         case 'year':
         case 'hour12':
         case 'hour24':
         case 'minute':
         case 'second':
         case 'dayofweek':
         case 'monthyear':
         case 'weekyear':
            fieldSchema = z.string();
            break;
         case 'select':
            fieldSchema = z.enum(field.options as [string, ...string[]]); // Enforcing enum validation from options
            break;
         case 'file':
            fieldSchema = z
               .instanceof(File) // Validate single file, not FileList
               .optional(); // Make it optional if not mandatory

            // case 'file':
            //    fieldSchema = z.instanceof(File); // Assuming you want to validate file uploads
            break;
         default:
            console.warn(`Unsupported input type: ${field.type}`);
            fieldSchema = z.unknown(); // This might cause issues, consider adding custom validation
      }

      if (field.validation) {
         if (field.validation.required === false) {
            fieldSchema = fieldSchema.optional();
         } else if (field.validation.required) {
            fieldSchema = fieldSchema.refine(
               (val) => val !== '',
               `${field.label} is required`
            );
         }

         // Apply minLength only if the field type is string and minLength is set
         if (
            field.validation &&
            field.validation.pattern &&
            field.type === 'text'
         ) {
            fieldSchema = (fieldSchema as z.ZodString).regex(
               new RegExp(field.validation.pattern),
               `${field.label} format is invalid`
            );
         }

         // Apply regex validation for string fields if pattern is provided
         if (field.validation.pattern && field.type === 'text') {
            fieldSchema = (fieldSchema as z.ZodString).regex(
               new RegExp(field.validation.pattern),
               `${field.label} format is invalid`
            );
         }

         // Apply min for number fields
         if (field.type === 'number' && field.validation.min !== undefined) {
            fieldSchema = (fieldSchema as z.ZodNumber).min(
               field.validation.min,
               `${field.label} must be at least ${field.validation.min}`
            );
         }
      }

      shape[field.name] = fieldSchema;
   });

   return z.object(shape);
};

const DynamicFormBuilder: React.FC<DynamicFormBuilderProps> = ({
   formSchema = defaultFormSchema,
   styles = defaultStyles,
   onSubmit,
   buttonText = 'Submit',
}) => {
   const zodSchema = createZodSchema(formSchema.fields);
   const [submittedData, setSubmittedData] = useState<string>('');

   const {
      handleSubmit,
      control,
      formState: { errors },
   } = useForm({
      resolver: zodResolver(zodSchema),
   });

   const handleFormSubmit = (data: Partial<Record<string, unknown>>) => {
      const jsonData = JSON.stringify(data, null, 2);
      localStorage.setItem('submittedFormData', jsonData);
      setSubmittedData(jsonData);
      onSubmit(data);
   };

   return (
      <div className={styles.formWrapper}>
         <h2 className={styles.title}>{formSchema.title}</h2>
         <form
            // onSubmit={handleSubmit((data) => onSubmit(data))}
            onSubmit={handleSubmit(handleFormSubmit)}
            className="space-y-4"
         >
            {formSchema.fields.map((field, index) => (
               <div key={index} className="flex flex-col">
                  <label
                     htmlFor={field.name}
                     //  id={`label-${field.name}`}
                     className={styles.label}
                  >
                     {field.label}
                  </label>
           
                  {field.type === 'select' ? (
                     <Controller
                        name={field.name}
                        control={control}
                        render={({ field: selectField }) => (
                           <select
                              {...selectField}
                              className={`${styles.select} ${
                                 errors[field.name]
                                    ? 'border-red-500'
                                    : 'border-gray-300'
                              }`}
                              aria-labelledby={`label-${field.name}`}
                           >
                              <option value="">Select an option</option>
                              {field.options?.map((option) => (
                                 <option key={option} value={option}>
                                    {option}
                                 </option>
                              ))}
                           </select>
                        )}
                     />
                  ) : field.type === 'checkbox' ? (
                     <Controller
                        name={field.name}
                        control={control}
                        render={({ field: checkboxField }) => (
                           <input
                              type="checkbox"
                              {...checkboxField}
                              className={`${styles.input} ${
                                 errors[field.name]
                                    ? 'border-red-500'
                                    : 'border-gray-300'
                              }`}
                              aria-labelledby={`label-${field.name}`}
                           />
                        )}
                     />
                  ) : field.type === 'file' ? (
                     <Controller
                        name={field.name}
                        control={control}
                        render={({ field: fileField }) => (
                           <input
                              type="file"
                              onChange={(e) => {
                                 const file = e.target.files
                                    ? e.target.files[0]
                                    : null; // Handle single file selection
                                 fileField.onChange(file); // Pass the file to react-hook-form
                              }}
                              className={`${styles.input} ${
                                 errors[field.name]
                                    ? 'border-red-500'
                                    : 'border-gray-300'
                              }`}
                              aria-labelledby={`label-${field.name}`}
                           />
                        )}
                     />
                  ) : (
                     <Controller
                        name={field.name}
                        control={control}
                        render={({ field: inputField }) => (
                           <input
                              type={field.type}
                              placeholder={field.placeholder}
                              {...inputField}
                              value={inputField.value || ''}
                              onChange={(e) => {
                                 const value =
                                    field.type === 'number'
                                       ? parseFloat(e.target.value)
                                       : e.target.value;
                                 inputField.onChange(value);
                              }}
                              className={`${styles.input} ${
                                 errors[field.name]
                                    ? 'border-red-500'
                                    : 'border-gray-300'
                              }`}
                              aria-labelledby={`label-${field.name}`}
                           />
                        )}
                     />
                  )}

                  {errors[field.name] && (
                     <p className={styles.errorText}>
                        {errors[field.name]?.message as string}
                     </p>
                  )}
               </div>
            ))}
            <button type="submit" className={styles.submitButton}>
               {buttonText}
            </button>
         </form>
         {submittedData && (
            <div className="mt-4">
               <h3>Submitted Form Data:</h3>
               <pre>{submittedData}</pre>
            </div>
         )}
      </div>
   );
};
export default DynamicFormBuilder;
