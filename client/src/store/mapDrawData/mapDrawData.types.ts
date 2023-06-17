type HexagonItem = {
  'latitude': number,
  'longitude': number,
  'citizens': 0,
  'colors': {
    school: string,
    clinic: string,
    hospital: string
  }
}

type FetchMapData = [HexagonItem[]]

type MapDataState = {
  'filter' : 'school' | 'clinic' | 'hospital';
  data: FetchMapData | [];
  loading: boolean;
}


export type {
  FetchMapData,
  HexagonItem,
  MapDataState
};
