<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$postsFile = __DIR__ . '/posts.json';

// GET: Return all articles
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($postsFile)) {
        echo file_get_contents($postsFile);
    } else {
        echo json_encode([]);
    }
    exit;
}

// POST: Save or Delete an article
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (!$input) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Invalid JSON']);
        exit;
    }

    $existing = file_exists($postsFile) ? json_decode(file_get_contents($postsFile), true) : [];
    if (!is_array($existing)) $existing = [];

    // Delete action
    if (isset($input['action']) && $input['action'] === 'delete') {
        $id = $input['id'];
        $existing = array_values(array_filter($existing, function($a) use ($id) {
            return strval($a['id']) !== strval($id);
        }));
        file_put_contents($postsFile, json_encode($existing, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        echo json_encode(['success' => true, 'articles' => $existing]);
        exit;
    }

    // New post action
    $newArticle = [
        'id' => strval(time()),
        'title' => $input['title'] ?? 'Untitled Article',
        'category' => $input['category'] ?? 'Design & Growth',
        'date' => $input['date'] ?? date('M d, Y'),
        'readTime' => $input['readTime'] ?? '4 min read',
        'author' => $input['author'] ?? 'Elbinmon Edavazhickal',
        'authorRole' => $input['authorRole'] ?? 'Founder & CEO, Epic Adcraft',
        'excerpt' => $input['excerpt'] ?? '',
        'content' => $input['content'] ?? ''
    ];

    array_unshift($existing, $newArticle);
    file_put_contents($postsFile, json_encode($existing, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

    echo json_encode(['success' => true, 'article' => $newArticle]);
    exit;
}
?>