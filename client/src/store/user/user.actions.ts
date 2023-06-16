import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosResponse } from 'axios';

import {
  patchUserAction,
  patchUserCityAction,
} from './user.slice';
import type {
  FetchCreateAnonymUserResponse,
  FetchGetCityByCoordinateRequest,
  FetchSignInRequest,
  FetchSignInResponse,
  FetchSignUpRequest,
  FetchSignUpResponse,
  PatchUserRequestProps,
  User,
} from './user.types';

const fetchSignInAction = createAsyncThunk<
  FetchSignInResponse,
  FetchSignInRequest,
  ThunkAsyncConfig
>(
  `${SliceNames.USER}/fetchSignInAction`,
  async (
    signInRequestBody,
    {
      extra: {
        authServices: { fetchSignInService },
      },
      dispatch,
    },
  ) => {
    try {
      const userData = await fetchSignInService(signInRequestBody);
      dispatch(patchUserAction({ user: userData.user, token: userData.token }));

      return userData;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      const route = navigationRef.current?.getCurrentRoute();

      const params = route?.params as Record<string, unknown>;

      if (params.path) {
        if (params.path === 'CheckoutOrderStack') {
          navigationRef?.current?.reset({
            routes: [{ name: params.path as string }],
          });
        } else {
          navigationRef?.current?.reset({
            routes: [
              {
                name: 'Tabs',
                state: { routes: [{ name: params.path as string }] },
              },
            ],
          });
        }
      }
    }
  },
);

const fetchSignUpAction = createAsyncThunk<
  FetchSignUpResponse,
  FetchSignUpRequest,
  ThunkAsyncConfig
>(
  `${SliceNames.USER}/fetchSignUpAction`,
  async (
    signUpRequestBody,
    {
      extra: {
        authServices: { fetchSignUpService },
      },
      getState,
      dispatch,
    },
  ) => {
    const {
      user: {
        profile: { user },
      },
    } = getState();
    try {
      const signUpData = await fetchSignUpService(signUpRequestBody);

      dispatch(
        patchUserAction({ user: signUpData.user, token: signUpData.token }),
      );

      dispatch(
        fetchPatchUserDataAction({
          firstName: signUpData.user.firstName,
          lastName: signUpData.user.lastName,
          adverts: user.adverts,
          city: user.city,
          restocking: user.restocking,
          tracking: user.tracking,
        }),
      );

      if (!signUpData.token) {
        return Promise.reject(new Error('Error'));
      }

      return signUpData;
    } catch (error) {
      const response = (error as AxiosError).response as AxiosResponse<{
        detail?: string;
      }>;

      const detailError =
        (axios.isAxiosError(error)
          ? response?.data?.detail
          : (error as Error).message) || DEFAULT_ERROR_MESSAGE;

      return Promise.reject(new Error(detailError));
    } finally {
      const route = navigationRef.current?.getCurrentRoute();

      const params = route?.params as Record<string, unknown>;

      if (params.path) {
        if (params.path === 'CheckoutOrderStack') {
          navigationRef?.current?.reset({
            routes: [
              {
                name: 'Tabs',
                state: {
                  routes: [
                    {
                      name: 'CartTab',
                    },
                  ],
                },
              },
              {
                name: 'CheckoutOrderStack',
              },
            ],
          });
        } else {
          navigationRef?.current?.reset({
            routes: [
              {
                name: 'Tabs',
                state: {
                  routes: [
                    {
                      name: params.path as string,
                    },
                  ],
                },
              },
            ],
          });
        }
      }
    }
  },
);

const fetchGetCityByCoordinateAction = createAsyncThunk<
  string,
  FetchGetCityByCoordinateRequest,
  ThunkAsyncConfig
>(
  `${SliceNames.USER}/fetchGetCityByCoordinateAction`,
  async (
    cityByCoordinateRequestActionBody,
    {
      extra: {
        authServices: { fetchCityByCoordinateService },
      },
    },
  ) => {
    try {
      const cityResponse = await fetchCityByCoordinateService(
        cityByCoordinateRequestActionBody,
      );

      if (cityResponse.length) {
        return cityResponse[0].data.city || '';
      }

      return '';
    } catch (error) {
      return Promise.reject(error);
    }
  },
);

const fetchCreateAnonymUserAction = createAsyncThunk<
  FetchCreateAnonymUserResponse,
  void,
  ThunkAsyncConfig
>(
  `${SliceNames.USER}/fetchCreateAnonymUserAction`,
  async (
    _,
    {
      extra: {
        authServices: { fetchCreateAnonymUserService },
      },
    },
  ) => await fetchCreateAnonymUserService(),
);

const fetchPatchUserDataAction = createAsyncThunk<
  User,
  PatchUserRequestProps['userData'],
  ThunkAsyncConfig
>(
  `${SliceNames.USER}/fetchPatchUserDataAction`,
  async (
    userData,
    {
      extra: {
        userServices: { patchUserService },
      },
      getState,
    },
  ) => {
    try {
      const {
        user: {
          profile: {
            user: { id: userId },
          },
        },
      } = getState();

      return await patchUserService({
        userId,
        userData,
      });
    } catch (error) {
      return Promise.reject(error);
    }
  },
);

const fetchLogoutAction = createAsyncThunk<void, void, ThunkAsyncConfig>(
  `${SliceNames.USER}/fetchLogoutAction`,
  async (
    _,
    {
      extra: {
        authServices: { fetchLogoutService },
      },
    },
  ) => await fetchLogoutService(),
);

const fetchCityByNameAction = createAsyncThunk<
  ResponseCityByName,
  RequestCityByName,
  ThunkAsyncConfig
>(
  `${SliceNames.USER}/fetchCityByNameAction`,

  async (
    cityQuery,
    {
      extra: {
        addressesServices: { fetchCityByNameService },
      },
    },
  ) => await fetchCityByNameService(cityQuery),
);

export {
  fetchSignInAction,
  fetchSignUpAction,
  fetchGetCityByCoordinateAction,
  fetchCreateAnonymUserAction,
  fetchLogoutAction,
  patchUserAction,
  patchUserCityAction,
  fetchPatchUserDataAction,
  fetchCityByNameAction,
};
