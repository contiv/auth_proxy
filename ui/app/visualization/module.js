

angular.module('contiv.visualization', ['contiv.models', 'contiv.directives', 'contiv.utils', 
	'contiv.graph'])
 .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('contiv.menu.visualization', {
            url: '/visualization',
            abstract: true,
            template: '<div ui-view class="ui container"/>'
        })
    }]);
