import {AnyAction, combineReducers, configureStore} from '@reduxjs/toolkit';

import {userServices} from 'src/services/user';
import {mapDataServices} from 'src/services/mapDrawData';
import type {
    Dependencies,
    Middlewares,
    Reducers,
    RootState
} from './types';

import {userReducer} from 'src/store/user/user.slice';
import {mapDataReducer} from "./mapDrawData/mapDrawData.slice";

const dependencies: Dependencies = {
    userServices,
    mapDataServices
};

const reducers: Reducers = {
    user: userReducer,
    mapData: mapDataReducer
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
