(function() {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    // Dependencias
    HomeController.$injector = ['$scope'];

    function HomeController($scope){

        // Lógica aqui
        // ...
        $scope.msg = "Pictures";

        $scope.images = [];



        $scope.getGallery = function(){
          var auximages = [];
          galleryAPI.getMedia('Pictures', function(items){
              for(var i = items.length; i >= 0; i--){
                  auximages.push(items[i]);
              }
              $scope.images = auximages;
          }, function(error){alert(error);});

        }

        $scope.updateGallery = function(){
          $scope.getGallery();
          window.plugins.toast.showLongBottom('Atualizando!');
          $scope.$digest();
        }

        $scope.getGallery()


          // pegar imagens da galeria, plasta principal Images
          // usando o plugin cordova-gallery-api
          // web: https://github.com/subitolabs/cordova-gallery-api
          // change default directory at : platforms/android/src/com/subitolabs/cordova/galleryapi/GalleryAPI.java





        //fim HomeController
    }

})();
