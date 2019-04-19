/***
Metronic AngularJS App Main Script
***/

/* Metronic App */
var MetronicApp = angular.module("MetronicApp", [
  "ui.router",
  "ui.bootstrap",
  "oc.lazyLoad",
  "ngSanitize"
]);

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
MetronicApp.config([
  "$ocLazyLoadProvider",
  function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
      // global configs go here
    });
  }
]);

//AngularJS v1.3.x workaround for old style controller declarition in HTML
MetronicApp.config([
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
MetronicApp.factory("settings", [
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
MetronicApp.controller("AppController", [
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
MetronicApp.controller("HeaderController", [
  "$scope",
  function($scope) {
    $scope.$on("$includeContentLoaded", function() {
      Layout.initHeader(); // init header
    });
  }
]);

/* Setup Layout Part - Sidebar */
MetronicApp.controller("SidebarController", [
  "$state",
  "$scope",
  function($state, $scope) {
    $scope.$on("$includeContentLoaded", function() {
      Layout.initSidebar($state); // init sidebar
    });
  }
]);

/* Setup Layout Part - Sidebar */
MetronicApp.controller("PageHeadController", [
  "$scope",
  function($scope) {
    $scope.$on("$includeContentLoaded", function() {
      Demo.init(); // init theme panel
    });
  }
]);

/* Setup Layout Part - Quick Sidebar */
MetronicApp.controller("QuickSidebarController", [
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
MetronicApp.controller("ThemePanelController", [
  "$scope",
  function($scope) {
    $scope.$on("$includeContentLoaded", function() {
      Demo.init(); // init theme panel
    });
  }
]);

/* Setup Layout Part - Footer */
MetronicApp.controller("FooterController", [
  "$scope",
  function($scope) {
    $scope.$on("$includeContentLoaded", function() {
      Layout.initFooter(); // init footer
    });
  }
]);

/* Setup Rounting For All Pages */
MetronicApp.config([
  "$stateProvider",
  "$urlRouterProvider",
  function($stateProvider, $urlRouterProvider) {
    // Redirect any unmatched url
    $urlRouterProvider.otherwise("/dashboard.html");

    $stateProvider

      // Dashboard
      .state("dashboard", {
        url: "/dashboard.html",
        templateUrl: "views/dashboard.html",
        data: { pageTitle: "Admin Dashboard Template" },
        controller: "DashboardController",
        resolve: {
          deps: [
            "$ocLazyLoad",
            function($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: "MetronicApp",
                insertBefore: "#ng_load_plugins_before", // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                files: [
                  "assets/pages/scripts/dashboard.js",
                  "js/controllers/DashboardController.js"
                ]
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
                name: "MetronicApp",
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
MetronicApp.run([
  "$rootScope",
  "settings",
  "$state",
  function($rootScope, settings, $state) {
    $rootScope.$state = $state; // state to be accessed from view
    $rootScope.$settings = settings; // state to be accessed from view
  }
]);
