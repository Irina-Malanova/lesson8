angular.module('market-front', []).controller('appController', function ($scope, $http) {
    const contextPath = 'http://localhost:8189/market/';
    var page;
    $scope.loadPrev = function(){
        page--;
        if(page==0)page=1;
        $scope.loadProducts(page);
    }
    $scope.loadNext = function(){
        page++;
        $scope.loadProducts(page);
    }
    $scope.loadProducts = function (pageIndex=1) {
        page=pageIndex;
        $http({
            url: contextPath + 'products',
            method: 'GET',
            params: {
                p: pageIndex
            }
        }).then(function (response) {
            console.log(response);
            if(page>response.data.totalPages) page=response.data.totalPages+1;
            $scope.productsPage = response.data;
        });
    }

    $scope.removeInfo = function (product) {

        $http({
            url: contextPath + 'products/delete/'+ product.id,
            method: 'GET'
        }).then(function (response) {
            console.log(response);
            $scope.loadProducts(page);
        });
    }

    $scope.loadProducts();

});