angular.module('phoneDJ.services', ['ngOpenFB'])

.factory('FBUser', function(){
    var user = {};
    return {
      get: function(){
        openFB.api({path: '/me', params:{fields: ['id','name','picture','email']},
          success: function(response){
            user = response;
          },
          error : function(){
            console.log("failed to retrieve user data");
          }
        });
        return user;
      }
    };
})

.factory('Friends', function(){
  var friends = {flist:[], online:0, total:0};
    return {
      all: function() {
        openFB.api({path: '/me/friends',
          success: function(response){
            friends.flist = response.data;
            friends.online = friends.flist.length;
            friends.total = response.summary.total_count;
          },
          error : function(){
            console.log("failed to retrieve friends");
          }
        });
        return friends;
      }
    };
})

.factory("Rooms", function($firebaseArray) {
  var roomsRef = new Firebase("https://fiery-heat-8396.firebaseio.com//rooms");
  return $firebaseArray(roomsRef);
})

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});


