import { useAppSelector } from 'src/store/hooks/useAppSelector';

const useMapDataLoading = () => useAppSelector(({ mapData: { loading } }) => loading);

const useMapData = () => useAppSelector(({ mapData: { data } }) => data);


export {
    useMapDataLoading,
    useMapData,
};
