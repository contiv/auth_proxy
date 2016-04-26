/**
 * Created by vjain3 on 3/22/16.
 */
angular.module('contiv.models')
    .factory('VolumesModel', ['$http', '$q', function ($http, $q) {
        var volumesmodel = new VolumesCollection($http, $q);
        return volumesmodel;
    }]);

/**
 * VolumesCollection extends from BaseCollection
 * @param $http
 * @param $q
 * @constructor
 */
function VolumesCollection($http, $q) {
    BaseCollection.call(this, $http, $q, ContivGlobals.VOLUMES_ENDPOINT);
}

VolumesCollection.prototype = Object.create(BaseCollection.prototype);

VolumesCollection.prototype.delete = function (model) {
    var volumescollection = this;
    var url = ContivGlobals.VOLUMES_DELETE_ENDPOINT + model.policy + '/' + model.name;
    volumescollection.$http.post(url, model)
        .then(function successCallback(response) {
            _.remove(volumescollection.models, function (n) {
                return (n.name == model.name && n.policy == model.name);
            });
        }, function errorCallback(response) {

        });
};