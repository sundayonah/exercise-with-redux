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
      console.log('Fetched users:', users);

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
