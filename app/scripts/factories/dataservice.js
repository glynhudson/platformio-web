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
    .factory('dataService', dataService);

  function dataService($resource, siteConfig) {
    return {
      getLibSearchResult: getLibSearchResult,
      getLibExamples: getLibExamples,
      getLibInfo: getLibInfo,
      getLibDlUrl: getLibDlUrl,
      getLibStats: getLibStats,
      getPioStats: getPioStats,
      getFrameworks: getFrameworks,
      getPackages: getPackages,
      getPlatforms: getPlatforms,
      getBoards: getBoards,
      getCLIDemos: getCLIDemos,
      getIDEDemos: getIDEDemos
    };

    function getLibSearchResult(data) {
      return $resource(siteConfig.apiURL + '/lib/search', data).get();
    }

    function getLibExamples(data) {
      return $resource(siteConfig.apiURL + '/lib/examples', data).get();
    }

    function getLibInfo(id) {
      return $resource(siteConfig.apiURL + '/lib/info/' + id).get();
    }

    function getLibDlUrl(id) {
      return $resource(
        siteConfig.apiURL + '/lib/download/' + id).get();
    }

    function getLibStats() {
      return $resource(siteConfig.apiURL + '/lib/stats').get();
    }

    function getPioStats() {
      return $resource(siteConfig.apiURL + '/stats').get();
    }

    function getBoards() {
      return $resource(siteConfig.apiURL + '/boards').query();
    }

    function getFrameworks() {
      return $resource(siteConfig.apiURL + '/frameworks').query();
    }

    function getPlatforms() {
      return $resource(siteConfig.apiURL + '/platforms').query();
    }

    function getPackages() {
      return $resource(siteConfig.apiURL + '/packages').get();
    }

    function getCLIDemos() {
      return [{
        'image': 'http://docs.platformio.org/en/stable/_images/platformio-demo-wiring.gif',
        'title': 'Blink Project',
        'icon': 'lightbulb-o'
      }, {
        'image': 'http://docs.platformio.org/en/stable/_images/platformio-demo-platforms.gif',
        'title': 'Platform Manager',
        'icon': 'laptop'
      }, {
        'image': 'http://docs.platformio.org/en/stable/_images/platformio-demo-lib.gif',
        'title': 'Library Manager',
        'icon': 'code'
      }];
    }

    function getIDEDemos() {
      return [{
        'image': 'http://docs.platformio.org/en/stable/_images/ide-platformio-eclipse.png',
        'title': 'Eclipse'
      }, {
        'image': 'http://docs.platformio.org/en/stable/_images/ide-sublime-text-deviot.gif',
        'title': 'Sublime Text'
      }, {
        'image': 'http://docs.platformio.org/en/stable/_images/ide-vs-platformio-newproject-8.png',
        'title': 'Visual Studio'
      }, {
        'image': 'http://docs.platformio.org/en/stable/_images/ide-platformio-clion.png',
        'title': 'CLion'
      }, {
        'image': 'http://docs.platformio.org/en/stable/_images/ide-platformio-netbeans.png',
        'title': 'NetBeans'
      }, {
        'image': 'http://docs.platformio.org/en/stable/_images/ide-platformio-codeblocks.png',
        'title': 'CodeBlocks'
      }, {
        'image': 'http://docs.platformio.org/en/stable/_images/ide-platformio-qtcreator-7.png',
        'title': 'Qt Creator'
      }, {
        'image': 'http://docs.platformio.org/en/stable/_images/ide-platformio-vim.png',
        'title': 'VIM'
      }, {
        'image': 'http://docs.platformio.org/en/stable/_images/ide-platformio-emacs.png',
        'title': 'Emacs'
      }, {
        'image': 'http://docs.platformio.org/en/stable/_images/ide-atom-platformio.png',
        'title': 'Atom'
      }];
    }

  }

})();
