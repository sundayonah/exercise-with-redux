// src/app/actions/saveUser.ts
'use server';

import { prisma } from '@/app/lib/prismaClient';
import { UserSchema } from '@/app/lib/validation';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export const saveUser = async (data: z.infer<typeof UserSchema>) => {
   try {
      // Validate the user data against the Zod schema
      UserSchema.parse(data);

      // Save user data to the database using Prisma
      await prisma.user.create({
         data: {
            firstname: data.firstname,
            lastname: data.lastname,
            sex: data.sex,
            age: data.age,
            createdAt: new Date().toISOString(),
         },
      });
      // Revalidate the necessary path if applicable
      revalidatePath('/');

      return { success: true, message: 'User data saved successfully!' };
   } catch (error) {
      console.error('Error saving user data:', error);
      throw new Error('Failed to save user data');
   }
};

export const getUsers = async () => {
   try {
      // Fetch all users from the PostgreSQL database
      const users = await prisma.user.findMany();

      return users;
   } catch (error) {
      console.error('Error fetching users:', error);
      throw new Error('Failed to fetch users');
   }
};

export const deleteUser = async (userId: number) => {
   try {
      // Delete user from the database by ID
      await prisma.user.delete({
         where: {
            id: userId,
         },
      });

      // Revalidate the path to ensure the page is updated
      revalidatePath('/');
      return { success: true, message: 'User deleted successfully!' };
   } catch (error) {
      console.error('Error deleting user:', error);
      throw new Error('Failed to delete user');
   }
};

// const createZodSchema = (
//    fields: FormField[]
// ): z.ZodObject<Record<string, z.ZodTypeAny>> => {
//    const shape: Record<string, z.ZodTypeAny> = {};

//    // Convert all field types to InputType
//    const typedFields = fields.map((field) => ({
//       ...field,
//       type: field.type as InputType,
//    }));

//    typedFields.forEach((field) => {
//       let fieldSchema: z.ZodTypeAny;

//       // Set the schema type based on field type
//       switch (field.type) {
//          case 'number':
//             fieldSchema = z.number();
//             break;
//          case 'text':
//          case 'email':
//          case 'password':
//          case 'url':
//          case 'phone':
//          case 'search':
//          case 'date':
//          case 'time':
//          case 'month':
//          case 'week':
//          case 'datetime-local':
//          case 'color':
//          case 'file':
//          case 'hidden':
//          case 'radio':
//          case 'textarea':
//          case 'range':
//          case 'slider':
//          case 'toggle-switch':
//          case 'autocomplete':
//          case 'multi-select':
//          case 'rating':
//          case 'star-rating':
//          case 'progress-bar':
//          case 'currency':
//          case 'percentage':
//          case 'year':
//          case 'hour12':
//          case 'hour24':
//          case 'minute':
//          case 'second':
//          case 'dayofweek':
//          case 'monthyear':
//          case 'weekyear':
//             fieldSchema = z.string();
//             break;
//          default:
//             console.warn(`Unsupported input type: ${field.type}`);
//             fieldSchema = z.unknown(); // This might cause issues, consider adding custom validation
//       }

//       // Apply validation rules based on field definition
//       if (field.validation.required) {
//          fieldSchema = fieldSchema.refine(
//             (val) => val !== '',
//             `${field.label} is required`
//          );
//       }

//       if (field.validation.minLength && field.type !== 'number') {
//          if (typeof fieldSchema === 'string') {
//             fieldSchema = z
//                .string()
//                .min(
//                   field.validation.minLength,
//                   `${field.label} must be at least ${field.validation.minLength} characters`
//                );
//          } else if (fieldSchema instanceof z.ZodNumber) {
//             fieldSchema = fieldSchema.min(
//                field.validation.minLength,
//                `${field.label} must be at least ${field.validation.minLength}`
//             );
//          }
//       }

//       if (field.validation.pattern && field.type === 'text') {
//          if (typeof fieldSchema === 'string') {
//             fieldSchema = z
//                .string()
//                .regex(
//                   new RegExp(field.validation.pattern),
//                   `${field.label} format is invalid`
//                );
//          } else {
//             console.warn(
//                `Cannot apply regex validation to non-string field: ${field.name}`
//             );
//          }
//       }

//       shape[field.name] = fieldSchema;
//    });

//    return z.object(shape);
// };

// Create Zod schema dynamically based on field definitions
// const createZodSchema = (
//    fields: FormField[]
// ): ZodObject<Record<string, ZodSchema>> => {
//    const shape: Record<string, ZodSchema> = {};

//    fields.forEach((field) => {
//       let fieldSchema: z.ZodTypeAny;

//       // Set the schema type based on field type
//       if (field.type === 'number') {
//          fieldSchema = z.number();
//       } else {
//          fieldSchema = z.string(); // Default for text fields
//       }

//       // Apply validation rules based on field definition
//       if (field.validation.required) {
//          fieldSchema = fieldSchema.refine(
//             (val) => val !== '',
//             `${field.label} is required`
//          );
//       }

//       if (field.validation.minLength && field.type !== 'number') {
//          fieldSchema = (fieldSchema as z.ZodString).min(
//             field.validation.minLength,
//             `${field.label} must be at least ${field.validation.minLength} characters`
//          );
//       }

//       if (field.validation.pattern && field.type === 'text') {
//          fieldSchema = (fieldSchema as z.ZodString).regex(
//             new RegExp(field.validation.pattern),
//             `${field.label} format is invalid`
//          );
//       }

//       shape[field.name] = fieldSchema;
//    });

//    return z.object(shape);
// };
