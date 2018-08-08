<?php

error_reporting(0);
$img = $_POST['img'];
$img = str_replace('data:image/png;base64,', '', $img);
$img = str_replace(' ', '+', $img);
$data = base64_decode($img);


$query_data['content'] = $data;

$query_data['name'] = date('Y-m-d').'_'.uniqid().'.png';
$query_data['ext'] = 'png';
$query_data['type'] = 'image/png';
$query_data['origin'] = 'http://ue.baidu.com';
$query_data['key'] = '854rYTHDTA(S&^T9';

$context = stream_context_create(array(
    'http' => array(
        'method'  => 'POST',
        'header'  => "Content-type: application/x-www-form-urlencoded",
        'content' => http_build_query($query_data),
        'timeout' => 600
    )
));

$url = 'http://file.ue.baidu.com/?r=mfs/putWithPostContent';

$results = file_get_contents($url, false, $context);
// ---


$info = array(
    "originalName" => $file["name"],
    "name" => $fullName,
    "url" => $results,
    "size" => 0,
    "type" => $type,
    "state" => 'SUCCESS'
);

/**
 * 返回数据
 */
if ($callback) {
    echo '<script>' . $callback . '(' . json_encode($info) . ')</script>';
} else {
    echo json_encode($info);
}


