<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreAgentRequest;
use App\Http\Requests\UpdateAgentRequest;
use App\Models\Agent;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class AgentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $response = Http::get('https://api.spacetraders.io/v2/agents');

        return Inertia::render('Agents/Index', [
            'listAgents' => $response->json(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $response = Http::get('https://api.spacetraders.io/v2/factions', [
            'limit' => 20
        ]);

        return Inertia::render('Agents/Create', [
            'listFactions' => $response->json(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAgentRequest $request)
    {
        $response = Http::post('https://api.spacetraders.io/v2/register', [
            'faction' => $request->faction,
            'symbol' => $request->symbol,
            'email' => $request->email,
        ]);

        if ($response->clientError()) {
            $errorResponse = $response->collect('error.data');
            $errorMessage = $response->json('error.message');

            // map the error response to match the laravel validation error message
            $errors = $errorResponse->mapWithKeys(function ($error, $key) use ($errorMessage) {
                // if agent symbol is already taken we want to transform
                // the error message to match the validation error message
                if ($key === 'agentSymbol') {
                    return ['symbol' => $errorMessage];
                }
                return $error[0];
            })->toArray();

            throw \Illuminate\Validation\ValidationException::withMessages($errors);
        }

        $agent = new Agent;
        $agent->user_id = auth()->id();
        $agent->account_id = $response->json('data.agent.accountId');
        $agent->symbol = $response->json('data.agent.symbol');
        $agent->token = $response->json('data.token');
        $agent->save();

        return redirect()->route('agents.show', ['agent' => $agent->symbol]);
    }

    /**
     * Display the specified resource.
     */
    public function show($agentSymbol)
    {
        $response = Http::withUrlParameters([
            'agentSymbol' => $agentSymbol,
        ])->get("https://api.spacetraders.io/v2/agents/{agentSymbol}");

        return Inertia::render('Agents/Show', [
            'agentDetails' => $response->json(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Agent $agent)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAgentRequest $request, Agent $agent)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Agent $agent)
    {
        //
    }
}
