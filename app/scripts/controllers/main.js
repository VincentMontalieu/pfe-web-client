'use strict';

/**
 * @ngdoc function
 * @name pfeWebClientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pfeWebClientApp
 */
angular.module('pfeWebClientApp')
  .controller('MainCtrl', function ($scope, SurveyFactory) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    /*************** INIT *****************/

    var json_to_send;

    var dialog = new BootstrapDialog({
      type: BootstrapDialog.TYPE_WARNING,
      title: 'Erreur',
      message: 'Something went wrong...'
    });

    $(".question input").rating({
      starCaptions: {1: "Pas satisfait", 2: "Peu satisfait", 3: "Satisfait", 4: "Très satisfait", 5: "J'ai pleuré"},
      starCaptionClasses: {1: "text-danger", 2: "text-warning", 3: "text-info", 4: "text-primary", 5: "text-success"},
      clearCaption: '',
      defaultCaption: '',
      clearButton: ''
    });



    /*************** SEND FUNCTION *****************/

    $scope.sendOpinion = function () {

      // On construit le JSON a envoyer
      json_to_send = {
        venue: $("#raison_venue").val(),
        proprete: $("#proprete_ile").val(),
        tranquilite: $("#tranquilite_ile").val(),
        services: $("#services_ile").val(),
        beaute: $("#beaute_ile").val()
      };

      console.log(json_to_send);

      // Appel a la factory pour l'envoi au serveur via requete HTTP
      SurveyFactory.sendSurvey(json_to_send).then(function (data) {

        // Envoi reussi
        dialog = new BootstrapDialog({
          type: BootstrapDialog.TYPE_SUCCESS,
          title: 'Envoi terminé',
          message: data
        });
      }, function (err) {

        // Envoi echoue
        dialog = new BootstrapDialog({
          type: BootstrapDialog.TYPE_DANGER,
          title: 'Envoi échoué',
          message: err
        });
      });

      // Ouvre la pop-up
      dialog.open();
    }

  });
