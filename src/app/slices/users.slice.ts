import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import * as usersApi from 'api/users.api';
import * as experiencesApi from 'api/experiences.api';
import type { RootState } from 'app/store';

type FetchStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

/* 
 Using hash map (objects) to store users to reduce time complexity to O(n)
 when iterating over user experiences
*/
interface IUsersState {
  users: { [userId: string]: IUser };
  status: FetchStatus;
  error: string | null;
}

const initialState: IUsersState = {
  users: {},
  status: 'idle',
  error: null,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const fetchedUsers = await usersApi.getAllUsers();
  return fetchedUsers;
});

export const createUser = createAsyncThunk(
  'users/createUser',
  async (user: IUserDto) => {
    const createdUser = await usersApi.createUser(user);
    return createdUser;
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (user: IUserDto & { id: string }) => {
    const updatedUser = await usersApi.updateUser(user.id, user);
    return updatedUser;
  }
);

export const createExperience = createAsyncThunk(
  'users/createExperience',
  async (experience: IExperienceDto) => {
    const createdExperience = await experiencesApi.createExperience(experience);
    return createdExperience;
  }
);

export const updateExperience = createAsyncThunk(
  'users/updateExperience',
  async (experience: IExperienceDto & { id: string }) => {
    const updatedExperience = await experiencesApi.updateExperience(
      experience.id,
      experience
    );
    return updatedExperience;
  }
);

export const deleteExperience = createAsyncThunk(
  'users/deleteExperience',
  async (experience: IExperience) => {
    await experiencesApi.deleteExperience(experience.id);
    return experience;
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchUsers.fulfilled,
        (state, action: PayloadAction<IUser[]>) => {
          const fetchedUsers = action.payload;
          fetchedUsers.forEach((user) => {
            if (!state.users[user.id]) {
              state.users[user.id] = { ...user };
            }
          });
          state.status = 'succeeded';
        }
      )
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message as string;
      })
      .addCase(createUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        const createdUser = action.payload;
        if (!state.users[createdUser.id]) {
          state.users[createdUser.id] = { ...createdUser };
        }
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        const updatedUser = action.payload;
        if (state.users[updatedUser.id]) {
          state.users[updatedUser.id] = { ...updatedUser };
        }
      })
      .addCase(
        createExperience.fulfilled,
        (state, action: PayloadAction<IExperience>) => {
          const createdExperience = action.payload;
          const foundUser = state.users[createdExperience.userId];
          if (foundUser) {
            foundUser.workExperiences.push(createdExperience);
          }
        }
      )
      .addCase(
        updateExperience.fulfilled,
        (state, action: PayloadAction<IExperience>) => {
          const updatedExperience = action.payload;
          const foundUser = state.users[updatedExperience.userId];
          if (foundUser) {
            foundUser.workExperiences = foundUser.workExperiences.map(
              (experience) => {
                return experience.id === updatedExperience.id
                  ? updatedExperience
                  : experience;
              }
            );
          }
        }
      )
      .addCase(
        deleteExperience.fulfilled,
        (state, action: PayloadAction<IExperience>) => {
          const deletedExperience = action.payload;
          const foundUser = state.users[deletedExperience.userId];
          if (foundUser) {
            foundUser.workExperiences = foundUser.workExperiences.filter(
              (experience) => experience.id !== deletedExperience.id
            );
          }
        }
      );
  },
});

export const getAllUsers = (state: RootState) =>
  Object.values(state.users.users);
export const getUsersStatus = (state: RootState) => state.users.status;
export const getUsersError = (state: RootState) => state.users.error;
export const getUserById = (userId?: string) => (state: RootState) => {
  if (userId) {
    const foundUser = state.users.users[userId];
    return foundUser || null;
  }
  return null;
};

export default usersSlice.reducer;
