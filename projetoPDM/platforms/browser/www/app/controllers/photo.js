(function() {
    'use strict';

    angular
        .module('app')
        .controller('PhotoController', PhotoController);

    // Dependencias
    PhotoController.$injector = ['$scope', '$location'];

    function PhotoController($scope, $location){

        // Lógica aqui
        // ...
        $scope.novaFoto = function(){
          navigator.camera.getPicture(onSuccess, onFail, { quality: 25,
              destinationType: Camera.DestinationType.DATA_URL
          });
        }

        function onSuccess(imageData) {

            var watermark;
            var canvasDom;
            var canvas;

            //Imagem Principal
            var img = new Image();
            img.src = "data:image/jpeg;base64," + imageData;

            var larguraImagem = window.innerWidth;
            var alturaImagem = (img.height * window.innerWidth)/img.width;

            canvasDom = document.getElementById('canvas');
            canvasDom.width = larguraImagem;
            canvasDom.height = alturaImagem;

            canvas = canvasDom.getContext("2d");

            img.onload = function(e) {
                canvas.drawImage(img, 0, 0, larguraImagem, alturaImagem);
                canvas.font = "30px Arial";
                canvas.fillText("", 10, 50);

            }

            //Create a watermark image object
            watermark = new Image();
            watermark.src = "logoS.png";

            watermark.onload = function(e){
                canvas.drawImage(watermark, 1, 1, 150, 150);
            }


        }

        function onFail(message) {
            alert('Failed because: ' + message);
        }


        // using Toast with cordovaToast
        $scope.salvar = function (){
          window.plugins.toast.showShortBottom('Salvando...');
            window.canvas2ImagePlugin.saveImageDataToLibrary(
                function(msg){
                    // alert(msg);
                    window.plugins.toast.showLongBottom('Salvo');
                    $location.path( "/inicio" );
                },
                function(err){
                    // alert(err);
                    window.plugins.toast.showLongBottom('ERROR: ' + msg);
                },
                document.getElementById('canvas')
            );
        }


        //fim ImageController
    }

})();
