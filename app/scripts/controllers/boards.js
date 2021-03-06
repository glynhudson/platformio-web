/**
 * Copyright 2014-2016 Ivan Kravets <me@ikravets.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function() {
  'use strict';

  angular
    .module('siteApp')
    .controller('BoardsController', BoardsController);

  function BoardsController($scope, $httpParamSerializerJQLike, $filter,
    $location, $q, $window,
    ngTableParams, boardsList, platformsList, frameworksList) {
    var vm = this;

    vm.groupBy = 'vendor';
    vm.sortBy = 'vendor';
    vm.sortOrder = 'asc';
    vm.shareUrl = '';
    vm.platforms = platformsList;
    vm.frameworks = frameworksList;
    vm.getFilterData = getFilterData;
    vm.applySorting = applySorting;
    vm.resetSettings = resetSettings;
    vm.updateShareUrl = updateShareUrl;

    /* jshint newcap:false */
    var _sorting = {};
    _sorting[vm.sortBy] = vm.sortOrder;
    vm.tableParams = new ngTableParams(
      angular.extend({
          page: 1,
          count: $window.navigator.userAgent.indexOf('PhantomJS') !== -1 ?
            1000 : 15,
          sorting: _sorting
        },
        $location.search()), {
        counts: [15, 30, 50, 100, 1000],
        groupBy: function(item) {
          return item[vm.groupBy];
        },
        total: boardsList.length,
        getData: function($defer, params) {
          // $location.search(params.url());
          vm.updateShareUrl(params.url());

          var orderedData = params.sorting() ?
            $filter('orderBy')(boardsList, vm.tableParams.orderBy()) :
            boardsList;
          orderedData = params.filter() ?
            $filter('filter')(orderedData, params.filter()) :
            orderedData;

          params.total(orderedData.length);
          $defer.resolve(orderedData.slice((params.page() - 1) * params
            .count(), params.page() * params.count()));
        }
      });

    $scope.$watch('vm.groupBy', function() {
      vm.tableParams.reload();
    });
    $scope.$watch('vm.sortBy', vm.applySorting);
    $scope.$watch('vm.sortOrder', vm.applySorting);


    ////////////

    function applySorting() {
      vm.tableParams.sorting(vm.sortBy, vm.sortOrder);
    }

    function resetSettings() {
      vm.sortBy = 'vendor';
      vm.sortOrder = 'asc';
      vm.tableParams.filter({});
      vm.applySorting();
    }

    function updateShareUrl(params) {
      vm.shareUrl = $location.protocol() + '://' + $location.host();
      if (parseInt($location.port()) !== 80) {
        vm.shareUrl += ':' + $location.port();
      }
      vm.shareUrl += '/boards?' + $httpParamSerializerJQLike(params);
    }

    function getFilterData(type_) {
      var d = $q.defer(),
        data = [];
      angular.forEach(type_ === 'platforms' ? platformsList :
        frameworksList,
        function(item) {
          if (type_ === 'platforms' && item.forDesktop) {
            return;
          }
          if (angular.isObject(item) && 'title' in item) {
            data.push({
              'id': item.name,
              'title': item.title
            });
          }
        });

      d.resolve(data);
      return d;
    }
  }
})();
