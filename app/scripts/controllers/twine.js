'use strict';

app.controller('TwineCtrl', function($scope) {
  $scope.copyEditsFromPassages = function() {
    $scope.edits = [];
    $scope.editVisibility = [];

    for (var i = 0; i < $scope.passages.length; i++) {
      var pass = $scope.passages[i];
      $scope.edits[i] = {title: pass.title, text: pass.text};
      $scope.editVisibility.push(false);
    }
  };

  $scope.savePassages = function() {
    localStorage.setItem('twine', JSON.stringify($scope.passages));
    $scope.copyEditsFromPassages();
  };

  $scope.submitPassage = function() {
    $scope.passages.push($scope.passage);
    $scope.passage = {text: '', title: ''};
    $scope.savePassages();
  };

  $scope.deletePassage = function(index) {
    $scope.passages.splice(index, 1);
    $scope.savePassages();
  };

  $scope.editPassage = function(index) {
    $scope.passages[index] = $scope.edits[index];
    $scope.savePassages();
  };

  $scope.importJSON = function() {
    $scope.passages = JSON.parse($scope.json);
    $scope.savePassages();
  };

  $scope.openEdits = function(index) {
    $scope.editVisibility[index] = true;
  };

  var twine = localStorage.getItem('twine');

  if (twine) {
    $scope.passages = JSON.parse(twine);
  } else {
    $scope.passages = [];
  }

  $scope.passage = {title: '', text: ''};
  $scope.copyEditsFromPassages();
  $scope.json = '';
});
