/***
Metronic AngularJS App Main Script
***/

/* Metronic App */
var JozoorApp = angular.module("JozoorApp", [
  "ui.router",
  "ui.bootstrap",
  "oc.lazyLoad",
  "ngSanitize"
]);

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
JozoorApp.config([
  "$ocLazyLoadProvider",
  function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
      // global configs go here
    });
  }
]);

//AngularJS v1.3.x workaround for old style controller declarition in HTML
JozoorApp.config([
  "$controllerProvider",
  function($controllerProvider) {
    // this option might be handy for migrating old apps, but please don't use it
    // in new ones!
    $controllerProvider.allowGlobals();
  }
]);

/********************************************
 END: BREAKING CHANGE in AngularJS v1.3.x:
*********************************************/

/* Setup global settings */
JozoorApp.factory("settings", [
  "$rootScope",
  function($rootScope) {
    // supported languages
    var settings = {
      layout: {
        pageSidebarClosed: false, // sidebar menu state
        pageContentWhite: true, // set page content layout
        pageBodySolid: false, // solid body color state
        pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
      },
      assetsPath: "assets",
      globalPath: "assets/global",
      layoutPath: "assets/layouts/layout4"
    };

    $rootScope.settings = settings;

    return settings;
  }
]);

/* Setup App Main Controller */
JozoorApp.controller("AppController", [
  "$scope",
  "$rootScope",
  function($scope, $rootScope) {
    $scope.$on("$viewContentLoaded", function() {
      //App.initComponents(); // init core components
      //Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive
    });
  }
]);

/***
Layout Partials.
By default the partials are loaded through AngularJS ng-include directive. In case they loaded in server side(e.g: PHP include function) then below partial 
initialization can be disabled and Layout.init() should be called on page load complete as explained above.
***/

/* Setup Layout Part - Header */
JozoorApp.controller("HeaderController", [
  "$scope",
  function($scope) {
    $scope.$on("$includeContentLoaded", function() {});
  }
]);

/* Setup Layout Part - Sidebar */
JozoorApp.controller("SidebarController", [
  "$state",
  "$scope",
  function($state, $scope) {
    $scope.$on("$includeContentLoaded", function() {});
  }
]);

/* Setup Layout Part - Sidebar */
JozoorApp.controller("PageHeadController", [
  "$scope",
  function($scope) {
    $scope.$on("$includeContentLoaded", function() {
      Demo.init(); // init theme panel
    });
  }
]);

/* Setup Layout Part - Quick Sidebar */
JozoorApp.controller("QuickSidebarController", [
  "$scope",
  function($scope) {
    $scope.$on("$includeContentLoaded", function() {
      setTimeout(function() {
        QuickSidebar.init(); // init quick sidebar
      }, 2000);
    });
  }
]);

/* Setup Layout Part - Theme Panel */
JozoorApp.controller("ThemePanelController", [
  "$scope",
  function($scope) {
    $scope.$on("$includeContentLoaded", function() {
      Demo.init(); // init theme panel
    });
  }
]);

/* Setup Layout Part - Footer */
JozoorApp.controller("FooterController", [
  "$scope",
  "$state",
  function($scope, $state) {
    $scope.$on("$includeContentLoaded", function() {});
  }
]);

/* Setup Rounting For All Pages */
JozoorApp.config([
  "$stateProvider",
  "$urlRouterProvider",
  function($stateProvider, $urlRouterProvider) {
    // Redirect any unmatched url
    $urlRouterProvider.otherwise("/splash.html");

    $stateProvider

      // ViewProfile
      .state("viewProfile", {
        url: "/viewProfile.html",
        templateUrl: "views/viewProfile.html",
        data: { pageTitle: "Admin ViewProfile Template" },
        controller: "ViewProfileController",
        resolve: {
          deps: [
            "$ocLazyLoad",
            function($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: "JozoorApp",
                insertBefore: "#ng_load_plugins_before", // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                files: ["js/controllers/ViewProfileController.js"]
              });
            }
          ]
        }
      })

      // ViewExtrnalProfile
      .state("viewExtrnalProfile", {
        url: "/viewExtrnalProfile.html",
        templateUrl: "views/viewExtrnalProfile.html",
        data: { pageTitle: "Extrnal ViewProfile Template" },
        controller: "ViewExtrnalProfileController",
        resolve: {
          deps: [
            "$ocLazyLoad",
            function($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: "JozoorApp",
                insertBefore: "#ng_load_plugins_before", // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                files: ["js/controllers/ViewExtrnalProfileController.js"]
              });
            }
          ]
        }
      })

      // News Feed
      .state("newsFeed", {
        url: "/newsFeed.html",
        templateUrl: "views/newsFeed.html",
        data: { pageTitle: "News Feed Template" },
        controller: "NewsFeedController",
        resolve: {
          deps: [
            "$ocLazyLoad",
            function($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: "JozoorApp",
                insertBefore: "#ng_load_plugins_before", // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                files: ["js/controllers/NewsFeedController.js"]
              });
            }
          ]
        }
      })

      // Splash
      .state("splash", {
        url: "/splash.html",
        templateUrl: "views/splash.html",
        data: { pageTitle: "Splash Template" },
        controller: "SplashController",
        resolve: {
          deps: [
            "$ocLazyLoad",
            function($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: "JozoorApp",
                insertBefore: "#ng_load_plugins_before", // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                files: ["js/controllers/SplashController.js"]
              });
            }
          ]
        }
      })
      .state("login", {
        url: "/login.html",
        templateUrl: "views/login.html",
        data: { pageTitle: "Login Template" },
        controller: "LoginController",
        resolve: {
          deps: [
            "$ocLazyLoad",
            function($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: "JozoorApp",
                insertBefore: "#ng_load_plugins_before", // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                files: ["js/controllers/LoginController.js"]
              });
            }
          ]
        }
      })

      // Blank Page
      .state("blank", {
        url: "/blank",
        templateUrl: "views/blank.html",
        data: { pageTitle: "Blank Page Template" },
        controller: "BlankController",
        resolve: {
          deps: [
            "$ocLazyLoad",
            function($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: "JozoorApp",
                insertBefore: "#ng_load_plugins_before", // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                files: ["js/controllers/BlankController.js"]
              });
            }
          ]
        }
      });
  }
]);

/* Init global settings and run the app */
JozoorApp.run([
  "$rootScope",
  "settings",
  "$state",
  function($rootScope, settings, $state) {
    $rootScope.$state = $state; // state to be accessed from view
    $rootScope.$settings = settings; // state to be accessed from view
  }
]);
