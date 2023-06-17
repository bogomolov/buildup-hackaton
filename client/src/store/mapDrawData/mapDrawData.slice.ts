import { createSlice } from '@reduxjs/toolkit';

import { SliceNames } from 'src/store/enums';
import {
  fetchMapDataAction
} from 'src/store/mapDrawData/mapDrawData.actions';
import {MapDataState} from "./mapDrawData.types";

const initialState: MapDataState = {
    loading: false,
    data: []
};

const mapDrawDataSlice = createSlice({
  initialState,
  name: SliceNames.MAP,
  reducers: {
      printData: () => {
          console.log(1);
      }
  },
  extraReducers: (builder) => {
    builder
        .addCase(fetchMapDataAction.fulfilled, (state, { payload }) => {
          state.data = payload;
          state.loading = false;
        })
        .addCase(fetchMapDataAction.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchMapDataAction.rejected, (state) => {
          state.loading = false;
        })
    },
});

export const {
    reducer: mapDataReducer,
    actions: {printData}
} = mapDrawDataSlice;
