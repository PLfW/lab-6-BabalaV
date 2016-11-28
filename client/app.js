var myApp = angular.module('myApp',['ngRoute']);

myApp.config(function($routeProvider){
	$routeProvider
	.when('/', {
		controller:'BooksController',
		templateUrl: 'views/books.html',
		access: {restricted: true}
	})
	.when('/login', {
      templateUrl: 'views/login.html',
      controller: 'loginController',
      access: {restricted: false}
    })
    .when('/logout', {
      controller: 'logoutController',
      access: {restricted: true}
    })
    .when('/register', {
      templateUrl: 'views/register.html',
      controller: 'registerController',
      access: {restricted: false}
    })
	.when('/books/details/:id',{
		controller:'BooksController',
		templateUrl: 'views/book_details.html',
		access: {restricted: true}
	})
	.when('/books/add',{
		controller:'BooksController',
		templateUrl: 'views/add_book.html',
		access: {restricted: true}
	})
	.when('/books/edit/:id',{
		controller:'BooksController',
		templateUrl: 'views/edit_book.html',
		access: {restricted: true}
})
	.otherwise({
		redirectTo: '/'
	});
});


myApp.run(function ($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart',
    function (event, next, current) {
      AuthService.getUserStatus()
      .then(function(){
        if (next.access.restricted && !AuthService.isLoggedIn()){
          $location.path('/login');
          $route.reload();
        }
      });
  });
});
