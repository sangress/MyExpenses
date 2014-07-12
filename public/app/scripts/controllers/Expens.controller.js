'use strict';

function cl(mix) {
    console.log(mix);
}

angular.module('myExpensesApp')
    .controller('ExpensController', function ($scope, Expense, $filter, $rootScope) {
        $scope.expenses = [];
        $scope.amount = 0;
        $scope.time = new Date();
        $scope.tag = "";
        $scope.orderBy = '-time';
        $scope.total = 0;

        $rootScope.filterDate = new Date();

        Expense.get({id: ''}, function(data) {
            $scope.expenses = data.result;
        });

        $scope.deleteExpense = function(id) {
            Expense.delete({id: id}, function(resource) {
                angular.forEach($scope.expenses, function (expense, i) {
                    if (expense.id == resource.id) {
                        $scope.expenses.splice(i, 1);
                    }
                });
            });
        };

        $scope.addExpense = function() {
            if ($scope.time.getTime)
                $scope.time = $scope.time.getTime();
            var expense = {
                time: $scope.time,
                tag: $scope.tag,
                amount: $scope.amount
            };
            Expense.save({id: null}, expense, function(resource) {
                expense.id = resource.data.insertId;
                $scope.expenses.unshift(expense);
            });

        };

        $scope.setOrder = function (orderBy) {
            if ($scope.orderBy == orderBy) {
                orderBy = '-' + orderBy;
            }
            $scope.orderBy = orderBy;
        };

        $scope.opened = false;

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        // Disable weekend selection
        $scope.disabled = function (date, mode) {
            return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        };

        $scope.toggleMin = function () {
            $scope.minDate = $scope.minDate ? null : new Date('2014/01/01');
        };
        $scope.toggleMin();

        $scope.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1,
            minMode: "month", datepickerMode: "'month'"

        };

        $scope.initDate = new Date('2016-15-20');
        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate', 'MMMM-yyyy'];
        $scope.format = $scope.formats[1];

        $scope.onFilterDate = function (e) {
            $scope.$watch('filterDate', function () {
                var filterDateVal = $('#filterDate').val();
                if (filterDateVal == "") {
                    $rootScope.filterDate = null;
                } else {
                    $rootScope.filterDate = new Date(filterDateVal);
                }

            });
        };

        $scope.setTotal = function (amount) {
            $scope.total += amount;
        };

        $scope.getTotalTitle = function () {
            if ($rootScope.filterDate == null)
                return "All expenses: ";

            var monthNames = [ "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December" ];

            var title = "Expenses on " + monthNames[$rootScope.filterDate.getMonth()] + " " + $rootScope.filterDate.getFullYear();
            if ($scope.sortBy)
                title += ". Filtered by: " + $scope.sortBy;

            return title;
        };

        $scope.exit = function () {
            return window.close();
        };
    });
