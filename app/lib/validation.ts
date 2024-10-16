import { z } from 'zod';

export const UserSchema = z.object({
   id: z.number().optional(), // Make it optional for form submission
   firstname: z.string().min(1, 'First name is required'),
   lastname: z.string().min(1, 'Last name is required'),
   sex: z.enum(['male', 'female']),
   age: z.preprocess(
      (val) => Number(val),
      z
         .number()
         .positive('Age must be positive')
         .max(120, 'Age must be 120 or less')
   ),
   createdAt: z.string().optional(),
});

export type User = z.infer<typeof UserSchema>;


   export const convertDataToUser = (
      formData: Partial<Record<string, unknown>>
   ): User => {
      return {
         firstname:
            typeof formData.firstname === 'string' ? formData.firstname : '',
         lastname:
            typeof formData.lastname === 'string' ? formData.lastname : '',
         sex:
            typeof formData.sex === 'string'
               ? (formData.sex as 'male' | 'female')
               : 'female',

         age: typeof formData.age === 'number' ? formData.age : 0,
         id: typeof formData.id === 'number' ? formData.id : undefined,
         createdAt:
            typeof formData.createdAt === 'string' ? formData.createdAt : '',
      };
   };