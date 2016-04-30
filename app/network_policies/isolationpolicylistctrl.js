angular.module('contiv.networkpolicies')
    .config(function ($stateProvider) {
        $stateProvider
            .state('contiv.networkpolicies.isolation.list', {
                url: '/list',
                controller: 'IsolationPolicyListCtrl as isolationPolicyListCtrl',
                templateUrl: 'network_policies/isolationpolicylist.html'
            })
        ;
    })
    .controller('IsolationPolicyListCtrl', ['$scope', '$interval', 'PoliciesModel', 'CRUDHelperService',
        function ($scope, $interval, PoliciesModel, CRUDHelperService) {
        var policiesListCtrl = this;

        function getPolicies(reload) {
            PoliciesModel.get(reload)
                .then(function successCallback(result) {
                    CRUDHelperService.stopLoader(policiesListCtrl);
                    policiesListCtrl.policies = result;
                }, function errorCallback(result) {
                    CRUDHelperService.stopLoader(policiesListCtrl);
                });
        }

        //Load from cache for quick display initially
        getPolicies(false);

        var promise;
        //Don't start auto-refresh if one is already in progress
        if (!angular.isDefined(promise)) {
            promise = $interval(function () {
                getPolicies(true);
            }, 5000);
        }
        //stop polling when user moves away from the page
        $scope.$on('$destroy', function () {
            $interval.cancel(promise);
        });
    }]);
