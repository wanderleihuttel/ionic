<?php

namespace App\Exceptions;

/**
 * Class Forbidden
 * @package App\Exceptions
 */
class Forbidden extends HttpError
{
    protected $status = 403;
}
