import { useAppSelector } from 'src/store/hooks/useAppSelector';

const useUserLoading = () => useAppSelector(({ user: { loading } }) => loading);

const useGetProfile = () => useAppSelector(({ user: { profile } }) => profile);

const useGetUserId = () =>
  useAppSelector(
    ({
      user: {
        profile: {id},
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


export {
  useGetToken,
  useGetProfile,
  useUserLoading,
  useGetUserId,
};
