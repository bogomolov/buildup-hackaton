import { createSlice } from '@reduxjs/toolkit';

import { SliceNames } from 'src/store/enums';
import {
  fetchMapDataAction
} from 'src/store/mapDrawData/mapDrawData.actions';
import {MapDataState} from './mapDrawData.types';

const initialState: MapDataState = {
    loading: false,
    data: [],
    filter: 'school',
    sizes: {
        lat_meters: 0,
        lon_meters: 0
    },
    params: {
        clinic: {
            color: '',
            distance: 0,
        },
        school: {
            color: '',
            distance: 0,
        },
        hospital: {
            color: '',
            distance: 0,
        },
        general: {
            color: '',
            distance: 0
        }
    }
};

const mapDrawDataSlice = createSlice({
  initialState,
  name: SliceNames.MAP,
  reducers: {
      setFilter: (state, {payload}) => {
          state.filter = payload;
      },
      addApartments: (state, {payload : {x, z, apartments}}: {payload: {x: number, z: number, apartments: number}}) => {
          state.data[x][z].citizens += apartments + 3;
      },
      setDataImMapItem: (state, {payload : {x, z, changed}}: {payload: {x: number, z: number, changed: 'school' | 'clinic' | 'hospital'}}) => {
          state.data[x][z][changed] = state.params[changed].color;
          const distance = state.params[changed].distance;
          const lon = state.sizes.lon_meters;
          const lat = state.sizes.lat_meters;
          const xDist = Math.round(distance / lon);
          const zDist = Math.round(distance / lat);
          const xCount = xDist;
          const zCount = zDist;
          function hexToRgb(hex:string) {
              const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
              return result ? {
                  r: parseInt(result[1], 16),
                  g: parseInt(result[2], 16),
                  b: parseInt(result[3], 16)
              } : null;
          }
          function componentToHex(c:number) {
              const hex = c.toString(16);
              return hex.length == 1 ? "0" + hex : hex;
          }
          function rgbToHex(r: number, g: number, b: number) {
              return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
          }

          function get_color(target_color: string, max_dist: number, real_dist: number) {
              const rgbBaseList = hexToRgb(state.params['general']['color']);
              const rgbTargetList = hexToRgb(target_color);
                if (!rgbBaseList || !rgbTargetList) {
                    return state.params.general.color
                }
              const real_r = (rgbBaseList.r - rgbTargetList.r) * (real_dist / max_dist) + rgbTargetList.r;
              const real_g = (rgbBaseList.g - rgbTargetList.g) * (real_dist / max_dist) + rgbTargetList.g;
              const real_b = (rgbBaseList.b - rgbTargetList.b) * (real_dist / max_dist) + rgbTargetList.b;

              const real_color = rgbToHex(Math.min(255,Math.floor(real_r)), Math.min(255,Math.floor(real_g)), Math.min(255,Math.floor(real_b)));

              return real_color;
          }

          for (let i = zCount; i >= -(zCount); i--) {
              for (let j = xCount; j >= -(xCount); j--) {
                  const realDist = Math.sqrt(Math.pow((Math.abs(j) + 1) * lon, 2) + Math.pow((Math.abs(i) + 1) * lat, 2));

                  if (!state.data[x - i] || !state.data[x - i][z - j]) {
                      continue
                  }
                  if (state.data[x - i][z - j][changed] > get_color(state.params[changed].color, distance, realDist)) {
                      state.data[x - i][z - j][changed] = get_color(state.params[changed].color, distance, realDist);
                  }
              }
          }
      }
  },
  extraReducers: (builder) => {
    builder
        .addCase(fetchMapDataAction.fulfilled, (state, { payload : {data, params, sizes} }) => {
          if (!state.data.length){
              state.data = data;
          }
          state.params = params;
          state.sizes = sizes;
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
    actions: {
        setFilter,
        setDataImMapItem,
        addApartments
    }
} = mapDrawDataSlice;
