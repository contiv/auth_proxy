/**
 * Created by vjain3 on 5/4/16.
 */
angular.module("contiv.directives")
    .directive("ctvTable", ['filterFilter', 'limitToFilter', function (filterFilter, limitToFilter) {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                items: '=',
                filtereditems: '=',
                size: '@'
            },
            controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
                var tableCtrl = this;
                tableCtrl.chunks = [];
                tableCtrl.pageNo = 0;

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
                        $scope.filtereditems = tableCtrl.filteredItems;
                    }
                    return false;
                };

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

                tableCtrl.showChunk = showChunk;
                tableCtrl.showNextChunk = showNextChunk;
                tableCtrl.showPrevChunk = showPrevChunk;
                tableCtrl.addPaginationMenu = addPaginationMenu;
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
            scope: {
                class: '@'
            },
            template: '<th ng-class="class" ng-transclude></th>'
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
