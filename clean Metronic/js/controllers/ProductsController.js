angular.module('JozoorApp').controller('ProductsController', function ($rootScope, $scope, $http, $timeout, $state) {
    $scope.$on('$viewContentLoaded', function () {
        // initialize core components
        $scope.tabIndex = 1;
    });

    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = false;

    $scope.changeTab = function (tabIndex) {
        $scope.tabIndex = tabIndex;
    }
    $scope.redirectToExternalProfile = function () {
        $state.go('viewExtrnalProfile');
    }
});