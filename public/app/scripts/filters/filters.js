'use strict';

var meFilters = angular.module('meFilters', []);
meFilters.filter('mDateFilter', function ($rootScope) {
    return function (items) {
        if ($rootScope.filterDate == null)
            return items;

        var filtered = [];
        angular.forEach(items, function (item) {
            var itemDate = new Date(item.time);
            if ((itemDate.getMonth() == $rootScope.filterDate.getMonth()) && (itemDate.getFullYear() == $rootScope.filterDate.getFullYear()))
                filtered.push(item);
        });
        return filtered;
    };
});


meFilters.filter('setTotalAmount', function ($rootScope) {
    return function (items) {
        var total = 0;
        angular.forEach(items, function (item) {
            total += parseInt(item.amount);
        });
        $rootScope.totalAmount = total;
        return items;
    };
});
