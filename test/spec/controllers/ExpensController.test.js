'use strict';

describe('Controller: ExpensController', function () {

  // load the controller's module
  beforeEach(module('myExpensesApp'));

  var ExpensController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ExpensController = $controller('ExpensController', {
      $scope: scope
    });
  }));

/*  it('should have an empty list of expenses', function () {
    expect(scope.expenses.length).toBe(0);
  });
  
  it('should add an expenses to the expenses list', function() {
	  var beforeAdd = scope.expenses.length;
	  scope.addExpense();
	  expect(scope.expenses.length).toBe(beforeAdd+1);
  });*/
});
