function WeatherCtrl($scope, $http, GeolocationService){

	$scope.panel = 0;


	$scope.search = function(){

		var url = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + $scope.city + "&mode=json&units=metric&cnt=10&APPID=d94ba9db101d8c54170013ba76a2eb66";
		$scope.loader = true;
		$http.get(url).success(httpSuccess).error(httpError);

	}

	$scope.expand = function(e){
		$elem = $(e.currentTarget);
		$elem.addClass("row_active").siblings().removeClass('row_active');
	}


	$scope.geolocate = function(){
		$scope.loader = true;
		GeolocationService.getCurrentPosition(function(position){
			$http.get("http://api.openweathermap.org/data/2.5/forecast/daily?lat="+position.coords.latitude+"&lon="+position.coords.longitude+"&mode=json&units=metric&cnt=10&APPID=d94ba9db101d8c54170013ba76a2eb66").success(httpSuccess).error(httpError);
		});
	}


	httpSuccess = function(response){
		$scope.panel   = 1;
		$scope.loader  = false;
		$scope.weather = response;
	}

	httpError = function(){
		$scope.loader = false;
		alert("Impossível de recuperar as informações");
	}

	$scope.Math = Math;
}