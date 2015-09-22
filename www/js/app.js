angular.module('myApp', ['ionic'])

  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/')

    $stateProvider
      .state('events', {
        url: '/',
        templateUrl: '/pages/events/events.html',
        controller: 'eventsController'
      })
      .state('detail', {
        url: '/detail/:eventId',
        templateUrl: '/pages/detail/detail.html',
        controller: 'detailController'
      });
  })

  .controller('eventsController', ['$scope', 'eventsService', function($scope, eventsService) {
    $scope.title = "Events page";

    $scope.events = [];

    eventsService.success(function(data) {
      $scope.events = data.events;
    });

  }])

  .controller('detailController', ['$scope', '$stateParams', 'eventsService', function($scope, $stateParams, eventsService) {

    var eventId = $stateParams.eventId;

    // now I get all the events, this can be upgraded for a faster app, just need to figure out how
    eventsService.success(function(data) {
      $scope.event = data.events[eventId];
    });

    $scope.title = "Detail page";

    //console.log($stateParams.eventId);

  }])

  .factory('eventsService', ['$http', function($http) {

    return $http.get('/lib/events.json');

  }]);
