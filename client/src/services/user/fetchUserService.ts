import { endpoints } from 'src/endpoints';
import { axiosInstance as axios } from 'src/services/api';
import type {FetchUserRequset, FetchUserResponse} from 'src/store/user/user.types';

const {
    user: { user: userURL },
} = endpoints;

const fetchUserService = async (userToken: FetchUserRequset): Promise<FetchUserResponse> => {
    try {
        const { data } = await axios.get<FetchUserResponse>(userURL, {
            headers: {
                'Authorization': userToken.token
            }
        });
        return data
    } catch (error) {
        return Promise.reject(error);
    }
};

export { fetchUserService };
