(function() {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$injector = ['$scope'];

    function HomeController($scope){

        
        $scope.msg = "Pictures";

        $scope.images = [];


        // pegar imagens da galeria, pasta principal Images
        // usando o plugin cordova-gallery-api
        // web: https://github.com/subitolabs/cordova-gallery-api
        // change default directory at : platforms/android/src/com/subitolabs/cordova/galleryapi/GalleryAPI.java
        // change android api level at : platforms/android/CordovaLib/project.properties
        $scope.getGallery = function(){
          var auximages = [];
          galleryAPI.getMedia('Pictures', function(items){
              for(var i = items.length; i >= 0; i--){
                  auximages.push(items[i]);
              }
              $scope.images = auximages;
              $scope.$digest();
          }, function(error){alert(error);});

        }

        $scope.updateGallery = function(){
          $scope.getGallery();
          window.plugins.toast.showLongBottom('Atualizado!');
        }

        $scope.getGallery();



    }

})();
