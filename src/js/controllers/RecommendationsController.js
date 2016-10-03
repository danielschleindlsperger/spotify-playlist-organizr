app.controller('RecommendationsController', ['$scope', '$rootScope', 'Spotify', 'SpotifyService',
  '$routeParams', '$mdToast',
  function ($scope, $rootScope, Spotify, SS, $routeParams, $mdToast) {

    let seedTracks = [];

    $scope.recommendations = [];
    $scope.player = {
      isOpen: true,
      count: 0
    };

    $scope.allPlaylists = [];
    $scope.userPlaylists = [];

    getRecommendations();

    // only get playlists if user is logged in, otherwise wait for log in event
    if ($rootScope.user.id) {
      getAllPlaylists(0);
    }
    $scope.$on('userLoggedIn', function (event, payload) {
      if ($rootScope.user.id && !$scope.playlistsLoaded) {
        getAllPlaylists(0);
      }
    });

    function getSeedTrackString() {
      let seeds = [];
      _.forEach(seedTracks, function (item) {
        seeds.push(item.id);
      });
      return _.join(seeds, ',');
    }

    function getAllPlaylists(offset) {
      Spotify.getUserPlaylists($rootScope.user.id, {
        limit: 50,
        offset: offset
      }).then(function (res) {
        $scope.allPlaylists = _.concat($scope.allPlaylists, res.items);
        let length = res.items.length;
        if (length >= 50) {
          getAllPlaylists(offset + 50);
        } else {
          console.log($scope.allPlaylists);
          setUserPlaylists();
        }
      });
    }

    function setUserPlaylists() {
      $scope.userPlaylists = _.remove($scope.allPlaylists, function (item) {
        return item.owner.id === $rootScope.user.id;
      });
      console.log($scope.userPlaylists);
    }

    function getRecommendations() {
      Spotify.getUserTopTracks({
        limit: 5
      }).then(function (res) {
        seedTracks = res.items;
        console.log(seedTracks);
        Spotify.getRecommendations({
          seed_tracks: getSeedTrackString()
        }).then(function (res) {
          $scope.recommendations = res.tracks;
          console.log(res);
        });
      });
    }

    $scope.addSongToPlaylist = function (songId, playlistId) {
      Spotify.addPlaylistTracks($rootScope.user.id, playlistId, songId).then(function (res) {
        $mdToast.show(
          $mdToast.simple()
          .textContent('Song added!')
          .position('right')
          .hideDelay(1500)
        );
      });
    };

    $scope.reroll = function () {
      getRecommendations();
    };

  }
]);
