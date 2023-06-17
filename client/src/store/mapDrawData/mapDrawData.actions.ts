import { createAsyncThunk } from '@reduxjs/toolkit';
import {SliceNames} from "src/store/enums";

import {ThunkAsyncConfig} from 'src/store/types';

import type {
    FetchMapData
} from './mapDrawData.types';

const fetchMapDataAction = createAsyncThunk<
    FetchMapData,
    null,
    ThunkAsyncConfig
>(
    `${SliceNames.MAP}/fetchMapDataAction`,
    async (
        _,
        {
            extra: {
                mapDataServices: { fetchMapDataService },
            },
        },
    ) => {
        try {
            return await fetchMapDataService();

        } catch (error) {
            return Promise.reject(error);
        }
    },
);

export {
    fetchMapDataAction
};
