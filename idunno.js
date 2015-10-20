var app = angular.module("app", []);

app.controller('idunnoCtrl',function($scope,APIService) {
    $scope.title;
    $scope.isbn;
    $scope.author;
    $scope.rating;
    $scope.books = [];
    $scope.save = function(){
        $scope.books.push({
            title: $scope.title,
            isbn:$scope.isbn,
            author:$scope.author,
            rating:$scope.rating
        });
        var books = angular.toJson($scope.books,true);
        APIService.sendData(books).then(function(data){
            if (data){
                alert("success");
                console.log(books);
            }else{
                alert("no data");
            }
        },function(error){
            console.log(error);
        })
    };
});

app.factory('APIService',function($http,$q){
    return{
        sendData:function(books){
            var deferred = $q.defer();
            $http.post('',{'book': books})
            .success(function(data){
                deferred.resolve(data);
            })
            .error(function(err){
                deferred.reject(err);
            });
            return deferred.promise;
        }
    }
});
