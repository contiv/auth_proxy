/**
 * Created by vjain3 on 5/25/16.
 */
describe('contiv.directives', function() {
    var envVariables = [
        {name: 'fooEnv1', value: 'barEnv1'},
        {name: 'fooEnv2', value: 'barEnv2'},
        {name: 'fooEnv3', value: 'barEnv3'}
    ];

    var $compile, $rootScope;

    // Load the module which contains the directive
    beforeEach(module('contiv.directives'));
    //Module that contains html template of the directive
    beforeEach(module('contiv.test.directives'));

    // Store references to $rootScope and $compile
    // so they are available to all tests in this describe block
    beforeEach(inject(function(_$compile_, _$rootScope_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $compile = _$compile_;
        $rootScope = _$rootScope_;

    }));

    describe('namevalue directive', function () {
        var isolateScope, element;
        beforeEach(inject(function() {
            // Compile a piece of HTML containing the directive
            element = $compile("<ctv-namevalue items='envVariables'></ctv-namevalue>")($rootScope);
            $rootScope.envVariables = envVariables;
            // fire all the watches, so the scope expression will be evaluated
            $rootScope.$digest();
            isolateScope = element.isolateScope();
        }));
        it('Replaces the element with the appropriate content', function () {

            // Check that the compiled element contains the templated content
            expect(element.html()).toContain("<td class=\"ng-binding\">fooEnv1</td>");
            expect(element.html()).toContain("<td class=\"ng-binding\">barEnv1</td>");
            expect(element.html()).toContain("<td class=\"ng-binding\">fooEnv2</td>");
            expect(element.html()).toContain("<td class=\"ng-binding\">barEnv2</td>");
            expect(element.html()).toContain("<td class=\"ng-binding\">fooEnv3</td>");
            expect(element.html()).toContain("<td class=\"ng-binding\">barEnv3</td>");
        });
        it('add() should cache variable', function () {
            isolateScope.newItem = {name: 'fooEnv4', value: 'barEnv4'};
            isolateScope.add();
            expect(isolateScope.items.length).toEqual(4);
            expect(isolateScope.items[3].name).toEqual('fooEnv4');
            expect(isolateScope.items[3].value).toEqual('barEnv4');
            //newItem should be reset
            expect(isolateScope.newItem.name).toEqual('');
            expect(isolateScope.newItem.value).toEqual('');
        });
        it('add() called twice with same variable name should only have the latest addition', function () {
            var isolateScope = element.isolateScope();
            isolateScope.newItem = {name: 'fooEnv4', value: 'barEnv4'};
            isolateScope.add();
            isolateScope.newItem = {name: 'fooEnv4', value: 'barEnv5'};
            isolateScope.add();
            expect(isolateScope.items.length).toEqual(4);
            expect(isolateScope.items[3].name).toEqual('fooEnv4');
            expect(isolateScope.items[3].value).toEqual('barEnv5');
        });
        it('remove() should remove the variable from cache', function () {
            var isolateScope = element.isolateScope();
            isolateScope.newItem = {name: 'fooEnv4', value: 'barEnv4'};
            isolateScope.add();
            isolateScope.newItem = {name: 'fooEnv5', value: 'barEnv5'};
            isolateScope.add();
            expect(isolateScope.items.length).toEqual(5);
            isolateScope.remove({name: 'fooEnv4', value: 'barEnv4'});
            expect(isolateScope.items.length).toEqual(4);
            expect(isolateScope.items[3].name).toEqual('fooEnv5');
            expect(isolateScope.items[3].value).toEqual('barEnv5');
            isolateScope.remove({name: 'fooEnv1', value: 'barEnv1'});
            expect(isolateScope.items.length).toEqual(3);
            isolateScope.remove({name: 'fooEnv2', value: 'barEnv2'});
            expect(isolateScope.items.length).toEqual(2);
            isolateScope.remove({name: 'fooEnv3', value: 'barEnv3'});
            expect(isolateScope.items.length).toEqual(1);
            isolateScope.remove({name: 'fooEnv5', value: 'barEnv5'});
            expect(isolateScope.items.length).toEqual(0);
            isolateScope.remove({name: 'fooEnv5', value: 'barEnv5'});
            expect(isolateScope.items.length).toEqual(0);
        });
    });
});
