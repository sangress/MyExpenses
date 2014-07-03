'use strict';

meServices.factory('Expense', function ($http, $resource) {
    var factory = {};
    this.expenses = null;

    factory.add = function (expense) {
        return $http.post('/add-expense', expense).success(function (data) {
            return data;
        });
    };

    factory.DELETE = function (id) {
        return $http['delete']('/expense', {params: {id: id}}).success(function (data) {
            return data;
        });
    };

    function Expense(time, tag, amount) {
        this.time = time;
        this.tag = tag;
        this.amount = amount;

        this.flat = function () {
            // TODO: make it smart
            return {
                time: this.time,
                tag: this.tag,
                amount: this.amount
            };
        };

        this.save = function () {
            return $http.post('/add-expense', this.flat()).success(function (data) {
                return data;
            });
        };

    }

    factory.create = function (time, tag, amount) {
        return new Expense(time, tag, amount);
    };

    factory.getAll = function () {
        return $http.get('/expenses', {});
    };

    factory.getAll1 = function () {
        return $resource('/expenses', {}, {
            query: {method: 'GET', isArray: true}
        });
    };


    return factory;
});


