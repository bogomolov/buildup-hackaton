<?php

namespace App\Http\Controllers;

use App\Models\RenderQuery;
use Illuminate\Http\Request;
use App\Models\Building;
use App\Models\CityObject;

class RenderQueryController extends Controller
{
    public static function get_citizens_in_cell($lat_min, $lat_max, $lon_min, $lon_max)
    {
        $CITIZENS_PER_FLAT = 3;

        $flats = Building::whereBetween('latitude', [$lat_min, $lat_max])->
            whereBetween('longitude', [$lon_min, $lon_max])->sum('flats');
        
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
        $DIVISOR = 30;

        $box_coords = $request->input('box_coords');

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
                $row[] = array(
                    'latitude' => $lat_min + $cell_size/2 + $i*$cell_size,
                    'longitude' => $lon_min + $cell_size/2 + $j*$cell_size,
                    'citizens' => get_citizens_in_cell(
                        $lat_min + $i*$cell_size,
                        $lat_min + ($i+1)*$cell_size,
                        $lon_min + $i*$cell_size,
                        $lon_min + ($i+1)*$cell_size
                    ),
                    'color' => '#FFDDAA'
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
