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
    var dialog;

    $(".question_satisfait input").rating({
      starCaptions: {1: "Pas satisfait", 2: "Peu satisfait", 3: "Satisfait", 4: "Très satisfait"},
      starCaptionClasses: {1: "text-danger", 2: "text-warning", 3: "text-info", 4: "text-success"},
      clearCaption: '',
      defaultCaption: '',
      clearButton: '',
      stars: 4
    });

    $(".question_derangeant input").rating({
      starCaptions: {1: "Très dérangeant", 2: "Dérangeant", 3: "Peu dérangeant", 4: "Pas dérangeant"},
      starCaptionClasses: {1: "text-danger", 2: "text-warning", 3: "text-info", 4: "text-success"},
      clearCaption: '',
      defaultCaption: '',
      clearButton: '',
      stars: 4
    });


    /*************** SEND FUNCTION *****************/

    $scope.sendOpinion = function () {

      // On construit le JSON a envoyer
      json_to_send = {
        categorie: $("#categorie_visiteur").val(),
        visite: $("#visite").val(),
        accueil: $("#accueil").val(),
        information: $("#info").val(),
        preservation: $("#preservation").val(),
        reglementation: $("#reglementation").val(),
        frequentation: $("#frequentation").val()
      };

      console.log(json_to_send);

      if (json_to_send.visite == 0 || json_to_send.accueil == 0 || json_to_send.information == 0
        || json_to_send.preservation == 0 || json_to_send.reglementation == 0 || json_to_send.frequentation == 0) {
        // Pas d'envoi si toutes les questions ne sont pas répondues
        dialog = new BootstrapDialog({
          type: BootstrapDialog.TYPE_WARNING,
          title: 'Attention',
          message: "Vous n'avez pas répondu à toutes les questions. Merci de réessayer."
        });

        // Ouvre la pop-up
        dialog.open();
      }

      else {

        // Appel a la factory pour l'envoi au serveur via requete HTTP
        SurveyFactory.sendSurvey(json_to_send).then(function (data) {

          // Envoi reussi
          dialog = new BootstrapDialog({
            type: BootstrapDialog.TYPE_SUCCESS,
            title: 'Envoi terminé',
            message: data
          });

          // Ouvre la pop-up
          dialog.open();

        }, function (err) {

          // Si err est juste un message, alors c'est une erreur envoyée par le serveur
          if (typeof err.data === 'undefined') {

            // Envoi echoue
            dialog = new BootstrapDialog({
              type: BootstrapDialog.TYPE_DANGER,
              title: 'Envoi échoué',
              message: err
            });

            // Ouvre la pop-up
            dialog.open();
          }

          // Si err contient un champ data = null, alors c'est une erreur envoyée par HTTP car le serveur est down
          else {

            // Le serveur ne répond pas
            dialog = new BootstrapDialog({
              type: BootstrapDialog.TYPE_DANGER,
              title: 'Envoi échoué',
              message: 'Le serveur ne répond pas :('
            });

            // Ouvre la pop-up
            dialog.open();

          }

        });
      }
    }
  });
