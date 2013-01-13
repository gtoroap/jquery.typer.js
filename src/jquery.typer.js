/**
 * jQuery plugin (jQuery.typer.js)
 *
 * http://gustavotoro.com/projects/jquery.typer.js
 *
 * Copyright (c) 2013 Gustavo Toro
 *
 * Licensed under MIT license:
 *  http://www.opensource.org/licenses/mit-license.php
 */

/* Utility to define function via Object */
if( typeof Object.create !== 'function' ) {
  Object.create = function( o ){
    function F(){};
    F.prototype = o;
    return new F();
  }
}

(function( $, window, document, undefined ){
  var Typer = {

    init: function( options, elem ){
      this.elem = elem;
      this.$elem = $( elem );
      this.options = $.extend( {}, $.fn.typer.options, options);
      this.display();

    },

    display: function(){
      var self = this;
      var str = self.$elem.text();
      var $output = $('<p></p>');

      function display_char(str, index){
        if(str){
          $output.append(str.substr(index,1));
          setTimeout(function(){
            display_char(str, index + 1);
          }, self.options.speeds[ self.options.speed ] );
        }
      }

      display_char(str, 0);
      this.$elem.after($output);
    }

  };

  $.fn.typer = function(options){
    //Mantain chainability
    return this.each(function(){
      var typer = Object.create( Typer );
      var $this = $( this );

      typer.init(options, this);

    });
  };

  // Set a options object inside plugin namespace
  $.fn.typer.options = {
    cursor: '|', // Character handled as a cursor
    speed: 'fast', // Options ['slow', '_default', 'fast']
    shadow: true,
    callback: false
  };

  $.fn.typer.options.speeds = {
    slow: 150,
    fast: 50,
    _default: 100
  }

})( jQuery, window, document );

