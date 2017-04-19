<?php

namespace App\Http;

use \DRouter\Route as HttpRoute;

/**
 * Class Route
 * @package App\Http
 */
class Route extends HttpRoute
{
    /**
     * @var array
     */
    private $options;

    /**
     * Route constructor.
     * @param $pattern
     * @param $callable
     * @param array $conditions
     * @param array $options
     */
    public function __construct($pattern, $callable, array $conditions, array $options)
    {
        parent::__construct($pattern, $callable, $conditions);

        $this->options = $options;
    }

    /**
     * @return array
     */
    public function getOptions()
    {
        return $this->options;
    }

    /**
     * @param $options
     * @return $this
     */
    public function setOptions($options)
    {
        $this->options = $options;
        return $this;
    }
}
