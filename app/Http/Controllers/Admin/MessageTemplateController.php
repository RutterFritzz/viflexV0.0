<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Http\Requests\MessageTemplate\StoreValidation;
use App\Http\Requests\MessageTemplate\UpdateValidation;

use App\Models\MessageTemplate;

use Inertia\Inertia;

class MessageTemplateController extends Controller
{
    public function index()
    {
        $messageTemplates = MessageTemplate::get();

        return Inertia::render('Admin/MessageTemplates/Index', compact('messageTemplates'));
    }

    public function create()
    {
        return Inertia::render('Admin/MessageTemplates/Create');
    }

    public function store(StoreValidation $request)
    {
        $messageTemplate = new MessageTemplate();

        $messageTemplate->name = $request->name;
        $messageTemplate->subject = $request->subject;
        $messageTemplate->to_name = $request->to_name ?? 'Custom Website';
        $messageTemplate->to_email = $request->to_email ?? 'support@customwebsite.nl';
        $messageTemplate->bcc = $request->bcc ? 1 : 0;
        $messageTemplate->content = $request->content;

        $messageTemplate->save();

        return redirect()->back()->with('success', 'Template succesvol aangemaakt.');
    }

    public function update(UpdateValidation $request, MessageTemplate $messageTemplate)
    {
        $messageTemplate->name = $request->name;
        $messageTemplate->subject = $request->subject;
        $messageTemplate->to_name = $request->to_name ?? 'Custom Website';
        $messageTemplate->to_email = $request->to_email ?? 'support@customwebsite.nl';
        $messageTemplate->bcc = $request->bcc ? 1 : 0;
        $messageTemplate->content = $request->content;

        $messageTemplate->save();

        return redirect()->back()->with('success', 'Template bijgewerkt.');
    }

    public function delete(MessageTemplate $messageTemplate)
    {
        $messageTemplate->delete();

        return redirect()->back()->with('success', 'Template verwijderd.');
    }
}
