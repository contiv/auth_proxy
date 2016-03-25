/**
 * Created by vjain3 on 3/22/16.
 */
angular.module('contiv.volumes', ['contiv.models'])
    .config(function ($stateProvider) {
        $stateProvider
            .state('contiv.volumes', {
                url: '/volumes',
                views: {
                    'volumes@': {
                        controller: 'VolumeListCtrl as volumeListCtrl',
                        templateUrl: 'volumes/volumelist.html'
                    }
                }
            })
        ;
    })
    .controller('VolumeListCtrl', ['VolumesModel', function (VolumesModel) {
        var volumeListCtrl = this;
        VolumesModel.get()
            .then(function (result) {
                volumeListCtrl.volumes = result;
            });
    }]);
