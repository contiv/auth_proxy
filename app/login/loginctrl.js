/**
 * Created by vjain3 on 5/19/16.
 */
angular.module('contiv.login')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('contiv.login', {
                url: '/',
                templateUrl: 'login/login.html',
                controller: 'LoginCtrl as loginCtrl'
            })
        ;
    }])
    .controller('LoginCtrl', ['$state', 'CRUDHelperService',
        function ($state, CRUDHelperService) {
            var loginCtrl = this;

            function returnToDashboard() {
                $state.go('contiv.menu.dashboard', {username: loginCtrl.username});
            }

            function login() {
                returnToDashboard();
            }

            CRUDHelperService.stopLoader(loginCtrl);
            CRUDHelperService.hideServerError(loginCtrl);
            loginCtrl.login = login;

        }]);