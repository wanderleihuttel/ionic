<?php

namespace App\Http;

use App\Exceptions\HttpError;
use DRouter\Container;
use DRouter\Render;
use DRouter\Request;
use Throwable;

/**
 * Class Engine
 * @package App\Http
 */
class Engine
{
    /**
     * @var Router
     */
    protected $router;

    /**
     * @var Request
     */
    protected $request;

    /**
     * @var Container
     */
    protected $container;

    /**
     * @var Render
     */
    public $render;

    /**
     * Pagina notFound modificada
     * @var $notFoundModified false|callable
     */
    protected $notFoundModified = false;

    /**
     * Exceptions adicionais da App a serem lançadas!
     * @var $addedExceptions array
     */
    protected $addedExceptions = [];

    /**
     * @var array
     */
    protected $middlewares = [];

    /**
     * Router constructor.
     * @param array $paramsContainer
     */
    public function __construct($paramsContainer = [])
    {
        $this->request = new Request();
        $this->render = new Render();
        $this->router = new Router($this->request);

        $content = [
            'request' => $this->request,
            'render' => $this->render,
            'router' => $this->router
        ];
        $params = array_merge($paramsContainer, $content);
        $this->container = new Container($params);
    }

    /**
     * @return Container
     */
    public function getContainer()
    {
        return $this->container;
    }

    /**
     * @param $callable
     * @return \Closure|null|string
     */
    private function validCallable($callable)
    {
        if (is_callable($callable)) {
            if ($callable instanceof \Closure) {
                $callable = $callable->bindTo($this->container);
            }
            return $callable;
        }
        if (is_string($callable) && count(explode(':', $callable)) == 2) {
            return $callable;
        }

        $this->addedExceptions['\InvalidArgumentException'] = 'Callable inválido';

        return null;
    }

    /**
     * @param $method
     * @param $args
     * @return mixed
     */
    public function __call($method, $args)
    {
        $methodUpper = strtoupper($method);
        $accepted = $this->router->getRequestAccepted();

        if (in_array($methodUpper, $accepted)) {
            $options = isset($args[2]) ? $args[2] : [];

            $callable = $this->validCallable($args[1]);

            $route = $this->router->route($methodUpper, $args[0], $callable, $options);
            if (isset($options['name'])) {
                $route->setName($options['name']);
            }
            return $this;
        }

        if ($method == 'group' && count($args) == 2) {
            $callable = $this->validCallable($args[1]);
            $this->router->group($args[0], $callable);
            return $this;
        }

        $this->addedExceptions['\Exception'] = 'O metodo '.$method.' não existe';
        return null;
    }

    /**
     * @param $function
     */
    public function notFound($function)
    {
        if (is_callable($function)) {
            if ($function instanceof \Closure) {
                $this->notFoundModified = $function;
            } else {
                $this->addedExceptions['\InvalidArgumentException'] = 'O callable do metodo notFound deve ser um closure!';
            }
        } else {
            $this->addedExceptions['\InvalidArgumentException'] = 'App::notFound, callable invalido';
        }
    }

    /**
     * @return bool|string
     */
    public function root()
    {
        return $this->request->getRoot();
    }

    /**
     *
     */
    private function runAddedExceptions()
    {
        if (!empty($this->addedExceptions)) {
            foreach ($this->addedExceptions as $exception => $message) {
                throw new $exception($message);
                break;
            }
        }
    }

    /**
     * @param $name
     * @param $callable
     */
    public function addMiddleware($name, $callable)
    {
        $this->middlewares[$name] = $callable;
    }

    /**
     * @return bool|null
     */
    public function run()
    {
        try {
            $this->runAddedExceptions();

            if ($this->router->dispatch()) {
                return $this->router->resolve($this->container, $this->middlewares);
            }
            if ($this->notFoundModified) {
                $match = $this->notFoundModified->bindTo($this->container);
                return $match();
            }
            return !!$this->render->renderNotFoundPage();
        } catch (HttpError $httpError) {
            http_response_code($httpError->getStatus());
        } catch (Throwable $error) {
            echo $error->getMessage();
        }
        return null;
    }
}
