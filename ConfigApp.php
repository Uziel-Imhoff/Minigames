<?php
class ConfigApp{
    public static $ACTION = "action";
     public static $PARAMS = "params";
    public static $ACTIONS = [
    'home' => 'controller#mostrarIndex',
    'snake' => 'controller#mostrarSnake',
    'ta-te-ti' => 'controller#mostrarTateti'
    ];
}

?>
