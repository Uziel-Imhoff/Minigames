<?php
    require_once 'libs/smarty/Smarty.class.php';
     class controller{
        private $smarty;
        private $base;
    
        public function __construct(){
            $this->smarty = new Smarty();
        }

        public function mostrarIndex(){
            $this->smarty->display("index.tpl");
        }

        public function mostrarSnake(){
            $this->smarty->display("snake.tpl");
        }

        public function mostrarTateti(){
            $this->smarty->display("ta_te_ti.tpl");
        }

    }
