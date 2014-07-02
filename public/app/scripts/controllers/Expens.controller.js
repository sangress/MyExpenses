'use strict';

function cl(mix) {console.log(mix);}

angular.module('myExpensesApp')
  .controller('ExpensController', function ($scope, Expense, $filter, $rootScope) {
	  $scope.expenses = [];
	  $scope.amount = 0;
	  $scope.time = new Date();
	  $scope.tag = "";
	  $scope.orderBy = '-time';
	  $scope.total = 0;
	  
	  $rootScope.filterDate = new Date();

	  var getExpenses = function() {
		  Expense.getAll().success(function(data) {
			  $scope.expenses = data.result;
		  });
	  };
	  getExpenses();
	  
	  $scope.addExpense = function() {
		  if ($scope.time.getTime)
			  $scope.time = $scope.time.getTime();
		  
		  var exp = Expense.create($scope.time, $scope.tag, $scope.amount);
		  exp.save();
		  $scope.expenses.push(exp.flat());
	  };
	  
	  $scope.delteExpense = function(id) {
          angular.forEach($scope.expenses, function(expense, i) {
              if (expense.id == id) {
                  $scope.expenses.splice(i, 1);
              }
          });
		  Expense.DELETE(id);
	  };
	  
	  $scope.setOrder = function(orderBy) {
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
	  
	  $scope.open = function($event) {
		  $event.preventDefault();
		  $event.stopPropagation();

		  $scope.opened = true;
	  };	  
	  // Disable weekend selection
	  $scope.disabled = function(date, mode) {
	    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
	  };

	  $scope.toggleMin = function() {
	    $scope.minDate = $scope.minDate ? null : new Date('2014/01/01');
	  };
	  $scope.toggleMin();

	  $scope.open = function($event) {
	    $event.preventDefault();
	    $event.stopPropagation();

	    $scope.opened = true;
	  };

	  $scope.dateOptions = {
	    formatYear: 'yy',
	    startingDay: 1,
	    minMode:"month", datepickerMode:"'month'" 
	    
	  };

	  $scope.initDate = new Date('2016-15-20');
	  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate', 'MMMM-yyyy'];
	  $scope.format = $scope.formats[1];	  

	  $scope.onFilterDate = function(e) {
		  $scope.$watch('filterDate', function() {
			  var filterDateVal=$('#filterDate').val();
			  if(filterDateVal == "") {
				  $rootScope.filterDate = null;
			  } else {
				  $rootScope.filterDate = new Date(filterDateVal);
			  }
			  
		  });
	  };
	  
	  $scope.setTotal = function(amount) {
		  cl(amount);
		  $scope.total += amount; 
	  };
	  
	  $scope.getTotalTitle = function() {
		  if ($rootScope.filterDate == null)
			  return "All expenses: ";
		  
		  var monthNames = [ "January", "February", "March", "April", "May", "June",
		                     "July", "August", "September", "October", "November", "December" ];
		  
		  var title = "Expenses on " + monthNames[$rootScope.filterDate.getMonth()] + " " + $rootScope.filterDate.getFullYear();
		  if ($scope.sortBy)
			  title += ". Filtered by: " + $scope.sortBy;
		  
		  return title;
	  };
	  
	  $scope.exit = function() {
		return window.close();  
	  };
  });
