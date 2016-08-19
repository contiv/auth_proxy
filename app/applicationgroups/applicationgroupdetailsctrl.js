 /**
 * Created by vjain3 on 3/15/16.
 */
angular.module('contiv.applicationgroups')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('contiv.menu.applicationgroups.details', {
                url: '/details/:key',
                controller: 'ApplicationGroupDetailsCtrl as applicationGroupDetailsCtrl',
                templateUrl: 'applicationgroups/applicationgroupdetails.html'
            })
            .state('contiv.menu.applicationgroups.edit', {
                url: '/edit/:key',
                controller: 'ApplicationGroupDetailsCtrl as applicationGroupDetailsCtrl',
                templateUrl: 'applicationgroups/applicationgroupdetails.html'
            })
        ;
    }])
    .controller('ApplicationGroupDetailsCtrl', [
        '$state',
        '$stateParams',
        'ApplicationGroupsModel',
        'CRUDHelperService',
        function ($state,
                  $stateParams,
                  ApplicationGroupsModel,
                  CRUDHelperService) {
            var applicationGroupDetailsCtrl = this;

            applicationGroupDetailsCtrl.applicationGroup = {};
            applicationGroupDetailsCtrl.selectedNetwork = {};

            /**
             * To show edit or details screen based on the route
             */
            function setMode() {
                if ($state.is('contiv.menu.applicationgroups.edit')) {
                    applicationGroupDetailsCtrl.mode = 'edit';
                } else {
                    applicationGroupDetailsCtrl.mode = 'details';
                }
            }

            function returnToApplicationGroup() {
                $state.go('contiv.menu.applicationgroups.list');
            }

            function returnToApplicationGroupDetails() {
                $state.go('contiv.menu.applicationgroups.details', {'key': applicationGroupDetailsCtrl.applicationGroup.key});
            }

            function cancelEditing() {
                returnToApplicationGroupDetails();
            }

            function deleteApplicationGroup() {
                CRUDHelperService.hideServerError(applicationGroupDetailsCtrl);
                CRUDHelperService.startLoader(applicationGroupDetailsCtrl);
                ApplicationGroupsModel.delete(applicationGroupDetailsCtrl.applicationGroup).then(
                    function successCallback(result) {
                        CRUDHelperService.stopLoader(applicationGroupDetailsCtrl);
                        returnToApplicationGroup();
                    }, function errorCallback(result) {
                        CRUDHelperService.stopLoader(applicationGroupDetailsCtrl);
                        CRUDHelperService.showServerError(applicationGroupDetailsCtrl, result);
                    });
            }

            function saveApplicationGroup() {
                CRUDHelperService.hideServerError(applicationGroupDetailsCtrl);
                CRUDHelperService.startLoader(applicationGroupDetailsCtrl);

                ApplicationGroupsModel.save(applicationGroupDetailsCtrl.applicationGroup).then(function successCallback(result) {
                    CRUDHelperService.stopLoader(applicationGroupDetailsCtrl);
                    returnToApplicationGroupDetails();
                }, function errorCallback(result) {
                    CRUDHelperService.stopLoader(applicationGroupDetailsCtrl);
                    CRUDHelperService.showServerError(applicationGroupDetailsCtrl, result);
                });
            }

            CRUDHelperService.stopLoader(applicationGroupDetailsCtrl);
            CRUDHelperService.hideServerError(applicationGroupDetailsCtrl);

            ApplicationGroupsModel.getModelByKey($stateParams.key)
                .then(function (group) {
                    applicationGroupDetailsCtrl.applicationGroup = group;
                });

            applicationGroupDetailsCtrl.saveApplicationGroup = saveApplicationGroup;
            applicationGroupDetailsCtrl.cancelEditing = cancelEditing;
            applicationGroupDetailsCtrl.deleteApplicationGroup = deleteApplicationGroup;

            setMode();

        }]);