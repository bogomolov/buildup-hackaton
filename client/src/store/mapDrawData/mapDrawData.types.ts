type HexagonItem = {
  latitude: number,
  longitude: number,
  citizens: 0,
  school: string,
  clinic: string,
  hospital: string;
}

type FetchMapData = {
  data: [HexagonItem[]]
  params: {
    school: {
      color: string;
      distance: number;
    };
    clinic: {
      color: string;
      distance: number;
    };
    hospital: {
      color: string;
      distance: number;
    };
    general: {
      color: string;
      distance: number;
    }
  }
  sizes: {
    lat_meters: number;
    lon_meters: number
  }
}

type MapDataState = {
  filter : 'school' | 'clinic' | 'hospital';
  data: [HexagonItem[]] | [];
  sizes: {
    lat_meters: number;
    lon_meters: number
  };
  params: {
    school: {
      color: string;
      distance: number;
    };
    clinic: {
      color: string;
      distance: number;
    };
    hospital: {
      color: string;
      distance: number;
    };
    general: {
      color: string;
      distance: number;
    }
  };
  loading: boolean;
}


export type {
  FetchMapData,
  HexagonItem,
  MapDataState
};
