import type {
    AnyAction,
    Dispatch,
    PayloadAction as ReduxPayloadAction,
    Reducer,
    SliceCaseReducers,
    ThunkDispatch,
} from '@reduxjs/toolkit';
import { ThunkMiddlewareFor } from '@reduxjs/toolkit/dist/getDefaultMiddleware';
import {userServices} from 'src/services/user';
import {UserState} from "../user/user.types";
import {mapDataServices} from "../../services/mapDrawData";
import {MapDataState} from "../mapDrawData/mapDrawData.types";

type PayloadAction<T> = ReduxPayloadAction<T>;

type SliceReducer<T> = SliceCaseReducers<T>;

type Dependencies = {
    userServices: typeof userServices;
    mapDataServices: typeof mapDataServices;
};

type AppDispatch = Dispatch & ThunkDispatch<RootState, Dependencies, AnyAction>;

type ThunkAsyncConfig = {
    extra: Dependencies;
    state: RootState;
    dispatch: AppDispatch;
};

type RootState = {
    user: UserState;
    mapData: MapDataState;
};

type ThunkMiddlewareOptions = {
    thunk: {
        extraArgument: Dependencies;
    };
};

type Middlewares = ThunkMiddlewareFor<RootState, ThunkMiddlewareOptions>[];

type MainState = Omit<RootState, '_persist'>;

type Reducers = { [K in keyof MainState]: Reducer<MainState[K], AnyAction> };

export type {
    ThunkAsyncConfig,
    SliceReducer,
    PayloadAction,
    RootState,
    Dependencies,
    Middlewares,
    AppDispatch,
    Reducers,
};
