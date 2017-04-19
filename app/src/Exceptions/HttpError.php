<?php

namespace App\Exceptions;

use Exception;

/**
 * Class Forbidden
 * @package App\Exceptions
 */
class HttpError extends Exception
{
    /**
     * @var int
     */
    protected $status = 500;

    /**
     * @return int
     */
    public function getStatus()
    {
        return $this->status;
    }
}
