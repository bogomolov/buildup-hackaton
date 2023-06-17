import {fetchMapDataService} from 'src/services/mapDrawData/fetchMapDrawData';

class MapDataServices {
    fetchMapDataService = () => fetchMapDataService();
}

const mapDataServices = new MapDataServices();

export { mapDataServices };
