/**
 * Created by vjain3 on 5/25/16.
 */
describe('contiv.directives', function() {
    var envVariables = [
        {name: 'fooEnv1', value: 'barEnv1'},
        {name: 'fooEnv2', value: 'barEnv2'},
        {name: 'fooEnv3', value: 'barEnv3'}
    ];

    /* Accordion directive inputs */
    var accordionItems = [
        {name: "name1", value: "value1"},
        {name: "name2", value: "value2"},
        {name: "name3", value: "value3"},
        {name: "labels", value: ["label1=val1", "label2=val2", "label3=val3"]}
    ];

    /* Table directive inputs */
    var tableItems = [
        {name: "name11", ipAddress: "20.1.2.4", homingHost: "cluster-1"},
        {name: "name12", ipAddress: "20.1.2.3", homingHost: "cluster-1"},
        {name: "name13", ipAddress: "20.1.2.2", homingHost: "cluster-1"},
        {name: "name14", ipAddress: "20.1.2.1", homingHost: "cluster-1"},
        {name: "name17", ipAddress: "20.1.2.0", homingHost: "cluster-2"},
        {name: "name16", ipAddress: "20.1.1.9", homingHost: "cluster-2"},
        {name: "name15", ipAddress: "20.1.1.8", homingHost: "cluster-2"},
        {name: "name25", ipAddress: "20.1.1.7", homingHost: "cluster-3"},
        {name: "name24", ipAddress: "20.1.1.6", homingHost: "cluster-3"},
        {name: "name26", ipAddress: "20.1.1.5", homingHost: "cluster-6"},
        {name: "name20", ipAddress: "20.1.1.4", homingHost: "cluster-6"},
        {name: "name23", ipAddress: "20.1.1.3", homingHost: "cluster-6"},
        {name: "name22", ipAddress: "20.1.1.2", homingHost: "cluster-6"},
        {name: "name21", ipAddress: "20.1.1.1", homingHost: "cluster-1"}
    ];

    // End of table directive inputs

    var $compile, $rootScope;

    //Load the utils module
    beforeEach(module('contiv.utils'));
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

    describe("table directive",function(){
        var element,tableCtrl,scope,$filter;
        beforeEach(inject(function(_$filter_){
            $filter = _$filter_;
            scope = $rootScope.$new();
            scope.tableItems = tableItems;
            scope.size = 12;
            scope.name = "name";
            scope.ipAddress = "ipAddress";
            scope.homingHost = "homingHost";
            var elem =  "<ctv-table defaultsortcolumn='name' items='tableItems' filtereditems='filtItems' size='size'>" +
                        "   <ctv-thead>" +
                        "       <ctv-tr>" +
                        "           <ctv-th sortfield='name'>name</ctv-th>" +
                        "           <ctv-th sortfield='ipAddress'>ipAddress</ctv-th>" +
                        "           <ctv-th sortfield='homingHost'>homingHost</ctv-th>" +
                        "           <ctv-th><ctv-tsearch placeholder='Search' size='30'></ctv-tsearch></ctv-th>" +
                        "       </ctv-tr>" +
                        "   </ctv-thead>" +
                        "   <ctv-tbody>" +
                        "       <ctv-tr ng-repeat='item in filtItems'>" +
                        "           <ctv-td>{{item.name}}</ctv-td>" +
                        "           <ctv-td>{{item.ipAddress}}</ctv-td>" +
                        "           <ctv-td>{{item.homingHost}}</ctv-td>" +
                        "       </ctv-tr>" +
                        "   </ctv-tbody>" +
                        "   <ctv-tfoot>" +
                        "       <ctv-tr>" +
                        "           <ctv-th>" +
                        "               <ctv-tpagination></ctv-tpagination>" +
                        "           </ctv-th>" +
                        "       </ctv-tr>" +
                        "   </ctv-tfoot>" +
                        "</ctv-table>";
            element = $compile(elem)(scope);
            scope.$digest();
            tableCtrl = element.controller("ctvTable");
        }));

        //Function for verifying contents of generated table data
        function verifyTableData(pageNo,field,direction){
            var sortedTabItem = sortTestTabData(field,direction);
            var domTableData = element.find("tbody tr");
            var i=(pageNo-1) * 12;
            domTableData.each(function(index,elem){
                var textContent = elem.innerText;
                expect(textContent).toContain(sortedTabItem[i].name);
                expect(textContent).toContain(sortedTabItem[i].ipAddress);
                expect(textContent).toContain(sortedTabItem[i].homingHost);
                i++;
            });
        }

        //function for sorting input table data array based on key
        function sortTestTabData(field, direction){
            return $filter('orderBy')(tableItems, field, direction);
        }

        it("The number of items displayed should be equal to the size attribute",function() {
            expect(scope.filtItems.length).toEqual(scope.size);
        });

        it("Showchunk function should display items according to the input page No", function(){
            tableCtrl.showChunk(1);
            scope.$apply();
            expect(scope.filtItems.length).toEqual(tableItems.length-scope.size);
        });

        it("Showchunk function should select only items matching the input text",function(){
            tableCtrl.showChunk(0, "cluster-1");
            scope.$apply();
            var testFilterTab = tableItems.filter(function(item){
                return (item.homingHost == "cluster-1");
            });
            expect(scope.filtItems.length).toEqual(testFilterTab.length);
            for(var i in scope.filtItems.length){
                expect(scope.filtItems[i].name).toEqual(testFilterTab[i].name);
            }
        });

        it("By default the items in the table must be sorted based on defaultsortcolumn",function() {
            var sortedTabItem = sortTestTabData(scope.name,false);
            for (var i in scope.filtItems) {
                expect(scope.filtItems[i].name).toEqual(sortedTabItem[i].name);
            }
        });

        it("sort funciton should sort all items in the table based on the input sort field", function(){
            tableCtrl.sort("ipAddress");
            scope.$apply();
            var sortedTabItem = sortTestTabData("ipAddress",false);
            for(var i in scope.filtItems){
                expect(scope.filtItems[i].name).toEqual(sortedTabItem[i].name);
            }
            //All pages must be sorted based on the input sortfield
            tableCtrl.showNextChunk();
            scope.$apply();
            for(var i in scope.filtItems){
                expect(scope.filtItems[i]["ipAddress"]).toEqual(sortedTabItem[sortedTabItem.length - scope.filtItems.length + parseInt(i)]["ipAddress"]);
            }
        });

        it("showNextChunk function should load items present in the second chunk", function(){
            tableCtrl.showNextChunk();
            scope.$apply();
            expect(scope.filtItems.length).toEqual(tableItems.length-scope.size);
        });

        it("showPrevChunk should load items present in the previous chunk", function(){
            tableCtrl.showChunk(1);
            scope.$apply();
            tableCtrl.showPrevChunk();
            scope.$apply();
            var sortedTabItem = sortTestTabData(scope.name,false);
            for (var i in scope.filtItems) {
                expect(scope.filtItems[i].name).toEqual(sortedTabItem[i].name);
            }
        });

        it("The directive must create a table element and update the dom with the input items",function(){
            expect(element.find("table").hasClass("ui very basic unstackable table")).toBeTruthy();
            verifyTableData(1,scope.name,false);
        });


        it("verify whether sorting icon is displayed pointing in the right direction", function(){
            var iconTag = element.find("th[sortfield="+tableCtrl.sortObj.field+"]").children()[0];
            expect(iconTag.tagName).toEqual("I");
            expect(iconTag.className).toContain("angle down icon");
            var firstColumn = element.find("th[sortfield]")[0];
            firstColumn.click();
            scope.$apply();
            expect(iconTag.className).toContain("angle icon up");
        });

        it("Clicking on table header should call the sort function passing the sortfield ",function(){
            spyOn(tableCtrl,"sort").and.callThrough();
            var secondColumn = element.find("th[sortfield]")[1];
            secondColumn.click();
            expect(tableCtrl.sort).toHaveBeenCalledWith(scope.ipAddress);
        });

        it("Clicking on previous and next in the pagination footer should update the dom with the corresponding items",
            function(){
                var pageNext = element.find("tfoot a.icon")[1];
                var pagePrev = element.find("tfoot a.icon")[0];
                pageNext.click();
                scope.$apply();
                verifyTableData(2,scope.name,false);
                pagePrev.click();
                scope.$apply();
                verifyTableData(1,scope.name,false);
        });

        it("Number of page links displayed should be equal to chunks created", function(){
            expect(element.find("tfoot a").not(".icon").length).toEqual(tableCtrl.chunks.length);
        });

        it("Clicking on the page numbers in the pagination menu should call the showChunk with corresponding page no",
            function(){
                spyOn(tableCtrl, "showChunk").and.callThrough();;
                var secondPage = element.find("tfoot a").not(".icon")[1];
                secondPage.click();
                var secondPageNo = secondPage.innerText.trim();
                expect(tableCtrl.showChunk).toHaveBeenCalledWith(secondPageNo - 1,undefined);
        });

        it("Entering text in search box should call showChunk passing entered text as parameter",function(){
            spyOn(tableCtrl, "showChunk").and.callThrough();
            var searchField = element.find("input[type='text']");
            searchField.val("cluster-1").trigger('input');
            expect(tableCtrl.showChunk).toHaveBeenCalledWith(tableCtrl.pageNo,"cluster-1");
        });

        it("sorting direction must change on click", function(){
            var firstColumn = element.find("th[sortfield]")[0];
            firstColumn.click();
            scope.$apply();
            verifyTableData(1,scope.name,true);
        });

    });
});
