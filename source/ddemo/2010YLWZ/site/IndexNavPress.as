stop();
trace(this+"Make MC Status")
GYWM.gotoAndStop(5);
KHAL.gotoAndStop(5);
YLWZ.gotoAndStop(5);
RYZS.gotoAndStop(5);
trace(this+"event for nav button")

if(_root.NavoId>0){
NavPressGoTo =10
}
else{
NavPressGoTo =6
}

B_GYWM.onPress = function(){
	_root.NavoId = 0
	_root.gotoAndPlay(NavPressGoTo)
}
B_KHAL.onPress = function(){
	_root.NavoId = 1
	_root.gotoAndPlay(NavPressGoTo)
}
B_YLWZ.onPress = function(){
	_root.NavoId = 2
	_root.gotoAndPlay(NavPressGoTo)
}

B_RYZS.onPress = function(){
	_root.NavoId = 3
	_root.gotoAndPlay(NavPressGoTo)
}




B_GYWM.onRollOver = function (){
		GYWM.gotoAndPlay(10);
}
B_GYWM.onRollOut = function (){
		GYWM.gotoAndPlay(1);
}

B_KHAL.onRollOver = function (){
		KHAL.gotoAndPlay(10);
}
B_KHAL.onRollOut = function (){
		KHAL.gotoAndPlay(1);
}

B_YLWZ.onRollOver = function (){
		YLWZ.gotoAndPlay(10);
}
B_YLWZ.onRollOut = function (){
		YLWZ.gotoAndPlay(1);
}

B_RYZS.onRollOver = function (){
		RYZS.gotoAndPlay(10);
}
B_RYZS.onRollOut = function (){
		RYZS.gotoAndPlay(1);
}