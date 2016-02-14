/**
 * Created by vincent on 14/02/16.
 */


'use strict';

angular.module('pfeWebClientApp')
  .factory('SurveyFactory', function ($http, $q, CONSTANTS) {
    var factory = {
      sendSurvey: function (json_to_send) {
        var deferred = $q.defer();
        $http.post(CONSTANTS.serverAddress + CONSTANTS.sendSurveyPath, json_to_send).then(function (data) {
          if (data.data.status == 'success') {
            deferred.resolve(data.data.value);
          } else {
            deferred.reject(data.data.value);
          }
        }, function (error) {
          deferred.reject(error);
        });
        return deferred.promise;
      }
    };
    return factory;
  });
