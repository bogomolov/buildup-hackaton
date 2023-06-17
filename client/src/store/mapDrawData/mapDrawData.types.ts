type HexagonItem = {
  "latitude": number,
  "longitude": number,
  "citizens": 0,
  "color": string
}

type FetchMapData = [HexagonItem[]]

type MapDataState = {
  data: FetchMapData | [];
  loading: boolean;
}


export type {
  FetchMapData,
  HexagonItem,
  MapDataState
};
