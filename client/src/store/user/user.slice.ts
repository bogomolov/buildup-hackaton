import { createSlice } from '@reduxjs/toolkit';

import { SliceNames } from 'src/store/enums';
import {
  fetchSignInAction, fetchUserAction,
} from 'src/store/user/user.actions';
import type {
  UserState
} from 'src/store/user/user.types';

const initialState: UserState = {
  profile: {
    name: '',
    email: '',
    id: null,
    token: '',
  },
  loading: false,
};

const userSlice = createSlice({
  initialState,
  name: SliceNames.USER,
  reducers: {
    setUser: () => {

    }
  },
  extraReducers: (builder) => {
    builder
        .addCase(fetchSignInAction.fulfilled, (state, { payload }) => {
          state.profile.token = `${payload.token_type} ${payload.access_token}`;
          state.loading = false;
        })
        .addCase(fetchSignInAction.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchSignInAction.rejected, (state) => {
          state.loading = false;
        })
        .addCase(fetchUserAction.fulfilled, (state, { payload }) => {
          state.profile = {
            ...state.profile,
            id: payload.id,
            name: payload.name,
            email: payload.email,
          };
          state.loading = false;
        })
        .addCase(fetchUserAction.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchUserAction.rejected, (state) => {
              state.loading = false;
        })
    },
});

export const {
  reducer: userReducer,
  actions: { setUser },
} = userSlice;
