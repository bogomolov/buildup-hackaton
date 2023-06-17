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

const useToken = () =>
  useAppSelector(
    ({
      user: {
        profile: { token },
      },
    }) => token,
  );


export {
  useToken,
  useGetProfile,
  useUserLoading,
  useGetUserId,
};
