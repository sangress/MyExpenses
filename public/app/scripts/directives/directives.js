'use strict';

angular.module('meDirectives', [])
    .directive('inPlaceEdit', [function() {
        return {
            restrict: 'A',
            scope: false,
            link: function(scope, elm, attrs) {
                var onBlur = function(e){
                    elm.addClass('view-mode');
                };
                onBlur();

                elm.on('focus', function(e){
                    elm.removeClass('view-mode');
                });

                elm.on('keyup', function(e) {
                    if (e.keyCode == 13) {
                        elm.trigger('blur');
                    }
                });

                elm.on('blur', onBlur);
            }
        };
    }]);