/**
 * Created by vjain3 on 5/12/16.
 */
angular.module('contiv.servicelbs')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('contiv.menu.servicelbs.create', {
                url: '/create',
                templateUrl: 'service_lbs/servicelbcreate.html',
                controller: 'ServicelbCreateCtrl as servicelbCreateCtrl'
            })
        ;
    }])
    .controller('ServicelbCreateCtrl', [
        '$state', '$stateParams', 'ServicelbsModel', 'NetworksModel', 'CRUDHelperService',
        function ($state, $stateParams, ServicelbsModel, NetworksModel, CRUDHelperService) {
            var servicelbCreateCtrl = this;
            servicelbCreateCtrl.labelSelectors = [];
            servicelbCreateCtrl.networks = [];

            function returnToServicelbs() {
                $state.go('contiv.menu.servicelbs.list');
            }

            function cancelCreating() {
                returnToServicelbs();
            }

            /**
             * Get networks for the given tenant.
             */
            function getNetworks() {
                NetworksModel.get().then(function (result) {
                    servicelbCreateCtrl.networks = _.filter(result, {
                        'tenantName': 'default'//TODO: Remove hardcoded tenant.
                    });
                });
            }

            function createLabelSelectorStrings() {
                //Empty out the selectors. In case of server errors this needs to be reset.
                servicelbCreateCtrl.servicelb.selectors = [];
                angular.forEach(servicelbCreateCtrl.labelSelectors, function(labelSelector) {
                    var selectorString = labelSelector.name + '=' + labelSelector.value;
                    servicelbCreateCtrl.servicelb.selectors.push(selectorString);
                })
            }
            function createServicelb() {
                createLabelSelectorStrings();
                //form controller is injected by the html template
                //checking if all validations have passed
                if (servicelbCreateCtrl.form.$valid) {
                    CRUDHelperService.hideServerError(servicelbCreateCtrl);
                    CRUDHelperService.startLoader(servicelbCreateCtrl);
                    servicelbCreateCtrl.servicelb.key =
                        servicelbCreateCtrl.servicelb.tenantName + ':' + servicelbCreateCtrl.servicelb.serviceName;
                    ServicelbsModel.create(servicelbCreateCtrl.servicelb).then(function successCallback(result) {
                        CRUDHelperService.stopLoader(servicelbCreateCtrl);
                        returnToServicelbs();
                    }, function errorCallback(result) {
                        CRUDHelperService.stopLoader(servicelbCreateCtrl);
                        CRUDHelperService.showServerError(servicelbCreateCtrl, result);
                    });
                }

            }

            function resetForm() {
                CRUDHelperService.stopLoader(servicelbCreateCtrl);
                CRUDHelperService.hideServerError(servicelbCreateCtrl);
                servicelbCreateCtrl.servicelb = {
                    serviceName: '',
                    networkName: '',
                    ipAddress: '',
                    selectors: [],
                    ports: [],
                    tenantName: 'default'//TODO: Remove hardcoded tenant.
                };
            }
            servicelbCreateCtrl.createServicelb = createServicelb;
            servicelbCreateCtrl.cancelCreating = cancelCreating;

            getNetworks();
            resetForm();
        }]);
