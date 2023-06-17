<?php

namespace App\Http\Controllers;

use App\Models\RenderResult;
use App\Models\RenderQuery;
use App\Models\Building;
use App\Models\CityObject;
use Illuminate\Http\Request;

class RenderResultController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $results = RenderResult::where('user_id', Auth::user()->id)->orderBy('updated_at', 'desc');
        return $results;
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

    }

    /**
     * Display the specified resource.
     */
    public function show(RenderResult $renderResult)
    {
        return $renderResult;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, RenderResult $renderResult)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RenderResult $renderResult)
    {
        //
    }
}
