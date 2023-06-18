<?php

namespace App\Http\Controllers;

use App\Models\RenderQuery;
use Illuminate\Http\Request;
use App\Models\Building;
use App\Models\CityObject;

class RenderQueryController extends Controller
{
    protected static $filter_params = [
        "school" => [
            "color" => "#0066cc",
            "distance" => 800
        ],
        "clinic" => [
            "color" => "#ff007f",
            "distance" => 1500
        ],
        "hospital" => [
            "color" => "#00cc00",
            "distance" => 2500
        ],
        "general" => [
            "color" => "#fffade",
            "distance" => 50000
        ]
    ];

    protected static $LON2KM = 78.8;
    protected static $LAT2KM = 111;

    public static function get_color($target_color, $max_dist, $real_dist) {
        list($base_r, $base_g, $base_b) = sscanf(self::$filter_params['general']['color'], "#%02x%02x%02x");
        list($target_r, $target_g, $target_b) = sscanf($target_color, "#%02x%02x%02x");

        $real_r = ($base_r - $target_r)*($real_dist/$max_dist) + $target_r;
        $real_g = ($base_g - $target_g)*($real_dist/$max_dist) + $target_g;
        $real_b = ($base_b - $target_b)*($real_dist/$max_dist) + $target_b;

        $real_color = sprintf("#%02x%02x%02x", min(255,$real_r), min(255,$real_g), min(255,$real_b));

        return $real_color;
    }

    public static function get_dist_from_filter_meter($lat, $lon, $filters, $include_planning)
    {
        $obj = CityObject::where('type', $filters[0])->where('planning', '<=', $include_planning)
        ->orderByRaw('(1000*latitude-1000*?)*(1000*latitude-1000*?) + (1000*longitude-1000*?)*(1000*longitude-1000*?)', [$lat, $lat, $lon, $lon])->first();
        if (is_null($obj)) {return 100000;}
        return sqrt(pow(($obj->latitude*1000 - $lat*1000)*self::$LAT2KM,2) + pow(($obj->longitude*1000 - $lon*1000)*self::$LON2KM, 2));
    }

    public static function get_citizens_in_cell($lat_min, $lat_max, $lon_min, $lon_max, $include_planning)
    {
        $CITIZENS_PER_FLAT = 3;

        $flats = Building::whereRaw('latitude*1000 between ? and ? and longitude*1000 between ? and ? and planning <= ?', [$lat_min*1000,$lat_max*1000+1,$lon_min*1000,$lon_max*1000+1, $include_planning])->
        where('flats', '>', 0)->sum('flats');

        return $flats*$CITIZENS_PER_FLAT;
    }

    public static function get_aged_buildings($lat_min, $lat_max, $lon_min, $lon_max, $include_planning)
    {
        $constr_year = Building::whereRaw('latitude*1000 between ? and ? and longitude*1000 between ? and ? and planning <= ?', [$lat_min*1000,$lat_max*1000+1,$lon_min*1000,$lon_max*1000+1, $include_planning])->
        where('constr_year', '>', 0)->min('constr_year');

        if ($constr_year == 0) {$constr_year = 2023;}

        return 2023-$constr_year;
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
        $DIVISOR = 50;

        $box_coords = $request->input('box_coords');

        $filters = $request->input('filters');

        if ($request->has('planning')) {
            $include_planning = $request->input('planning');
        } else {
            $include_planning = 0;
        }

        # $query = RenderQuery::findOrFail($request->input('request_id'));

        $lat_min = min($box_coords[0]['latitude'], $box_coords[1]['latitude']);
        $lat_max = max($box_coords[0]['latitude'], $box_coords[1]['latitude']);
        $lon_min = min($box_coords[0]['longitude'], $box_coords[1]['longitude']);
        $lon_max = max($box_coords[0]['longitude'], $box_coords[1]['longitude']);
        
        $lat_delta = $lat_max - $lat_min;
        $lon_delta = $lon_max - $lon_min;
        
        $cell_size = min($lat_delta, $lon_delta)/$DIVISOR;

        $data = array();
        
        for($i = $lat_delta/$cell_size; $i >=0 ; $i--) {
            $row = array();
            for($j = 0; $j < $lon_delta/$cell_size; $j++) {
                $citizens = $this->get_citizens_in_cell(
                    $lat_min + $cell_size*$i,
                    $lat_min + $cell_size*($i+1),
                    $lon_min + $cell_size*$j,
                    $lon_min + $cell_size*($j+1),
                    $include_planning
                );

                $max_age = $this->get_aged_buildings(
                    $lat_min + $cell_size*$i,
                    $lat_min + $cell_size*($i+1),
                    $lon_min + $cell_size*$j,
                    $lon_min + $cell_size*($j+1),
                    $include_planning
                );

                $lat_center = $lat_min + $cell_size/2 + $i*$cell_size;
                $lon_center = $lon_min + $cell_size/2 + $j*$cell_size;

                foreach(self::$filter_params as $filter => $params)
                {
                    $distance = $this->get_dist_from_filter_meter(
                        $lat_center, 
                        $lon_center, 
                        [$filter],
                        $include_planning
                    );
                    
                    $colors[$filter] = $this->get_color(
                        $params["color"], 
                        $params["distance"], 
                        $distance
                    );
                
                    if ($citizens == 0) {
                        $colors[$filter] = self::$filter_params['general']['color'];
                    }
                }

                $cell = array(
                    'latitude' => $lat_min + $cell_size/2 + $i*$cell_size,
                    'longitude' => $lon_min + $cell_size/2 + $j*$cell_size,
                    'citizens' => $citizens,
                    'max_age' => $max_age
                );

                $row[] = array_merge($cell, $colors);
            }
            array_push($data, $row);
        }

        return [
            'data' => $data, 
            'params' => self::$filter_params, 
            'sizes' => [
                'lat_meters' => round($cell_size*self::$LAT2KM*1000),
                'lon_meters' => round($cell_size*self::$LON2KM*1000)
                ]
            ];
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
