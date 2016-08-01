/**
 * Created by vjain3 on 5/25/16.
 */
describe('contiv.directives', function() {
    var envVariables = [
        {name: 'fooEnv1', value: 'barEnv1'},
        {name: 'fooEnv2', value: 'barEnv2'},
        {name: 'fooEnv3', value: 'barEnv3'}
    ];

    var accordionItems = [
        {name: "name1", value: "value1"},
        {name: "name2", value: "value2"},
        {name: "name3", value: "value3"},
        {name: "labels", value: ["label1=val1", "label2=val2", "label3=val3"]}
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

    describe('accordion directive', function(){
        var element;
        beforeEach(inject(function(){
            // Compile a piece of HTML containing the directive
            $rootScope.accordionItems = accordionItems;
            $rootScope.accordion = function(){};
            // fire all the watches, so the scope expression will be evaluated
            element = $compile("<ctv-accordion items = 'accordionItems'><span>Accordion Title</span></ctv-accordion>")($rootScope);
            $rootScope.$digest();
            isolateScope = element.isolateScope();
        }));

        it('Element with accordion class must be present', function(){
            expect(element.find("div:first-child").hasClass("accordion")).toBeTruthy();
        });

        it('Title must be present for an accordion', function(){
            expect(element.find("div.title span").text()).toEqual("Accordion Title");
        });

        it('Number of table rows should be equal to the number of name value pairs in accordiondata', function(){
            expect(element.find("tr").length).toBe(accordionItems.length);
        });

        it('Accordion contents must be valid', function(){
            var i = 0;
            var dataRows = element.find("tr");
            dataRows.each(function (index, elem){
                var tableData = angular.element(elem).children();
                expect(tableData[0].textContent.replace(/\s/g, '')).toEqual(accordionItems[i].name);
                if(accordionItems[i].name == "labels"){
                    var labelNodes = tableData[1].childNodes;
                    for(var j in labelNodes) {
                        if(labelNodes[j].nodeType == 1){
                            expect(accordionItems[i].value).toContain(labelNodes[j].textContent.replace(/\s/g, ''));
                        }
                    }
                }
                else{
                    expect(tableData[1].textContent.replace(/\s/g, '')).toEqual(accordionItems[i].value);
                }
                i++;
            });
        })
    });
});
