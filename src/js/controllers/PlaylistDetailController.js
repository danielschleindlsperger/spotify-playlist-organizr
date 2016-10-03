app.controller('PlaylistDetailController', ['$scope', '$rootScope', 'Spotify', 'SpotifyService',
  '$routeParams', '$mdDialog', '$mdToast',
  function ($scope, $rootScope, Spotify, SS, $routeParams, $mdDialog, $mdToast) {

    let ownerId = $routeParams.owner_id;
    let playlistId = $routeParams.playlist_id;

    $scope.playlist = {};
    $scope.tracks = [];
    $scope.userOwned = false;

    Spotify.getPlaylist(ownerId, playlistId, {
      limit: 0
    }).then(function (res) {
      $scope.playlist = res;
      $scope.userOwned = ($scope.playlist.owner.id === $rootScope.user.id);
    });

    function getPlaylistTracks(offset) {
      Spotify.getPlaylistTracks(ownerId, playlistId, {
        limit: 100,
        offset: offset
      }).then(function (res) {
        // console.log(res);
        $scope.tracks = _.concat($scope.tracks, res.items);
        let length = res.items.length;
        if (length >= 100) {
          getPlaylistTracks(offset + 100);
        } else {
          // console.log($scope.tracks);
          console.log($scope.playlist);
        }
      });
    }
    getPlaylistTracks(0);

    $scope.deleteSongFromPlaylist = function (ev, songId) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
        .title('Do you really want to delete this song from that playlist?')
        .textContent('It really is a pain in the ass to revert this step so choose wisely.')
        .ariaLabel('Delete Song Prompt')
        .targetEvent(ev)
        .ok('Delete!')
        .cancel('NO, please go back!');
      $mdDialog.show(confirm).then(function () {
        Spotify.removePlaylistTracks(ownerId, playlistId, songId);
        let index = _.findIndex($scope.tracks, function (item) {
          return item.track.id === songId;
        });
        $scope.tracks.splice(index, 1);
        $mdToast.show(
          $mdToast.simple()
          .textContent('Song deleted!')
          .position('right')
          .hideDelay(1500)
        );
      }, function () {
        $mdToast.show(
          $mdToast.simple()
          .textContent('Whew!')
          .position('right')
          .hideDelay(1500)
        );
      });
    };
  }
]);
