<?php

namespace App\Http\Controllers;

use App\Models\RenderQuery;
use Illuminate\Http\Request;

class RenderQueryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $requests = RenderQuery::where('user_id', Auth::user()->id)->orderBy('updated_at', 'desc');
        return $requests;
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
