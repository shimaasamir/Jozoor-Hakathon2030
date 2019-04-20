angular.module('JozoorApp').controller('ViewProfileController', function ($rootScope, $scope, $http, $timeout, $state) {
    $scope.$on('$viewContentLoaded', function () {
        // initialize core components
        $scope.tabIndex = 3;
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