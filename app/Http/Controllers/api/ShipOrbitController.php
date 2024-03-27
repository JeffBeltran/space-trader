<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Http;

class ShipOrbitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, string $ship)
    {

        $agentToken = optional($request->user()->activeAgent)->token;

        $response = Http::withToken(Crypt::decryptString($agentToken))
            ->withUrlParameters([
                'shipSymbol' => $ship,
            ])
            ->post('https://api.spacetraders.io/v2/my/ships/{shipSymbol}/orbit');

        return $response->json();
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
