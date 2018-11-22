<?php
error_reporting(E_ERROR);
$size = $_GET['s']; //  大小
$name = str_replace(array('../','//'), '', trim($_GET['n']) ); //  原图

$color = $_GET['c'];    //  颜色
$style = $_GET['t'];    //  风格

if( $size ){
    $size = explode(',', $_GET['s'] );
}else{
    $size = array(10,10);
}

if( $color ){
    $color = explode(',', $_GET['c'] );
}else{
    $color = array(200,200,200);
}
$ext = array_pop(explode('.', $name ));
if( !in_array($ext, array('png','jpg','jpeg','gif'))){
    die('err');
}
header("Content-type: image/png"); 
if( $path = realpath(dirname(__FILE__).'/img/'.$name) ){
    echo file_get_contents( $path );
    return false;
}else{
    

    $png = imagecreatetruecolor($size[0], $size[1]);
    imagesavealpha($png, true);

    $trans_colour = imagecolorallocatealpha($png, 0, 0, 0, 127);
    imagefill($png, 0, 0, $trans_colour);

    $red = imagecolorallocate($png, $color[0], $color[1], $color[2]);

    if(  $style == '1' ){
        #   圆形
        imagefilledarc($png, $size[0]/2, $size[1]/2, $size[0]-1, $size[1]-1, 0, 360 , $red, IMG_ARC_PIE);
    }else{
        imagefill($png, 0, 0, $red);
    }

    // if( $_GET['txt'] ){

    //     imagestring($png, 1, 5, 5,  $_GET['txt'] , $text_color);
    // }
    
    
    header("Content-type: image/png");
    imagepng($png);
}