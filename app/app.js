var myPokemonApp = angular.module('myPokemonApp', ['ngRoute', 'ngAnimate']);

myPokemonApp.config([
  '$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/home', {
        templateUrl: '../views/home.html',
        controller: 'PokemonController'
      })
      .when('/contact', {
        templateUrl: '../views/contact.html',
        controller: 'ContactController'
      })
      .when('/contact-success', {
        templateUrl: '../views/contact-success.html',
        controller: 'ContactController'
      })
      .when('/directory', {
        templateUrl: '../views/directory.html',
        controller: 'PokemonController'
      })
      .otherwise({
        redirectTo: '/home'
      });
  }
]);

myPokemonApp.directive('randomPokemon', [
  function() {
    return {
      restrict: 'E',
      scope: {
        pokemons: '='
      },
      templateUrl: '../views/random.html',
      transclude: true,
      replace: true,
      controller: 'PokemonController'
    };
  }
]);

myPokemonApp.controller('PokemonController', [
  '$scope',
  '$http',
  '$timeout',
  function($scope, $http, $timeout) {
    // $scope.deletePokemon = function(pokemon) {
    //   pokemon.caught = false;
    // };

    // $scope.addPokemon = function() {
    //   $scope.pokemons.push({
    //     name: $scope.newPokemon.name,
    //     number: parseInt($scope.newPokemon.number),
    //     type: $scope.newPokemon.type,
    //     thumb: $scope.newPokemon.thumb,
    //     caught: true
    //   });
    //   $scope.newPokemon.name = '';
    //   $scope.newPokemon.number = '';
    //   $scope.newPokemon.type = '';
    //   $scope.newPokemon.thumb = '';
    // };
    // $scope.removeAll = function() {
    //   $scope.pokemons = [];
    // };
    $scope.correct = false;
    $scope.incorrect = false;
    $scope.points = 0;

    $scope.guessPokemon = function() {
      if ($scope.guess === $scope.pokemons[$scope.random].name) {
        $scope.correct = true;
        $scope.incorrect = false;
        $scope.points = $scope.points + 1;
        $scope.correct = false;
        $scope.pokemons[$scope.random].guessed = true;
        $scope.random = Math.floor(Math.random() * 151);
      } else {
        $scope.incorrect = true;
        $timeout(function() {
          $scope.incorrect = false;
        }, 1500);
      }
    };
    $scope.random = Math.floor(Math.random() * 151);

    $http.get('../data/allPokemon.json').then(function(response) {
      $scope.pokemons = response.data;
    });
  }
]);

myPokemonApp.controller('ContactController', [
  '$scope',
  '$location',
  function($scope, $location) {
    $scope.sendMessage = function() {
      $location.path('/contact-success');
    };
  }
]);
