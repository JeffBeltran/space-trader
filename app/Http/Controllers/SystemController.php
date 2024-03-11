<?php

namespace App\Http\Controllers;

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

        $response = Http::withToken(Crypt::decryptString($agentToken))->withUrlParameters([
            'systemSymbol' => $systemSymbol,
        ])->get('https://api.spacetraders.io/v2/systems/{systemSymbol}');

        return Inertia::render('Systems/Show', [
            'systemDetails' => $response->json('data'),
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
