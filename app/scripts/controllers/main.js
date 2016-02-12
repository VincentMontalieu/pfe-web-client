'use strict';

/**
 * @ngdoc function
 * @name pfeWebClientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pfeWebClientApp
 */
angular.module('pfeWebClientApp')
  .controller('MainCtrl', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    /* Initialize your rating via javascript as follows */
    $(".question input").rating({
      starCaptions: {1: "Pas satisfait", 2: "Peu satisfait", 3: "Satisfait", 4: "Très satisfait", 5: "J'ai pleuré"},
      starCaptionClasses: {1: "text-danger", 2: "text-warning", 3: "text-info", 4: "text-primary", 5: "text-success"},
      clearCaption: '',
      defaultCaption: '',
      clearButton: ''
    });

    $scope.sendOpinion = function () {
      BootstrapDialog.show({
        title: 'Envoyé terminé',
        message: 'Merci pour votre temps !'
      });
    }

  });
