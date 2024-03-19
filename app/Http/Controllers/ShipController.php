<?php

namespace App\Http\Controllers;

use Illuminate\Http\Client\Pool;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class ShipController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $agentToken = optional($request->user()->activeAgent)->token;

        $response = Http::withToken(Crypt::decryptString($agentToken))
            ->get('https://api.spacetraders.io/v2/my/ships');

        return Inertia::render('Ships/Index', [
            'listShips' => $response->json(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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
    public function show(string $shipSymbol, Request $request)
    {
        $agentToken = optional($request->user()->activeAgent)->token;

        $responses = Http::pool(fn (Pool $pool) => [
            $pool
                ->withToken(Crypt::decryptString($agentToken))->withUrlParameters([
                    'shipSymbol' => $shipSymbol,
                ])
                ->get('https://api.spacetraders.io/v2/my/ships/{shipSymbol}'),
        ]);

        return Inertia::render('Ships/Show', [
            'shipDetails' => $responses[0]->json(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
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
