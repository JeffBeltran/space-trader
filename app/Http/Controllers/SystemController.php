<?php

namespace App\Http\Controllers;

use Illuminate\Http\Client\Pool;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class SystemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $agentToken = optional($request->user()->activeAgent)->token;

        $response = Http::withToken(Crypt::decryptString($agentToken))
            ->get('https://api.spacetraders.io/v2/systems');

        return Inertia::render('Systems/Index', [
            'listSystems' => $response->json(),
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
    public function show(string $systemSymbol, Request $request)
    {

        $agentToken = optional($request->user()->activeAgent)->token;

        $responses = Http::pool(fn (Pool $pool) => [
            $pool
                ->withToken(Crypt::decryptString($agentToken))
                ->withUrlParameters([
                    'systemSymbol' => $systemSymbol,
                ])->get('https://api.spacetraders.io/v2/systems/{systemSymbol}'),
            $pool
                ->withToken(Crypt::decryptString($agentToken))
                ->withUrlParameters([
                    'systemSymbol' => $systemSymbol,
                ])->withQueryParameters([
                    'traits' => ['MARKETPLACE', 'SHIPYARD'],
                    'page' => $request->query('page'),
                    // 'limit' => 7,
                ])->get('https://api.spacetraders.io/v2/systems/{systemSymbol}/waypoints'),
        ]);

        $originalWaypoints = collect($responses[0]->json('data.waypoints'));

        $systemMapWaypoints = $originalWaypoints
            ->filter(function ($waypoint) {
                $ignored = ['ASTEROID', 'JUMP_GATE', 'FUEL_STATION', 'ASTEROID_BASE'];

                return ! in_array($waypoint['type'], $ignored);
            })
            ->map(function ($waypoint) use ($originalWaypoints) {
                if (count($waypoint['orbitals']) === 0) {
                    return [
                        ...$waypoint,
                        'orbitals' => [],
                    ];
                }

                return [
                    ...$waypoint,
                    'orbitals' => collect($waypoint['orbitals'])
                        ->map(function ($orbital) use ($originalWaypoints) {
                            return $originalWaypoints->first(function ($originalWaypoint) use ($orbital) {
                                return $originalWaypoint['symbol'] === $orbital['symbol'];
                            });
                        })
                        ->values()
                        ->toArray(),
                ];
            })->values()->toArray();

        return Inertia::render('Systems/Show', [
            'waypoints' => $responses[1]->json(),
            'systemMap' => [
                ...$responses[0]->json('data'),
                'waypoints' => $systemMapWaypoints,
            ],
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
