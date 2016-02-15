'use strict';

/**
 * @ngdoc function
 * @name pfeWebClientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pfeWebClientApp
 */
angular.module('pfeWebClientApp')
  .controller('MainCtrl', function ($scope, $http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.proprete = "fehd";


    /* Initialize your rating via javascript as follows */
    $(".question input").rating({
      starCaptions: {1: "Pas satisfait", 2: "Peu satisfait", 3: "Satisfait", 4: "Très satisfait", 5: "J'ai pleuré"},
      starCaptionClasses: {1: "text-danger", 2: "text-warning", 3: "text-info", 4: "text-primary", 5: "text-success"},
      clearCaption: '',
      defaultCaption: '',
      clearButton: ''
    });

    $scope.sendOpinion = function () {
      console.log($scope.proprete);

      /*console.log($scope.tranquilite);
      console.log($scope.serv);
      console.log($scope.beaute);*/
      BootstrapDialog.show({ 
        title: 'Envoyé terminé',
        message: 'Houda Smach'
      });
    }


    $scope.callService = function () {
      console.log("service from backend");

      $http.get('http://localhost:3001/api/random-quote').success(function(data, status){
              console.log(data);
            }).error(function(data, status){
              console.log("prb");
            }); 

    }



  });





/*
$http.get('').success(function(data, status){
             
            }).error(function(data, status){
             
            });     */