/**
 * Created by vjain3 on 3/11/16.
 */
angular.module('contiv.applicationgroups', ['contiv.models'])
    .config(function ($stateProvider) {
        $stateProvider
            .state('contiv.applicationgroups', {
                url: '/applicationgroups',
                views: {
                    'applicationgroups@': {
                        controller: 'ApplicationGroupListCtrl as applicationGroupListCtrl',
                        templateUrl: 'applicationgroups/applicationgrouplist.html'
                    }
                }
            })
        ;
    })
    .controller('ApplicationGroupListCtrl', ['ApplicationGroupsModel', function (ApplicationGroupsModel) {
        var applicationGroupListCtrl = this;
        ApplicationGroupsModel.get()
            .then(function (result) {
                applicationGroupListCtrl.groups = result;
            });
    }]);
