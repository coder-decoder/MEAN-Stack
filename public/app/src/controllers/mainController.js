(function(){
	angular.module('MainCtrlModule', [])

	.controller('MainCtrl', ['$rootscope','$location', 'Auth', function($rootscope, $location, Auth){

		var vm = this;
		vm.loggedIn = Auth.isLoggedIn();
		
		$rootscope.$on('$routeChangeStart', function(){
			vm.loggedIn = Auth.isLoggedIn();
			Auth.getUser()
				.then(function(data){
					vm.user = data.data;
				}) ;
		});

		vm.doLogin = function(){
			vm.processing = true;
			vm.error = '';
			Auth.login(vm.loginData.username, vm.loginData.password)
				.success(function(){
					
					vm.processing = false;

					Auth.getUser()
						.then(function(data){
							vm.user = data.data;
					});
						if(data.success)
							$location.path('/');
						else
							vm.error = data.message;

				});
		};

		vm.doLogOut = function(){
			Auth.logout();
			$location.path('/logout');
		};

	}]);

	

})();