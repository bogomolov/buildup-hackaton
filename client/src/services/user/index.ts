import {signInUserService} from 'src/services/user/signInUserService';
import {FetchUserRequset, SignInUserRequest} from 'src/store/user/user.types';
import {fetchUserService} from 'src/services/user/fetchUserService';

class UserServices {
    signInUserService = (data: SignInUserRequest) => signInUserService(data);
    fetchUserService = (userToken: FetchUserRequset) => fetchUserService(userToken);
}

const userServices = new UserServices();

export { userServices };
