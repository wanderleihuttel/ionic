<?php

namespace App\Http;

use DRouter\Container;
use DRouter\Router as HttpRouter;

/**
 * Class Router
 * @package App\Http
 */
class Router extends HttpRouter
{
    /** @noinspection PhpMissingParentCallCommonInspection */
    /**
     * @param string $method
     * @param string $pattern
     * @param callable $callable
     * @param array $options
     * @return $this
     */
    public function route($method, $pattern, $callable, $options)
    {
        $method = strtoupper($method);
        $pattern = $this->validate($pattern);
        if (!is_null($this->routePrefix)) {
            $pattern = $this->routePrefix . $pattern;
        }

        $this->routes[$method][] = new Route($pattern, $callable, [], $options);
        $this->lastRouteMethod = $method;
        return $this;
    }

    /**
     * @param string $path
     * @return bool|string
     */
    private function validate($path)
    {
        $last = strlen($path) - 1;
        if ($path[$last] == '/') {
            $path = substr($path, 0, -1);
        }
        return $path;
    }

    /** @noinspection PhpMissingParentCallCommonInspection */
    /**
     * @param Container $container
     * @param array $middlewares
     * @return mixed
     */
    public function resolve(Container $container, array $middlewares)
    {
        $route = $this->getMatchedRoute();

        /** @var Route $route */
        $callable = $route->getCallable();
        $params = $route->getParams();

        $options = $route->getOptions();
        if (isset($options['before'])) {
            $this->middleware($middlewares, $options['before']);
        }
        if (isset($options['after'])) {
            $this->middleware($middlewares, $options['after']);
        }

        if (is_string($callable) && preg_match('/^[a-zA-Z\d\\\\]+[\:][\w\d]+$/', $callable)) {
            $peaces = explode(':', $callable);
            $controller = filter_var($peaces[0], FILTER_SANITIZE_STRING);
            $method = filter_var($peaces[1], FILTER_SANITIZE_STRING);

            $instance = new $controller($container);
            $callable = [$instance, $method];
        }

        if (!empty($params)) {
            $params = array_values($params);
        }

        if (is_object($callable) || (is_string($callable) && is_callable($callable))) {
            $params[] = $container;
        }

        return call_user_func_array($callable, $params);
    }

    /**
     * @param $middlewares
     * @param $middleware
     */
    private function middleware($middlewares, $middleware)
    {
        if (!is_array($middleware)) {
            $middleware = [$middleware];
        }
        foreach ($middleware as $behavior) {
            $callable = $behavior;
            if (gettype($behavior) === TYPE_STRING) {
                if (isset($middlewares[$behavior])) {
                    $callable = $middlewares[$behavior];
                }
            }
            call_user_func_array($callable, [$this]);
        }
    }
}
