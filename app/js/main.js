// card-anathomy path
$(function() {
  
  
})


$(function() {
  const $window = $(window);
//Smooth-scroll
  $("a").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 1000, function(){
        window.location.hash = hash;
      });
    } 
  });

//cards-interactive
  $.fn.commentCards = function(){

    return this.each(function(){
  
      var $this = $(this),
          $cards = $this.find('.card'),
          $current = $cards.filter('.card--current'),
          $next;  
      $cards.on('click',function(){
        if ( !$current.is(this) ) {
          $cards.removeClass('card--current card--out card--next');
          $current.addClass('card--out');
          $current = $(this).addClass('card--current').not('floatimg-pointer');
          $next = $current.next();
          $next = $next.length ? $next : $cards.first();
          $next.addClass('card--next card--current').not('floatimg-pointer');
        }
        if ( $current.is(this)) {
          $cards.removeClass('card--current card--out card--next');
          $current.addClass('card--out');
          // $current = addClass('card--current');
          $next = $current.next().addClass('card--current');
          $next = $next.length ? $next : $cards.first();
          $next.addClass('card--next card--current');
        }
      });
  
      if ( !$current.length ) {
        $current = $cards.last();
        $cards.first().trigger('click');
      }
      $this.addClass('cards--active');
    })
  
  };
  $('.cards').commentCards();

//Pointer Hide
  $('.cards').on('click',function(){
    $('.floating-pointer').addClass('hidden')
  });
  // $(this).on('click',function(){
  //   if( !$('.cards').is(this) ) {
  //     $('.floating-pointer').removeClass('hidden')
  //   }
  // });
  // $('.cards').hover( 
  //   function() {
  //     $('.floating-pointer').addClass('hidden');
  //   }, function() {
  //     $('.floating-pointer').removeClass('hidden');
  //   } 
  // );



// card-anathomy interaction 
  var $elements =$('.card-example__element').add('.card-item').add('.line').not('img.card-example__element');
  $($elements).hover( 
      function() {
        
        var $trg = $(this);
        $elements.add('.line').add('img.card-example__element').not($trg).addClass('transparent');
        
        switch (true) {
          case ($trg.hasClass('points')) :
            $elements.filter('.points').add('.points.line').removeClass('transparent')
            break;
          case ($trg.hasClass('field')) :
            $elements.filter('.field').add('.field.line').removeClass('transparent')
            break;
          case ($trg.hasClass('method')) :
            $elements.filter('.method').add('.method.line').removeClass('transparent')
            break;
          case ($trg.hasClass('bonus')) :
            $elements.filter('.bonus').add('.bonus.line').removeClass('transparent')
            break;
        }
      }, function() {
        $('.transparent').removeClass('transparent');
      } 
    )
    
  function makePathAll() {
    $('.line').remove();
    makePath('.points .card-item_heading', '.card-example .points','#card-anatomy', 'line points left-align', 'left');
    makePath('.method .card-item_heading', '.card-example .method','#card-anatomy', 'line method left-align', 'left');
    makePath('.field .card-item_heading', '.card-example .field','#card-anatomy', 'line field right-align', 'right');
    makePath('.bonus .card-item_heading', '.card-example .bonus','#card-anatomy', 'line bonus left-align', 'left');
  }
  
  function check_if_in_view() {
    const window_height = $window.height();
    const window_top_position = $window.scrollTop();
    const window_bottom_position = (window_top_position + window_height);
    $.each($('.block.card-anatomy'), function() {
      const $element = $(this);
      const element_height = $element.outerHeight();
      const element_top_position = $element.offset().top;
      const element_bottom_position = (element_top_position + element_height);
      //check to see if this current container is within viewport
      if ((element_bottom_position >= window_top_position) &&
          (element_top_position <= window_bottom_position)) {
            makePathAll();;
      } 
    });
  }
  $window.one('scroll resize', check_if_in_view);
  $window.trigger('scroll');
  
    makePathAll();
  // } );
  function makePath(firstEl, secondEl, parentEl, className, align) {
    // console.log(secondEl);
    var $from = $(firstEl).offset(),
        $fromX = $from.left + 1,
        $fromY = $from.top + $(firstEl).outerHeight() - 2,
        $to = $(secondEl).offset(),
        $toX = $to.left + 10,
        $toY = $to.top + ( $(secondEl).outerHeight() / 2);
    
    if (align === 'right') {
      $fromX = $from.left + $(firstEl).outerWidth();
      // $toY = $to.top + 20;
      $toX = $to.left + $(secondEl).outerWidth() - 20;
    }
    $(parentEl).line( $fromX, $fromY, $toX, $toY, {color:"#977043", zindex:1, stroke:"2", class: className});
  }

  $( window ).resize(function() {
    // $('.line').remove();
    makePathAll();
  });
  //parallax scroll
  $(window).on("load scroll", function() {
    var parallaxElement = $(".parallax_scroll"),
      parallaxQuantity = parallaxElement.length;
      parallaxElement.css({'height': `${$(document).height()/2}px`})
    window.requestAnimationFrame(function() {
      for (var i = 0; i < parallaxQuantity; i++) {
        var currentElement = parallaxElement.eq(i),
          windowTop = $(window).scrollTop(),
          elementTop = currentElement.offset().top,
          elementHeight = currentElement.height(),
          viewPortHeight = window.innerHeight * 0.5 - elementHeight * 0.5,
          scrolled = windowTop - elementTop + viewPortHeight;
        currentElement.css({
          transform: "translate3d(0," + scrolled * -0.35 + "px, 0)"
        });
      }
    });
  });
})
