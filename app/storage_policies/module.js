/**
 * Created by vjain3 on 5/18/16.
 */
angular.module('contiv.storagepolicies', ['contiv.models'])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('contiv.menu.storagepolicies', {
                url: '/storagepolicies',
                abstract: true,
                template: '<div ui-view class="ui container"/>'
            })
    }]);