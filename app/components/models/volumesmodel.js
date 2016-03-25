/**
 * Created by vjain3 on 3/22/16.
 */
angular.module('contiv.models')
    .factory('VolumesModel', ['$http', '$q', function ($http, $q) {
        var URLS = {
            POST: ContivGlobals.VOLUMES_ENDPOINT,
            PUT: ContivGlobals.VOLUMES_ENDPOINT,
            DELETE: ContivGlobals.VOLUMES_ENDPOINT,
            GET: ContivGlobals.VOLUMES_ENDPOINT
        };

        var volumesmodel = new Collection($http, $q, URLS);

        /**
         * Generate key for volume
         * @param volume
         */
        volumesmodel.generateKey = function (volume) {
            return volume.tenantName + ':' + volume.volumeName;
        };

        return volumesmodel;
    }]);