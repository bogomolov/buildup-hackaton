import { endpoints } from 'src/endpoints';
import { axiosInstance as axios } from 'src/services/api';
import type {FetchMapData} from 'src/store/mapDrawData/mapDrawData.types';

const {
    map: { getMapData: getMapDataURL },
} = endpoints;

const fetchMapDataService = async (): Promise<FetchMapData> => {
    try {
        const { data } = await axios.get<FetchMapData>(getMapDataURL);
        return data
    } catch (error) {
        return Promise.reject(error);
    }
};

export { fetchMapDataService };
