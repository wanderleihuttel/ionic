<?php

use App\Http\Handler;

$path = dirname(__DIR__);

require $path . '/vendor/autoload.php';

$app = new Handler($path);

$app->start()->run();
