/* 
 * Adjust Text Area and add a counter at the end
 * by Franck D'agostini
 * franck.dagostini@gmail.com
 *
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 *
 * NOTE: This script requires jQuery to work.  Download jQuery at www.jquery.com
 *
 */

jQuery.fn.adjustTextArea = function(options) {
  var config = $.extend({}, $.fn.adjustTextArea.defaults, options);

  return this.each(function() {
    var element = jQuery(this);
    
    element.adjust(config.collapsed);
    
    if(config.use_counter){
      element.initCounter(config);
    }
    
    element.keyup(function(){ 
      element.adjust(config.collapsed);
      if(config.use_counter){
        element.setCounter(config);
      }
    });
  });
};

jQuery.fn.extend({
  
  adjust: function(collapsed){
    var textarea = $(this);
    var lines = textarea.val().split("\n");
    var count = lines.length;

    for(var i = 0; i < lines.length; i++){
      count += parseInt(lines[i].length / 80);
    }

    var rows = parseInt(collapsed / 20);

    if (count > rows) {
      textarea.attr("style", 'height:' + (collapsed*2) + 'px');
    }

    if (count <= rows) {
      textarea.attr("style", 'height:' + collapsed + 'px');
    }
  },
  
  initCounter: function(config){
    var textarea = $(this);
    var counter_nb = jQuery("<span></span>");
    counter_nb.append(config.max_count);

    var counter = jQuery('<p class="counter"></p>');

    counter.append(config.text_before + ' ')  
    counter.append(counter_nb);
    counter.append(' ' + config.text_after);
    counter.insertAfter(textarea);
  },

  setCounter: function(config){
    var textarea = $(this);
    var count = (config.max_count - textarea.val().length);
    
    var counter = textarea
      .parent(config.parent_selector)
      .find("p.counter");
    
    counter
      .find("span")
      .text(count);

    if (count < 0){ 
      counter.addClass("error"); 
    } else {
      counter.removeClass("error");
    }
  }
  
});

jQuery.fn.adjustTextArea.defaults = {
  'use_counter'     : true,
  'collapsed'       : 200, 
  'max_count'       : 500,
  'text_before'     : 'remain :',
  'text_after'      : 'characters',
  'parent_selector' : 'p'
};