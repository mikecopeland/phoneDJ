angular.module('phoneDJ.controllers', ['phoneDJ.services', 'ngOpenFB'])

.controller('LoginController', function ($scope, $state, $ionicModal, $timeout, ngFB, Friends){
  $scope.fbLogin = function () {
    ngFB.login({scope: 'email, user_friends'}).then(
      function (response) {
        if (response.status === 'connected') {
          console.log('Facebook login succeeded');
          $scope.closeLogin();
        } else {
          alert('Facebook login failed');
        }
      });
  };
  $scope.closeLogin = function(){
    $state.go('tab.friends');

  };
})

.controller('RoomsController', function($scope, Rooms, FBUser) {
    $scope.rooms = Rooms;

    $scope.createRoom = function() {
      var name = prompt("Room Name");
      if (name) {
        console.log(FBUser.get());
        $scope.rooms.$add({
          "name": name,
          "creator": FBUser.get()
        });
      }
    };

    $scope.deleteRoom = function(id, name){

      $scope.rooms.$remove(id);
    }
})

.controller('FriendsController', function($scope, friends) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.friends = friends;

})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountController', function($scope, user) {
  $scope.settings = {
    enableFriends: true
  };
  $scope.user = user;
});
