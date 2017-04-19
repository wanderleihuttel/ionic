<?php

/**
 * @param $index
 * @param int $filter
 * @param null $options
 * @return mixed
 */
function get($index, $filter = null, $options = null)
{
    if (!$filter) {
        $filter = FILTER_SANITIZE_STRING;
    }
    return filter_input(INPUT_GET, $index, $filter, $options);
}

/**
 * @param $index
 * @param int $filter
 * @param null $options
 * @return mixed
 */
function post($index, $filter = null, $options = null)
{
    if (!$filter) {
        $filter = FILTER_SANITIZE_STRING;
    }
    return filter_input(INPUT_POST, $index, $filter, $options);
}

/**
 * @return string
 */
function guid()
{
    return sprintf('%04X%04X-%04X-%04X-%04X-%04X%04X%04X',
        mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(16384, 20479),
        mt_rand(32768, 49151), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535));
}
