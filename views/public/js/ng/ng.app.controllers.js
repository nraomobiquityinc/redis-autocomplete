angular.module('redisAutocompleteApp.controllers', [])
  .controller('AutocompleteCtrl', ['$scope', '$http', 'AutocompleteService',
    function($scope, $http, AutocompleteService) {
      $scope.wordFragment = '';
      $scope.matchesToReturnOptions = [3, 5, 10, 15, 20, 25];
      $scope.numMatchesToReturn = null;

      $scope.remoteUrl = function() {
        return "http://localhost:8081/api/suggestions/" + $scope.numMatchesToReturn + "/" + $scope.wordFragment;
      }
    }
  ]);
