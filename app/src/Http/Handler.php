<?php

namespace App\Http;

use App\Exceptions\DatabaseError;
//use App\Kernel\Session;
use PDO;

/**
 * Class App
 * @package App\Http
 *
 * @method Handler get ($path, $callable, $options = [])
 * @method Handler post ($path, $callable, $options = [])
 * @method Handler put ($path, $callable, $options = [])
 * @method Handler delete ($path, $callable, $options = [])
 * @method Handler group ($path, $callable, $options = [])
 */
class Handler extends Engine
{
    /**
     * @var string
     */
    private $path;

    /**
     * Handler constructor.
     * @param string $path
     * @param array $paramsContainer
     */
    public function __construct($path, array $paramsContainer = [])
    {
        parent::__construct($paramsContainer);

        $this->path = $path;
    }

    /**
     * @return $this
     * @throws DatabaseError
     */
    public function start()
    {
        //Session::start();

        $this->routes(
            [
                'resources/routes/main.php'
            ]
        );
        $this->render->setViewsFolder($this->path . '/resources/views/');
        $this->render->setAsGlobal(
            [
                'root' => $this->root(),
                //'id' => Session::get('acesso_loja'),
                //'loja' => Session::get('loja')
            ]
        );

        $database = $this->path . '/config/database.php';
        if (!file_exists($database)) {
            throw new DatabaseError("Can't find file {$database}");
        }
        /** @noinspection PhpIncludeInspection */
        $settings = require $database;
        $container = $this->getContainer();
        $container->db = $container->shared(function () use ($settings) {
            return new PDO(
                "mysql:host={$settings['host']};dbname={$settings['database']}",
                "{$settings['user']}",
                "{$settings['password']}",
                [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"
                ]
            );
        });

        $this->addMiddleware('refresh', function () {
            Session::refresh();
        });

        return $this;
    }

    /**
     * @param $files
     */
    public function routes($files)
    {
        foreach ($files as $file) {
            $filename = $this->path . '/' . $file;
            if (file_exists($filename)) {
                /** @noinspection PhpIncludeInspection */
                $routes = require $filename;
            }
            if (isset($routes) && is_callable($routes)) {
                $routes($this);
            }
        }
    }

    /**
     * @param $controller
     * @param $method
     * @param $parameters
     * @return mixed|null
     */
    public function resolve($controller, $method, $parameters)
    {
        $instance = new $controller($this->getContainer());
        if (method_exists($instance, $method)) {
            if (!is_array($parameters)) {
                $parameters = [$parameters];
            }
        }
        return null;
    }
}
