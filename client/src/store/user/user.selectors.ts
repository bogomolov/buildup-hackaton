import { useAppSelector } from '@app/store/hooks/useAppSelector';

const useUserLoading = () => useAppSelector(({ user: { loading } }) => loading);

const useGetProfile = () => useAppSelector(({ user: { profile } }) => profile);

const useIsAnonymUser = () =>
  useAppSelector(
    ({
      user: {
        profile: {
          user: { isAnonym },
        },
      },
    }) => isAnonym,
  );

const useGetUserId = () =>
  useAppSelector(
    ({
      user: {
        profile: {
          user: { id },
        },
      },
    }) => id,
  );

const useGetToken = () =>
  useAppSelector(
    ({
      user: {
        profile: { token },
      },
    }) => token,
  );

const useUserSelector = () =>
  useAppSelector(
    ({
      user: {
        profile: { user },
      },
    }) => user,
  );

const useUserFIO = () =>
  useAppSelector(
    ({
      user: {
        profile: { user },
      },
    }) => ({
      firstName: user.firstName,
      lastName: user.lastName,
    }),
  );

const useUserCity = () =>
  useAppSelector(
    ({
      user: {
        profile: {
          user: { city },
        },
      },
    }) => city,
  );

const useUserPhone = () =>
  useAppSelector(
    ({
      user: {
        profile: {
          user: { phone },
        },
      },
    }) => phone,
  );

export {
  useGetToken,
  useGetProfile,
  useUserLoading,
  useGetUserId,
  useUserSelector,
  useIsAnonymUser,
  useUserCity,
  useUserFIO,
  useUserPhone,
};
