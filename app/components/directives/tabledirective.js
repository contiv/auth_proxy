/**
 * Created by vjain3 on 5/4/16.
 */

/*
Directive Usage :

a) ctvTable -
   usage : <ctv-table defaultsortcolumn='name' items='tableItems' filtereditems='filtItems' size='size'></ctv-table>
   attribute details :  defaultsortcolumn - The default column name(corresponding key inside the object of items array) on which the table will be sorted when it is loaded.
                        items - An array of objects which will be displayed by the ctv-table directive.
                        size - number of rows to be displayed inside the table. If items.length > size then remaining items
                               will be displayed in next page.
                        filtereditems - This is an output field which produces a filtered subset of items specefied by
                                        the previous attribute, Items are filtered based on search text defined inside ctv-search,
                                        and by the size mentioned in the ctv-table attribute
b) ctvTH -
   usage : <ctv-th sortfield='name'>name</ctv-th>
   attribute details : sortfield - This is the key of the object present inside items array specefied in ctvTable, for eg :
                                   if the array object is : [{ip: "20.1.2.3", host: "cluster-1"},{ip: "20.1.2.4", host: "cluster-2"}]
                                   then directive will be <ctv-th sortfield="'ip'"> Ip Address </ctv-th>
   Table can only be sorted on columns which has sortfield attribute specefied.

c) ctvTsearch -
   usage : <ctv-tsearch placeholder='Search' size='30'></ctv-tsearch>
   attribute details : placeholder - specify the placeholder for the input text field
                       size - specify the maximum length of the search string
   Only items matching the search string are displayed inside the table.

d) ctvTpagination -
   usage : <ctv-tpagination></ctv-tpagination>
   Provides link for moving back and forth of the result page.

 */
