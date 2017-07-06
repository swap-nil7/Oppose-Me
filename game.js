(function(){

	var app = angular.module('game', [ ]);
	var row = 0;
	var column = 0;

	app.controller('GameController', function($scope){
		$scope.board = createBoard();
		$scope.started = false;

		$scope.start = function(){
			clearSpot($scope.board);
			createRandom($scope.board);
			$scope.started = true;
			$scope.loss = false;
			$scope.scoreboard = true;
			$scope.score = 0;
		};

		$scope.go = function(spot){
			if($scope.started){
				var y=check(spot, $scope.board);
				if(y){
					$scope.score++;
				}
				else{
					$scope.loss = true;
					$scope.scoreboard = false;
					$scope.started = false;
				}
				clearSpot($scope.board);
				createRandom($scope.board);
			}
		};
	});

	function check(spot, board){
		var spotm = board.rows[row].spots[column];
		var spotc = board.rows[6-row].spots[6-column];
		if(spotm.content=="good"){
			if(spot==spotm){
				return true;
			}
			else{
				return false;
			}
		}
		if(spotm.content=="bad"){
			if(spot==spotc){
				return true;
			}
			else{
				return false;
			}
		}		
	}

	function clearSpot(board){
		var spotx = board.rows[row].spots[column];
		spotx.content = "empty";
	}

	function createRandom(board){
		row = Math.floor(Math.random()*7);
		column = Math.floor(Math.random()*7);
		var x = Math.floor(Math.random()*5);
		var spot = getSpot(board, row, column);
		if(x%5==0){
			spot.content="good";
		}
		else{
			spot.content="bad";
		}
	}

	function getSpot(board){
		return board.rows[row].spots[column];
	}


	function createBoard() {
	    var board = {};
	    board.rows = [];
	    
	    for(var i = 0; i < 7; i++) {
	        var row = {};
	        row.spots = [];
	        
	        for(var j = 0; j < 7; j++) {
	            var spot = {};
	            spot.content="empty";
	            row.spots.push(spot);
	        }
	        board.rows.push(row);
	    }
	    return board;
	}

})();