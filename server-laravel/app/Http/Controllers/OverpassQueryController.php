<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\OverpassQuery;
use Illuminate\Support\Facades\Auth;

class OverpassQueryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $overpasses = OverpassQuery::all();
        return $overpasses;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(OverpassQuery $overpassQuery)
    {
        return $overpassQuery;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, OverpassQuery $overpassQuery)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(OverpassQuery $overpassQuery)
    {
        //
    }

}
