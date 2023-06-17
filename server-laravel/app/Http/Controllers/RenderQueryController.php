<?php

namespace App\Http\Controllers;

use App\Models\RenderQuery;
use Illuminate\Http\Request;
use App\Models\Building;
use App\Models\CityObject;

class RenderQueryController extends Controller
{
    protected $filter_params = [
        "school" => [
            "color" => "#0066cc",
            "distance" => 500
        ],
        "clinic" => [
            "color" => "#ff007f",
            "distance" => 1500
        ],
        "hospital" => [
            "color" => "#cc0000",
            "distance" => 2500
        ]
    ];

    public static function get_color($target_color, $max_dist, $real_dist) {
        list($base_r, $base_g, $base_b) = sscanf('#fffade', "#%02x%02x%02x");
        list($target_r, $target_g, $target_b) = sscanf($target_color, "#%02x%02x%02x");

        $real_r = ($base_r - $target_r)*($real_dist/$max_dist) + $target_r;
        $real_g = ($base_g - $target_g)*($real_dist/$max_dist) + $target_g;
        $real_b = ($base_b - $target_b)*($real_dist/$max_dist) + $target_b;

        $real_color = sprintf("#%02x%02x%02x", $real_r, $real_g, $real_b);

        return $real_color;
    }

    public static function get_dist_from_filter_meter($lat, $lon, $filters)
    {
        $LON2KM = 78.8;
        $LAT2KM = 111;

        $obj = CityObject::/*whereRaw('(latitude-?)*(latitude-?) + (longitude-?)*(longitude-?)', [$lat, $lat, $lon, $lon])
        ->*/where('type', $filters[0])->orderByRaw('(1000*latitude-1000*?)*(1000*latitude-1000*?) + (1000*longitude-1000*?)*(1000*longitude-1000*?)', [$lat, $lat, $lon, $lon])->first();
        return sqrt(pow(($obj->latitude*1000 - $lat*1000)*$LAT2KM,2) + pow(($obj->longitude*1000 - $lon*1000)*$LON2KM, 2));
    }

    public static function get_citizens_in_cell($lat_min, $lat_max, $lon_min, $lon_max)
    {
        $CITIZENS_PER_FLAT = 3;

        $flats = Building::whereRaw('latitude*1000 between ? and ? and longitude*1000 between ? and ?', [$lat_min*1000,$lat_max*1000+1,$lon_min*1000,$lon_max*1000+1])->
        where('flats', '>', 0)->sum('flats');

        return $flats*$CITIZENS_PER_FLAT;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $requests = RenderQuery::where('user_id', Auth::user()->id)->orderBy('updated_at', 'desc');
        return $requests;
    }

    public function query(Request $request)
    {
        /* На какое число делить короткую сторону */
        $DIVISOR = 20;

        $box_coords = $request->input('box_coords');

        $filters = $request->input('filters');

        # $query = RenderQuery::findOrFail($request->input('request_id'));

        $lat_min = min($box_coords[0]['latitude'], $box_coords[1]['latitude']);
        $lat_max = max($box_coords[0]['latitude'], $box_coords[1]['latitude']);
        $lon_min = min($box_coords[0]['longitude'], $box_coords[1]['longitude']);
        $lon_max = max($box_coords[0]['longitude'], $box_coords[1]['longitude']);
        
        $lat_delta = $lat_max - $lat_min;
        $lon_delta = $lon_max - $lon_min;
        
        $cell_size = min($lat_delta, $lon_delta)/$DIVISOR;

        $result = array();
        
        for($i = 0; $i < $lat_delta/$cell_size; $i++) {
            $row = array();
            for($j = 0; $j < $lon_delta/$cell_size; $j++) {
                $lat_center = $lat_min + $cell_size/2 + $i*$cell_size;
                $lon_center = $lon_min + $cell_size/2 + $j*$cell_size;

                $distance = $this->get_dist_from_filter_meter(
                    $lat_center, 
                    $lon_center, 
                    $filters
                );
                $color = $this->get_color(
                    $filter_params[$filters[0]]["color"], 
                    $filter_params[$filters[0]]["distance"], 
                    $distance
                );

                $row[] = array(
                    'latitude' => $lat_min + $cell_size/2 + $i*$cell_size,
                    'longitude' => $lon_min + $cell_size/2 + $j*$cell_size,
                    'citizens' => $this->get_citizens_in_cell(
                        $lat_min + $cell_size*$i,
                        $lat_min + $cell_size*($i+1),
                        $lon_min + $cell_size*$i,
                        $lon_min + $cell_size*($i+1)
                    ),
                    'color' => $color
                );
            }
            array_push($result, $row);
        }

        return $result;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        /*
        верхний левый и нижний правый углы:
        box_coords = [ 
            {"latitude": 44.6731393, "longitude": 37.7876269},
            {"latitude": 44.9731393, "longitude": 37.9876269},
        ]

        фильтры:
        filters = ["clinic", "hospital"]
        */
        $request = RenderQuery::create([
            'user_id' => Auth::user()->id,
            'box_coords' => $request->input('box_coords'),
            'filters' => $request->input('filters'),
            'status' => 'registered'
        ]);
        $request->save();
        return $request;
    }

    /**
     * Display the specified resource.
     */
    public function show(RenderQuery $renderQuery)
    {
        return $renderQuery;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, RenderQuery $renderQuery)
    {
        $renderQuery->update([
            'box_coords' => $request->input('box_coords'),
            'filters' => $request->input('filters'),
            'status' => $request->input('status')
        ]);
        $renderQuery->save();
        return $renderQuery;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RenderQuery $renderQuery)
    {
        $renderQuery->delete();
    }
}
