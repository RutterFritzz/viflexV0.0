<?php

namespace App\Http\Controllers;

use App\Category;
use App\Models\Referee;
use App\Http\Requests\Referee\StoreRefereeRequest;
use App\Http\Requests\Referee\UpdateRefereeRequest;
use Inertia\Inertia;

class RefereeController extends Controller
{
    public function index()
    {
        $referees = Referee::with('user')->get();
        return Inertia::render('Referee/index', compact('referees'));
    }

    public function show(Referee $referee)
    {
        $referee->load('user');
        return Inertia::render('Referee/show', compact('referee'));
    }
    public function create()
    {
        return Inertia::render('Referee/create', [
            'categories' => Category::cases(),
        ]);
    }

    public function store(StoreRefereeRequest $request)
    {
        $validated = $request->validated();
        Referee::create($validated);
        return redirect()->route('referee.index');
    }

    public function edit(Referee $referee)
    {
        $referee->load('user');
        return Inertia::render('Referee/edit', [
            'referee' => $referee,
            'categories' => Category::cases(),
        ]);
    }

    public function update(UpdateRefereeRequest $request, Referee $referee)
    {
        $referee->update($request->validated());
        return redirect()->route('referee.index');
    }

    public function destroy(Referee $referee)
    {
        $referee->delete();
        return redirect()->route('referee.index');
    }
}
