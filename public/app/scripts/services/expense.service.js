'use strict';

meServices.factory('Expense', function ($http, $resource) {
    var resource = $resource('/expense/:id', {id: '@id'}, {
        update: {method: 'PUT'}
    });
    return resource;
});