angular.module("contiv.directives")
    .directive("ctvTable", ['filterFilter', 'limitToFilter', function (filterFilter, limitToFilter) {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                items: '=',
                filtereditems: '=',
                size: '@',
                defaultsortcolumn: '@'
            },
            controller: ['$scope', '$element', '$attrs', '$filter', function ($scope, $element, $attrs, $filter) {
                var tableCtrl = this;
                tableCtrl.chunks = [];
                tableCtrl.pageNo = 0;
                tableCtrl.sortObj=initializeSort($scope.defaultsortcolumn);

                tableCtrl.size = parseInt($scope.size, 10);
                if (isNaN(tableCtrl.size)) {
                    tableCtrl.size = 12;
                }

                /**
                 * Always call showChunk with both parameters.
                 * @param pageNo
                 * @param searchText
                 * @returns {boolean}
                 */
                function showChunk(pageNo, searchText) {
                    tableCtrl.searchText = searchText;
                    if (pageNo === undefined || pageNo < 0) pageNo = 0;
                    tableCtrl.pageNo = pageNo;

                    if ($scope.items !== undefined) {//TODO: Check why items are undefined during initialization
                        var searchTextFilteredItems = filterFilter($scope.items, tableCtrl.searchText);
                        searchTextFilteredItems = $filter('orderBy')(searchTextFilteredItems, tableCtrl.sortObj.field, tableCtrl.sortObj.reverse);
                        var noOfChunks = Math.ceil(searchTextFilteredItems.length / tableCtrl.size);
                        if (noOfChunks == 0) {
                            noOfChunks = 1;
                        }
                        tableCtrl.chunks = [];
                        for (var i = 0; i < noOfChunks; i++) {
                            tableCtrl.chunks.push({selected: false, pageNo: i});
                        }

                        //After filtering number of chunks could change so reset page no if it is greater than no of chunks
                        if (pageNo >= tableCtrl.chunks.length) {
                            tableCtrl.pageNo = 0;
                        }
                        tableCtrl.chunks[tableCtrl.pageNo].selected = true;

                        //Update number of chunks for pagination menu
                        if (tableCtrl.chunks.length > 5) {
                            var sliceStart, sliceEnd;
                            sliceStart = tableCtrl.pageNo - 2;
                            sliceEnd = tableCtrl.pageNo + 3;
                            if (sliceStart < 0) {
                                sliceEnd = sliceEnd - sliceStart;
                                sliceStart = 0;
                            }
                            if (sliceEnd > tableCtrl.chunks.length) {
                                sliceStart = sliceStart - (sliceEnd - tableCtrl.chunks.length);
                                sliceEnd = tableCtrl.chunks.length;
                            }
                            $scope.paginationMenu.chunks = tableCtrl.chunks.slice(sliceStart, sliceEnd);
                        } else {
                            $scope.paginationMenu.chunks = tableCtrl.chunks;
                        }

                        tableCtrl.filteredItems = limitToFilter(searchTextFilteredItems,
                            tableCtrl.size,
                            tableCtrl.pageNo * tableCtrl.size);
                        $scope.filtereditems=tableCtrl.filteredItems;
                    }
                    return false;
                }

                function showPrevChunk() {
                    var prevChunk;
                    if (tableCtrl.pageNo <= 0) {
                        prevChunk = 0;
                    } else {
                        prevChunk = tableCtrl.pageNo - 1;
                    }
                    return showChunk(prevChunk);
                }

                function showNextChunk() {
                    var nextChunk;
                    nextChunk = tableCtrl.pageNo + 1;
                    if (nextChunk > tableCtrl.chunks.length - 1) {
                        nextChunk = tableCtrl.chunks.length - 1;
                    }
                    return showChunk(nextChunk);
                }

                /**
                 * Save pagination scope to provide chunk information to pagination menu.
                 * @param menu
                 */
                function addPaginationMenu(menu) {
                    $scope.paginationMenu = menu;
                }

                function initializeSort(sortfield){
                    return {
                        field:sortfield,
                        reverse: false,
                        iconDirection: {"angle down icon": true, "angle up icon": false}
                    }
                }

                function sort(sortfield){
                    if (sortfield == tableCtrl.sortObj.field){
                        tableCtrl.sortObj.field = sortfield;
                        tableCtrl.sortObj.reverse = !tableCtrl.sortObj.reverse;
                        tableCtrl.sortObj.iconDirection = {
                            "angle down icon": !tableCtrl.sortObj.reverse,
                            "angle up icon": tableCtrl.sortObj.reverse
                        }
                    }
                    else{
                        tableCtrl.sortObj = initializeSort(sortfield);
                    }
                    tableCtrl.showChunk(tableCtrl.pageNo, tableCtrl.searchText);
                    $scope.$apply();
                }

                tableCtrl.showChunk = showChunk;
                tableCtrl.showNextChunk = showNextChunk;
                tableCtrl.showPrevChunk = showPrevChunk;
                tableCtrl.addPaginationMenu = addPaginationMenu;
                tableCtrl.sort = sort;
            }],
            link: function (scope, element, attrs, tableCtrl) {
                //Watch for items as they will be auto refreshed
                scope.$parent.$watch(attrs.items, function () {
                    tableCtrl.showChunk(tableCtrl.pageNo, tableCtrl.searchText);
                });

            },
            templateUrl: 'components/directives/table.html'
        }
    }])
    .directive("ctvThead", function () {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            template: '<thead ng-transclude></thead>'
        }
    })
    .directive("ctvTh", function () {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            require: '^^ctvTable',
            scope: {
                class: '@',
                sortfield: '='
            },
            link:function(scope, element, attrs, tableCtrl){
                scope.tablectrl = tableCtrl;
                if(scope.sortfield != undefined && scope.sortfield != null){
                    element.bind('click', function(){
                        tableCtrl.sort(scope.sortfield);
                    });
                }
            },
            templateUrl: 'components/directives/tableheader.html'
        }
    })
    .directive("ctvTbody", function () {
        return {
            restrict: 'E',
            scope: {},
            transclude: true,
            replace: true,
            template: '<tbody ng-transclude></tbody>'
        }
    })
    .directive("ctvTfoot", function () {
        return {
            restrict: 'E',
            scope: {},
            transclude: true,
            replace: true,
            template: '<tfoot ng-transclude></tfoot>'
        }
    })
    .directive("ctvTsearch", function () {
        return {
            restrict: 'E',
            require: '^^ctvTable',
            scope: {
                placeholder: '@',
                size: '@'
            },
            link: function (scope, element, attr, tableCtrl) {
                scope.showChunk = function () {
                    tableCtrl.showChunk(tableCtrl.pageNo, scope.searchText);
                }
            },
            templateUrl: 'components/directives/searchinput.html'
        }
    })
    .directive("ctvTr", function () {
        return {
            restrict: 'E',
            transclude: 'true',
            replace: true,
            scope: {},
            template: '<tr ng-transclude></tr>'
        }
    })
    .directive("ctvTd", function () {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            scope: true,
            template: '<td ng-transclude></td>'
        }
    })
    .directive("ctvTpagination", function () {
        return {
            restrict: 'E',
            require: '^^ctvTable',
            scope: {},
            link: function (scope, element, attr, tableCtrl) {
                tableCtrl.addPaginationMenu(scope);
                //showChunk() will calculate and set chunks in scope
                tableCtrl.showChunk(tableCtrl.pageNo, tableCtrl.searchText);
                scope.showChunk = function (pageNo) {
                    tableCtrl.showChunk(pageNo, tableCtrl.searchText);
                };
                scope.showPrevChunk = tableCtrl.showPrevChunk;
                scope.showNextChunk = tableCtrl.showNextChunk;
            },
            templateUrl: 'components/directives/paginationmenu.html'
        }
    });
