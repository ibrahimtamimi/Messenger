jQuery(document).ready(function($){
    
    // jQuery sticky Menu
    
	$(".header-area").sticky({topSpacing:0});
    
    // Scrolly parallax
    $('.overlay-bg').scrolly({bgParallax: true});
    
    
    // Bootstrap Mobile Menu fix
    $(".navbar-nav li a").click(function(){
        $(".navbar-collapse").removeClass('in');
    });    
    
    // jQuery Scroll effect
    $('.navbar-nav li a, .scroll-to-up').bind('click', function(event) {
        var $anchor = $(this);
        var headerH = $('.header-area').outerHeight();
        $('html, body').stop().animate({
            scrollTop : $($anchor.attr('href')).offset().top - headerH + "px"
        }, 1200, 'easeInOutExpo');

        event.preventDefault();
    });    
    
    // Bootstrap ScrollPSY
    $('body').scrollspy({ 
        target: '.navbar-collapse',
        offset: 95
    });
    
    
    $('.portfolio-menu li').click(function(){ 
        
      $(".portfolio-menu li").removeClass("active");
      $(this).addClass("active");        

        var selector = $(this).attr('data-filter'); 
        $(".portfolio-items").isotope({ 
            filter: selector, 
            animationOptions: { 
                duration: 750, 
                easing: 'linear', 
                queue: false, 
            } 
        }); 
      return false; 
    });     
});



jQuery(window).load(function(){
     
    // Active isotope in container
    
    $(".portfolio-items").isotope({
        itemSelector: '.single-portfolio',
        layoutMode: 'fitRows',
    });    
    
});