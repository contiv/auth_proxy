/**
 * Created by vjain3 on 5/19/16.
 */
angular.module('contiv.menu')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('contiv.menu', {
                url: '',
                templateUrl: 'menu/menu.html',
                controller: 'MenuCtrl as menuCtrl',
                params: {username: null}
            })
        ;
    }])
    .controller('MenuCtrl', ['$state', '$stateParams', function ($state, $stateParams) {
        var menuCtrl = this;

        function logout() {
            $state.go('contiv.login');
        }

        menuCtrl.username = $stateParams.username;
        menuCtrl.logout = logout;

    }]);