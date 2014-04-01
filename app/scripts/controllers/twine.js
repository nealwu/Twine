'use strict';

app.controller('TwineCtrl', function($scope) {
  // Set up edit objects (so they can serve as the ng-model in edit forms)
  $scope.copyFromPassages = function() {
    $scope.edits = [];
    $scope.editVisibility = [];
    $scope.viewable = [];

    for (var i = 0; i < $scope.passages.length; i++) {
      var pass = $scope.passages[i];
      $scope.edits[i] = {title: pass.title, text: pass.text};
      $scope.editVisibility.push(false);
      $scope.viewable.push(false);
    }
  };

  // Save all of the current passages to localStorage. Should be called at the
  // end of every function that changes the passages array.
  $scope.savePassages = function() {
    localStorage.setItem('twine', JSON.stringify($scope.passages));
    $scope.copyFromPassages();
  };

  // Adds a new passage to the passages array.
  $scope.submitPassage = function() {
    $scope.passages.push($scope.passage);
    $scope.passage = {text: '', title: ''};
    $scope.savePassages();
  };

  // Removes passages[index].
  $scope.deletePassage = function(index) {
    $scope.passages.splice(index, 1);
    $scope.savePassages();
  };

  // Changes passages[index] to reflect edits[index].
  $scope.editPassage = function(index) {
    $scope.passages[index] = $scope.edits[index];
    $scope.savePassages();
  };

  // Imports the passages array as JSON.
  $scope.importJSON = function() {
    $scope.passages = JSON.parse($scope.json);
    $scope.savePassages();
  };

  // Toggles the edit form for a particular passage.
  $scope.toggleEdit = function(index) {
    $scope.editVisibility[index] = !$scope.editVisibility[index];
  };

  var twine = localStorage.getItem('twine');

  if (twine) {
    $scope.passages = JSON.parse(twine);
  } else {
    $scope.passages = [];
  }

  $scope.passage = {title: '', text: ''};
  $scope.json = '';
  $scope.copyFromPassages();
});
