import {AnyAction, combineReducers, configureStore} from '@reduxjs/toolkit';

import {userServices} from 'src/services/user';
import type {
    Dependencies,
    Middlewares,
    Reducers,
    RootState
} from './types';

// import { userReducer } from 'src/reduxStore/user/user.slice';
import {userReducer} from 'src/store/user/user.slice';

const dependencies: Dependencies = {
    userServices,
};

const reducers: Reducers = {
    user: userReducer,
};

const rootReducer = combineReducers(reducers);
const store = configureStore<RootState, AnyAction, Middlewares>({
    reducer: rootReducer,
    // eslint-disable-next-line sort-keys
    middleware: (getDefaultMiddleware: any) => getDefaultMiddleware({
        serializableCheck: false,
        thunk: {
            extraArgument: dependencies
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore TODO: исправить
    }).concat([
        // defaultAddress,
        // clearCartFavorite
    ])
});

export {store};
