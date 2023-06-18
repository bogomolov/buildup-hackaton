import { createSlice } from '@reduxjs/toolkit';

import { SliceNames } from 'src/store/enums';
import {
  fetchMapDataAction
} from 'src/store/mapDrawData/mapDrawData.actions';
import {HexagonItem, MapDataState} from './mapDrawData.types';

const initialState: MapDataState = {
    loading: false,
    data: [],
    filter: 'school',
};

const mapDrawDataSlice = createSlice({
  initialState,
  name: SliceNames.MAP,
  reducers: {
      setFilter: (state, {payload}) => {
          state.filter = payload;
      },
      setDataImMapItem: (state, {payload : {x, z, data}}: {payload: {x: number, z: number, data: Partial<HexagonItem>}}) => {
          state.data[x][z] = {
              ...state.data[x][z],
              ...data
          }
          console.log(state.data[x][z])
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
    actions: {setFilter, setDataImMapItem}
} = mapDrawDataSlice;
