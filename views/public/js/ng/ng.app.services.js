angular.module('redisAutocompleteApp.services', [])
  .factory('AutocompleteService', function($http) {
    var api_base_url = "http://localhost:8081/api";
    return {
      getMatches: function(limit, fragment) {
        return $http({
          method: 'GET',
          url: api_base_url + '/suggestions/' + limit + '/' + fragment
        });
      }
    }
  });
