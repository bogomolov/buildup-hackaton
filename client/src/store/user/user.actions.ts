import { createAsyncThunk } from '@reduxjs/toolkit';
import {SliceNames} from "src/store/enums";

import {ThunkAsyncConfig} from 'src/store/types';

import type {
    FetchUserRequset,
    FetchUserResponse,
    SignInUserRequest,
    SignInUserResponse,
} from './user.types';

const fetchSignInAction = createAsyncThunk<
    SignInUserResponse,
    SignInUserRequest,
    ThunkAsyncConfig
>(
    `${SliceNames.USER}/fetchSignInAction`,
    async (
        signInRequestBody,
        {
            extra: {
                userServices: { signInUserService },
            },
        },
    ) => {
        try {
            return await signInUserService(signInRequestBody);

        } catch (error) {
            return Promise.reject(error);
        }
    },
);

const fetchUserAction = createAsyncThunk<
    FetchUserResponse,
    FetchUserRequset,
    ThunkAsyncConfig
>(
    `${SliceNames.USER}/fetchUserAction`,
    async (
        fetchUsrRequestBody,
        {
            extra: {
                userServices: { fetchUserService },
            },
        },
    ) => {
        try {
            return await fetchUserService(fetchUsrRequestBody);

        } catch (error) {
            return Promise.reject(error);
        }
    },
);



export {
    fetchSignInAction,
    fetchUserAction
};
