import { endpoints } from 'src/endpoints';
import { axiosInstance as axios } from 'src/services/api';
import type {SignInUserRequest, SignInUserResponse} from 'src/store/user/user.types';

const {
    user: { login: loginURL },
} = endpoints;

const signInUserService = async (userData: SignInUserRequest): Promise<SignInUserResponse> => {
    try {
        const { data } = await axios.post<SignInUserResponse>(loginURL, userData);
        return data
    } catch (error) {
        return Promise.reject(error);
    }
};

export { signInUserService };
