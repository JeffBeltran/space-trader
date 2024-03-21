<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Http;

class SystemWaypointController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(string $systemSymbol, Request $request)
    {

        $agentToken = optional($request->user()->activeAgent)->token;

        $response = Http::withToken(Crypt::decryptString($agentToken))
            ->withUrlParameters([
                'systemSymbol' => $systemSymbol,
            ])->withQueryParameters([
                'traits' => $request->query('traits'),
                'page' => $request->query('page'),
                'limit' => $request->query('limit'),
                'type' => $request->query('type'),
            ])->get('https://api.spacetraders.io/v2/systems/{systemSymbol}/waypoints');

        return $response->json();
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
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
