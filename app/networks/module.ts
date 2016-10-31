/**
 * Created by vjain3 on 5/18/16.
 */
angular.module('contiv.networks', ['contiv.models', 'contiv.directives', 'contiv.utils'])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('contiv.menu.networks', {
            url: '/networks',
            abstract: true,
            template: '<div ui-view class="ui container"/>'
        })
            .state('contiv.menu.networks.list', {
                url: '/list',
                component: 'networkList'
            }).
            state('contiv.menu.networks.details', {
                url: '/details/:key',
                component: 'networkdetails'
            })
            .state('contiv.menu.networks.create', {
                url: '/create',
                component: 'networkcreate'
            })
    }]);
