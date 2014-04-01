'use strict';

app.controller('TwineCtrl', function($scope) {
  // Sanitizes the given input to remove HTML.
  $scope.sanitize = function(text) {
    for (var i = 0; i < text.length; i++) {
      if (text[i] === '&') {
        text = text.substring(0, i) + '&amp;' + text.substring(i + 1);
      } else if (text[i] === '<') {
        text = text.substring(0, i) + '&lt;' + text.substring(i + 1);
      } else if (text[i] === '>') {
        text = text.substring(0, i) + '&gt;' + text.substring(i + 1);
      }
    }

    return text;
  };

  // Finds the index of a passage given its title.
  $scope.findPassageByTitle = function(title) {
    for (var i = 0; i < $scope.passages.length; i++) {
      if ($scope.passages[i].title === title) {
        return i;
      }
    }

    return -1;
  };

  // Takes the text from a passage and replaces its links with the
  $scope.viewParse = function(text) {
    var open = -1, bar = -1, close = -1;

    // Search for a matching pattern
    for (var i = 0; i + 1 < text.length; i++) {
      if (text[i] === '[' && text[i + 1] === '[') {
        open = i;
      }

      if (text[i] === '|') {
        bar = i;
      }

      if (text[i] === ']' && text[i + 1] === ']') {
        close = i;

        if (open === -1 || bar === -1) {
          continue;
        }

        // String to display
        var display = $scope.sanitize(text.substring(open + 2, bar));
        // Title of the passage to link to
        var title = text.substring(bar + 1, close);
        var linked = $scope.findPassageByTitle(title);

        if (linked !== -1) {
          text = text.substring(0, open) +
            '<a href="" ng-click="changeCurrent(' + linked + ')">' + display + '</a>' +
            text.substring(close + 2);

          // Go back to the opening brackets.
          i = open;
          open = bar = close = -1;
        }
      }
    }

    return text;
  };

  // Changes the current viewable passage to index.
  $scope.changeCurrent = function(index) {
    $scope.currentPassage = index;
  };

  // Set up edit objects (so they can serve as the ng-model in edit forms)
  $scope.copyFromPassages = function() {
    $scope.edits = [];
    $scope.editVisibility = [];
    $scope.viewPassages = [];

    for (var i = 0; i < $scope.passages.length; i++) {
      var pass = $scope.passages[i];
      $scope.edits[i] = {title: pass.title, text: pass.text};
      $scope.viewPassages[i] = {title: pass.title, text: $scope.viewParse(pass.text)};
      $scope.editVisibility.push(false);
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

  // Exports the passages array to JSON.
  $scope.exportJSON = function() {
    $scope.jsonVisible = true;
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
  $scope.currentPassage = 0;
  $scope.jsonVisible = false;
  $scope.copyFromPassages();
});
