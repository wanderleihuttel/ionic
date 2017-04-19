<?php

// show all errors
session_start();

error_reporting(E_ALL);

// system settings
ini_set('display_errors', 'On');
ini_set('log_errors', 'On');
ini_set('track_errors', 'Off');
ini_set('html_errors', 'Off');

// native types
const TYPE_BOOLEAN = 'boolean';
const TYPE_INTEGER = 'integer';
const TYPE_FLOAT = 'float';
const TYPE_STRING = 'string';
const TYPE_ARRAY = 'array';
const TYPE_OBJECT = 'object';
const TYPE_RESOURCE = 'resource';
const TYPE_NULL = 'null';
const TYPE_UNKNOWN_TYPE = 'unknown type';

// custom types
const TYPE_DATE = 'date';

define('DIR_SESSION', dirname(__DIR__) . '/storage/session');
