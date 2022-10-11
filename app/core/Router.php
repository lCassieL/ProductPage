<?php
class Router {
    static function init() {
        $controller_name = 'main';
        $action_name = 'products';
        $routes = explode('/', $_SERVER['REQUEST_URI']);
        if(!empty($routes[1])) {
            $controller_name = strtolower($routes[1]);
        }
        if(!empty($routes[2])) {
            $action_name = strtolower($routes[2]);
        }

        $controller_name = ucfirst($controller_name);
        $controller_class = $controller_name.'Controller';
        $model_class = $controller_name.'Model';
        $action = 'action_'.$action_name;
        $model_path = 'app/models/'.$model_class.'.php';
        if(file_exists($model_path)) {
            include $model_path;
        }
        $controller_path = 'app/controllers/'.$controller_class.'.php';
        if(file_exists($controller_path)) {
            include $controller_path;
        } else {
            self::ErrorPage404();
        }
        $controller = new $controller_class;
        if(method_exists($controller, $action)) {
            empty($routes[3]) ? $controller->$action() : $controller->$action($routes[3]);
        } else {
            self::ErrorPage404();
        }
    }
    
    static function ErrorPage404() {
        header($_SERVER['Server_PROTOCOL'].'404 not found');
        exit();
    }
}