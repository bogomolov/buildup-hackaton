import { createSlice } from '@reduxjs/toolkit';

import { User } from '@app/common/types';
import { DEFAULT_ERROR_MESSAGE } from '@app/constants';
import { showToast } from '@app/helpers/toast';
import { SliceNames } from '@app/store/enums';
import type { PayloadAction } from '@app/store/types';
import {
  fetchCityByNameAction,
  fetchCreateAnonymUserAction,
  fetchGetCityByCoordinateAction,
  fetchLogoutAction,
  fetchPatchUserDataAction,
  fetchSignInAction,
  fetchSignUpAction,
} from '@app/store/user/user.actions';
import type {
  PatchUserAction,
  UserState,
  PatchUserCityAction,
} from '@app/store/user/user.types';

const initialStateUser: User = {
  adverts: false,
  city: '',
  code: '',
  counterpartyId: '',
  dateOfBirth: '',
  discountCard: '',
  email: '',
  firstName: '',
  id: '',
  isAnonym: false,
  isEmailVerified: false,
  lastName: '',
  middleName: '',
  orderNotificationSeen: false,
  phone: '',
  postalCode: '',
  restocking: false,
  sex: '',
  tracking: false,
  anonymId: '',
};

const initialState: UserState = {
  profile: {
    token: '',
    user: initialStateUser,
  },
  loading: false,
};

const userSlice = createSlice({
  initialState,
  name: SliceNames.USER,
  reducers: {
    patchUserAction: (
      state: UserState,
      { payload }: PayloadAction<PatchUserAction>,
    ) => {
      state.profile = {
        ...state.profile,
        token: payload.token || state.profile.token,
        user: {
          ...state.profile.user,
          ...payload.user,
        },
      };
    },
    patchUserCityAction: (
      state: UserState,
      { payload }: PayloadAction<PatchUserCityAction>,
    ) => {
      state.profile = {
        ...state.profile,
        user: {
          ...state.profile.user,
          city: payload.city,
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSignInAction.fulfilled, (state, { payload }) => {
        state.profile = {
          ...state.profile,
          ...payload,
        };

        state.loading = false;
      })

      .addCase(fetchSignUpAction.fulfilled, (state, { payload }) => {
        state.profile = {
          ...state.profile,
          ...payload,
        };
        state.loading = false;
      })
      .addCase(fetchSignUpAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchSignUpAction.rejected,
        (state, { error: { message = DEFAULT_ERROR_MESSAGE } }) => {
          showToast({ text: message });
          state.loading = false;
        },
      )

      .addCase(
        fetchGetCityByCoordinateAction.fulfilled,
        (state, { payload: city }) => {
          state.profile.user.city = city || '';
          state.loading = false;
        },
      )
      .addCase(fetchGetCityByCoordinateAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchGetCityByCoordinateAction.rejected,
        (state, { error: { message = DEFAULT_ERROR_MESSAGE } }) => {
          showToast({ text: message });
          state.loading = false;
        },
      )

      .addCase(fetchCreateAnonymUserAction.fulfilled, (state, { payload }) => {
        state.profile = {
          ...state.profile,
          ...payload,
        };
        state.loading = false;
      })
      .addCase(fetchCreateAnonymUserAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchCreateAnonymUserAction.rejected,
        (state, { error: { message = DEFAULT_ERROR_MESSAGE } }) => {
          showToast({ text: message });
          state.loading = false;
        },
      )
      .addCase(
        fetchPatchUserDataAction.fulfilled,
        (state, { payload: user }) => {
          state.profile.user = user;
          state.loading = false;
        },
      )
      .addCase(fetchLogoutAction.fulfilled, (state) => {
        showToast({ text: 'Выход успешен' });
        state.profile.token = '';
        state.profile.user = initialStateUser;
      })
      .addCase(fetchLogoutAction.rejected, (state) => {
        showToast({ text: 'Выход успешен' });
        state.profile.token = '';
        state.profile.user = initialStateUser;
      })

      .addCase(fetchCityByNameAction.fulfilled, (state, { payload }) => {
        state.profile.user.postalCode = payload.suggestions[0].data.postalCode;
        state.loading = false;
      })
      .addCase(fetchCityByNameAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchCityByNameAction.rejected,
        (state, { error: { message = DEFAULT_ERROR_MESSAGE } }) => {
          showToast({ text: message });
          state.loading = false;
        },
      );
  },
});

export const {
  reducer: userReducer,
  actions: { patchUserAction, patchUserCityAction },
} = userSlice;
