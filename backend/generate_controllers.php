<?php
$controllers = [
    'PageController' => 'Page',
    'CategoryController' => 'Category',
    'WorkShowcaseController' => 'WorkShowcase',
    'MenuController' => 'Menu',
    'SectionController' => 'Section',
    'WidgetController' => 'Widget',
    'MediaController' => 'Media',
    'ContactController' => 'ContactMessage',
];

foreach ($controllers as $controller => $model) {
    $path = __DIR__ . '/app/Http/Controllers/Api/' . $controller . '.php';
    $content = <<<PHP
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\\$model;
use Illuminate\Http\Request;

class $controller extends Controller
{
    public function index()
    {
        \$items = $model::latest()->paginate(10);
        return \$this->successResponse(\$items);
    }

    public function store(Request \$request)
    {
        \$data = \$request->all();
        \$item = $model::create(\$data);
        return \$this->successResponse(\$item, 'Created successfully', 201);
    }

    public function show(\$id)
    {
        \$item = $model::findOrFail(\$id);
        return \$this->successResponse(\$item);
    }

    public function update(Request \$request, \$id)
    {
        \$item = $model::findOrFail(\$id);
        \$item->update(\$request->all());
        return \$this->successResponse(\$item, 'Updated successfully');
    }

    public function destroy(\$id)
    {
        \$item = $model::findOrFail(\$id);
        \$item->delete();
        return \$this->successResponse(null, 'Deleted successfully');
    }
}
PHP;
    file_put_contents($path, $content);
}

// Special overrides
file_put_contents(__DIR__ . '/app/Http/Controllers/Api/DashboardController.php', <<<PHP
<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Page;
use App\Models\ContactMessage;
use App\Models\WorkShowcase;

class DashboardController extends Controller
{
    public function stats()
    {
        return \$this->successResponse([
            'pages' => Page::count(),
            'messages' => ContactMessage::count(),
            'showcases' => WorkShowcase::count(),
            'unread_messages' => ContactMessage::where('is_read', false)->count()
        ]);
    }
}
PHP);

echo "Controllers generated.";
