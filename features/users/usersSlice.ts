import { deleteUser, getUsers, saveUser } from '@/actions/actions';
import { User } from '@/app/lib/validation'; // Import User type from validation
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface UserState {
   users: User[];
   status: 'idle' | 'loading' | 'failed';
}

const initialState: UserState = {
   users: [],
   status: 'idle',
};

export const fetchUsers = createAsyncThunk<User[], void>(
   'users/fetchUsers',
   async () => {
      const users = await getUsers();

      // Transform users to match the User type
      return users.map((user) => ({
         id: user.id ?? 0, // Provide a default value if undefined
         firstname: user.firstname,
         lastname: user.lastname,
         sex: user.sex as 'male' | 'female',
         age: user.age,
         createdAt: new Date().toISOString(),
      }));
   }
);

export const addUser = createAsyncThunk(
   'users/addUser',
   async (newUser: User) => {
      await saveUser(newUser);
      return newUser;
   }
);

export const removeUser = createAsyncThunk(
   'users/deleteUser',
   async (userId: number) => {
      await deleteUser(userId); // Remove from the DB
      return userId; // Return user ID for further processing in the reducer
   }
);

// Users slice
const usersSlice = createSlice({
   name: 'users',
   initialState,
   reducers: {
      // deleteUser(state, action) {
      //    state.users = state.users.filter((user) => user.id !== action.payload);
      // },
      updateUser(state, action) {
         const index = state.users.findIndex(
            (user) => user.id === action.payload.id
         );
         if (index !== -1) {
            state.users[index] = action.payload;
         }
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchUsers.pending, (state) => {
            state.status = 'loading';
         })
         .addCase(fetchUsers.fulfilled, (state, action) => {
            state.status = 'idle';
            state.users = action.payload; // Ensure payload is of type User[]
         })
         .addCase(fetchUsers.rejected, (state) => {
            state.status = 'failed';
         })
         .addCase(addUser.fulfilled, (state, action) => {
            state.users.push(action.payload);
         });
   },
});

export const { updateUser } = usersSlice.actions;

export default usersSlice.reducer;
