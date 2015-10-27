angular.module('hsbxl', ['ngGrid']).
  filter('orderObjectBy', function(){
   return function(input, attribute) {
      if (!angular.isObject(input)) return input;

      var array = [];
      for(var objectKey in input) {
          array.push(input[objectKey]);
      }

      array.sort(function(a, b){
          a = parseInt(a[attribute]);
          b = parseInt(b[attribute]);
          return a - b;
      });
      return array;
   }
});

$(document).ready(function () {
    $('.carousel').carousel({
        interval: 4000
    });

    $('.carousel').carousel('cycle');
});