angular.module('starter.controllers', [])

.controller('AppCtrl', function($rootScope, $scope, $window, $ionicModal, $firebase) {
  // Form data for the login modal
  $scope.loginData = {};

  $rootScope.show("Please wait... Processing");
  $scope.list = [];
  $scope.eventslist = [];

  var bucketListRef = new Firebase($rootScope.baseUrl);


  bucketListRef.on('value', function(snapshot) {
    var data = snapshot.val();

    $scope.list = [];

    for (var key in data) {
      if (data.hasOwnProperty(key)) {
          data[key].key = key;
          $scope.list.push(data[key]);
      }
    }

    if ($scope.list.length == 0) {
      $scope.noData = true;
    } else {
      $scope.noData = false;
    }

    for ( var eventkey in data['eventi']) {
      if (data['eventi'].hasOwnProperty(eventkey)) {
          data['eventi'][eventkey].eventkey = eventkey;
          $scope.eventslist.push(data['eventi'][eventkey]);
      }
    }

    $rootScope.hide();
  });

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  },

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };


  if(typeof analytics !== "undefined") { analytics.trackView("Awesome Controller"); }

    $scope.initEvent = function() {
        if(typeof analytics !== "undefined") { analytics.debugMode(); analytics.trackEvent("Category", "Action", "Label", 25); }
    }

})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})
