(function() {
	'use strict';

	angular
		.module("app")
		.component("magicDie",{
			bindings:{
				label:"@"
			},
			controller:componentNameCtrl,
			controllerAs:'$ctrl',
			templateUrl:"./app/die.html",
		});//end component

	componentNameCtrl.$inject = ["$rootScope"];

	function componentNameCtrl($scope){
		var $ctrl = this;
		
		$ctrl.$onInit = init;
		$ctrl.selected = 0;
		$ctrl.rollValue = 0;
		$ctrl.select = select;

		$scope.$on("resetDies", function(){
			select(0)
		})

		function init(){
			// console.log("init component Magic Die");
			// console.log($ctrl);
		}// end init

		function select(newValue){
			var val = newValue;
			if( val === $ctrl.selected){
				val = 0
			}

			$ctrl.selected = val;
			$ctrl.rollValue = val;

			$scope.$broadcast("rolled", {label:$ctrl.label, val:val});
		}
		
	}//end controller
	
	
})();//