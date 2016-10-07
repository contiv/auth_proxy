/**
 * Created by vjain3 on 5/11/16.
 */
angular.module("contiv.directives")
    .directive("ctvNamevalue", function() {
       return {
           restrict: 'E',
           scope: {
               items: '=',
               nameheader: '@',//Field name to display for key
               valueheader: '@',//Field name to display for value
               type: '@',//'text' or 'select' to choose input or select html tag for key
               options: '='//To be used when type is 'select'
           },
           link: function(scope) {
               /**
                * Compare if two items have same name
                * @param val1
                * @param val2
                * @returns {boolean}
                */
               function compare(val1, val2) {
                   return val1.name == val2.name;
               }

               function resetNewItem() {
                   scope.newItem = {
                       name: '',
                       value: ''
                   };
               }

               function isEmptyItem(item) {
                   return (item.name === '' && item.value === '');
               }

               scope.add = function() {
                   if (isEmptyItem(scope.newItem)) return;
                   if (scope.item === undefined) {
                       scope.item = [];
                   }
                   //Removes existing item with the same name first if it exists.
                   _.pullAllWith(scope.items, [scope.newItem], compare);
                   scope.items.push(scope.newItem);
                   resetNewItem();
               };

               scope.remove = function(passedItem) {
                   _.remove(scope.items, function (item) {
                       return item.name == passedItem.name;
                   });
               };
               resetNewItem();

               if (scope.nameheader === undefined) scope.nameheader = 'Name';
               if (scope.valueheader === undefined) scope.valueheader = 'Value';
               if (scope.type === undefined) scope.type = 'text';
           },
           templateUrl: 'components/directives/namevalue.html'
       }
    });
