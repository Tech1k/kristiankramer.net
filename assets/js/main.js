// CountUp age
var options = {
useEasing: true,
    useGrouping: true,
separator: ",",
    decimal: "."
};

var statistic_age = $(".statistic_age");

statistic_age.each(function(index) {
    var value = $(statistic_age[index]).html();
    var statisticAnimation = new CountUp(statistic_age[index], 0, value, 8, 5, options);
    statisticAnimation.start();
});


// Copy text
function copy(text) {
    navigator.clipboard.writeText(text);
}


//Calculate age
var age, daysBetweenDates;
daysBetweenDates = function(d1, d2) {
  var diffDays, oneDay;
  oneDay = 24 * 60 * 60 * 1000;
  diffDays = (d2 - Date.parse(d1)) / oneDay;
  return diffDays;
};

age = function() {
  var age_value = daysBetweenDates('Jun 17, 2005 06:00:00', new Date()) / 365;
  $('#myAge').text(age_value.toFixed(8));
};

setInterval(age, 1);



//Anchors
$(function(){
    $('a[href^="#"]').click(function(){
        var target = $(this).attr('href');
        $('html, body').animate({scrollTop: $(target).offset().top - 50}, 800);
        return false;
    });
});

//Fixed-top menu
function fixedHeader() {
    var ww = $(window).scrollTop();
    if(ww > 0){
        $('.menu').addClass('menu--active');
        $('.mobile-menu').addClass('mobile-menu--active');
        $('.progress-container').removeClass('hidden');
    }else{
        $('.menu').removeClass('menu--active');
        $('.mobile-menu').removeClass('mobile-menu--active');
        $('.progress-container').addClass('hidden');
    }
}
fixedHeader();
$(window).on('scroll', function () {
    fixedHeader();
});



//Open mobile menu
$('.menu__mobile-button, .mobile-menu__close').on('click', function () {
    $('.mobile-menu').toggleClass('active');
});

//Close mobile menu after click
$('.mobile-menu__wrapper ul li a').on('click', function () {
    $('.mobile-menu').removeClass('active');
});



//Filter project cards
var previousClickedMenuLink = undefined;
$('.portfolio-menu').on('click', 'a', function(event){
    event.preventDefault();

    if (previousClickedMenuLink) {
        previousClickedMenuLink.removeClass('portfolio-menu__link--active');
    }
    var link = $(event.target);
    link.addClass('portfolio-menu__link--active');
    previousClickedMenuLink = link;

    var targetTag = $(event.target).data('portfolio-target-tag');
    var portfolioItems = $('.portfolio-cards').children();

    if (targetTag === 'all') {
        portfolioItems.fadeIn({duration: 500});
    } else {
        portfolioItems.hide();
    }

    portfolioItems.each(function(index, value){
        var item = $(value);
        if (item.data('portfolio-tag') === targetTag) {
            item.fadeIn({duration: 500});
        }
    });
});



//Animate headers of .section
var hideHeader = function(header) {
    header.css('text-indent', '-9999px');
};

var showHeader = function(header) {
    header.css('text-indent', '0px');
};

var animateHeader = function(header, text) {
    //clear header text
    header.text("");
    //and animate it
    var nextAnimationStep = function() {
        if (text.length > 0) {
            header.text(header.text() + text.substr(0,1));
            text = text.substr(1);
            setTimeout(nextAnimationStep, 100);
        }
    };
    nextAnimationStep();
};

var animateHeaders = function(headers) {
    return Object.keys(headers).map(function(key, index) {
        var elementSelector = key;
        var offset = headers[key];
        var header = $(elementSelector);
        hideHeader(header);
        var waypoint = {};
        waypoint[key] = header.waypoint({
            handler: function() {
                showHeader(header);
                animateHeader(header, header.text());
                this.destroy();
            },
            offset: offset
        })[0];
        return waypoint;
    }).reduce(Object.assign, {});
};

//All ids of titles should be written here to animation work
var animatedHeaders = animateHeaders({
    "#hello_header": '100%',
    "#resume_header": '80%',
    "#portfolio_header": '100%',
    "#testimonials_header": '80%',
    "#blog_header": '80%',
    "#contacts_header": '80%',
    "#donate_header": '80%',
    "#other_posts": '80%'
});
