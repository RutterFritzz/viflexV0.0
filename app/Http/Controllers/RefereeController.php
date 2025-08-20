<?php

namespace App\Http\Controllers;

use App\Category;
use App\Models\Referee;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RefereeController extends Controller
{
    public function index()
    {
        $referees = Referee::with('user')->get();
        return Inertia::render('Referee/index', [
            'referees' => $referees,
        ]);
    }

    public function show(Referee $referee)
    {
        $referee->load('user');
        return Inertia::render('Referee/show', [
            'referee' => $referee,
        ]);
    }
    public function create()
    {
        return Inertia::render('Referee/create', [
            'categories' => Category::cases(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category' => 'required|string|max:255',
            'user_id' => 'required|exists:users,id',
        ]);
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

    public function update(Request $request, Referee $referee)
    {
        $referee->update($request->validate([
            'category' => 'required|string|max:255',
        ]));
        return redirect()->route('referee.index');
    }

    public function destroy(Referee $referee)
    {
        $referee->delete();
        return redirect()->route('referee.index');
    }
}
