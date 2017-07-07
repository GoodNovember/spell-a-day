(function() {
	'use strict';

	angular
		.module("app")
		.component("magicSpells",{
			// bindings:{},
			controller:componentNameCtrl,
			controllerAs:'$ctrl',
			transclude:true,
			templateUrl:"./app/spells.html",
		});//end component

	function componentNameCtrl($scope){
		var $ctrl = this;
		
		var rolls = {}

		$ctrl.$onInit = init;
		$ctrl.reset = reset;
		
		$scope.$on("rolled", function(a,b,c){
			rolls[b.label] = b.val;
			think();
		})

		function think(){
			var keys = Object.keys(rolls)
			var allAreGreaterThanZero = true
			var values = []
			for(var i = 0; i < keys.length; i++){
				var key = keys[i]
				var value = rolls[key]
				if(value > 0){
					values.push(value - 1)
				}else{
					allAreGreaterThanZero = false
					break
				}
			}
			if(allAreGreaterThanZero && values.length === 6){
				generateWord(values);
			}else{
				$ctrl.word = "";
			}
		}

		function generateWord(values){
			var LR = Combos[values[0]]
			var Combo = LR[values[1]]
			var MethodA = Combo[0]
			var MethodB = Combo[1]
			var MethodAGroup = MethodA[values[2]]
			var MethodAWord = MethodAGroup[values[3]]
			var MethodBGroup = MethodB[values[4]]
			var MethodBWord = MethodBGroup[values[5]]
			var output = `${MethodAWord} ${MethodBWord}`
			console.log("-->", output);
			$ctrl.word = output;
		}

		function reset(){
			$ctrl.word = ""
			$scope.$broadcast("resetDies", true);
		}

		function init(){
			// console.log("init component MagicSpells");
		}// end init
		
	}//end controller
	
	componentNameCtrl.$inject = ["$rootScope"];
	
})();//