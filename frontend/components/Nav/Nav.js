"use strict";

// store query in var for prevent query execution on every time
// when navbar toggle clicked
let _$navbarToggleDash = $('.navbar-toggle__dash');

  // was need for iphone-like navbar hiding
  // _previousBodyScrollTop = document.body.scrollTop;

const navbar = {

  makeNavbarToggleable() {

    $('.navbar-toggle-wrapper')
    .click(_$navbarToggleDash, function (event) {
      $(this)
        .toggleClass('navbar-toggle-wrapper_open');

        _$navbarToggleDash
        .eq(1)
          .toggleClass('navbar-toggle__dash_middle_clockwise')
          .end()
        .eq(2)
          .toggleClass('navbar-toggle__dash_middle_counter-clockwise');

      // write like this, cause of .css() func work more properly with
      // full css name. In styles transition property also writed in
      // longhand style, cause of css cascading and shorthand prop style
      $('.nav-item')
        .css('transition-delay', function (index, oldValue) {
          return `${.2 * index}s`;
        })
        .toggleClass('nav-item_seo-friendly-hide')
        // avoiding making redundant transition-delay after every click
        .css('transition-delay', function (index, oldValue) {
          if ( (oldValue !== '0s') && !$(this).hasClass('nav-item_seo-friendly-hide') ) {
            return '';
          }
        });
    });
  },

  makeNavbarScrollable() {

    /***** start of classic navbar scroll *****/
    // had to write it like this, don`t know why, but
    // wrapping in jQuery obj doesn`t work with document.body
    let $navbar = $('.navbar'),
      body = document.body;

    body.onscroll = function (event) {

      if (body.scrollTop >= $navbar.outerHeight()) {

        if ($navbar.hasClass('navbar_fixed')) {
          return;
        }

        $navbar
        .addClass('navbar_fixed');
      } else {
        $navbar
        .removeClass('navbar_fixed');
      }
    }
    /***** end of classic navbar scroll *****/

    /***** start of iphone-like adress line *****/
    // TODO: it doesn`t work properly something like iphone
    // NOTE: jQuery doesn`t animate transform, but velocity does
    // looks like GSAP more cooler and stressed the performance
    // Maybe see this feature later with gsap
    // NOTE: Ofcourse, we can manage the transform via classes
  //   let self = this;
  //
  //   document.body
  //   .onscroll = function () {
  //
  //     console.log('in onscroll event');
  //
  //     let $navbar = $('.navbar'),
  //       _bodyScrollTop = document.body.scrollTop,
  //       navbarOuterHeight = $navbar.outerHeight();
  //
  //     console.log('bodyScrollTop is: ' + _bodyScrollTop);
  //     console.log(`previousBodyScrollTop is ${_previousBodyScrollTop}`);
  //     console.log(`navbar outerHeight is ${navbarOuterHeight}`);
  //     if ((_bodyScrollTop >= navbarOuterHeight) && (_previousBodyScrollTop > _bodyScrollTop)) {
  //
  //       console.log('in need to show navbar');
  //
  //       if ($navbar.hasClass('navbar-showed')) {
  //
  //         console.log('in navbar allready showed \n');
  //         return;
  //       }
  //
  //       $navbar
  //       .addClass('navbar-showed')
  //       .css({'transform': 'translateY(-100%)',
  //       'position': 'fixed'})
  //       .animate({'transform': 'translateY(0)'},
  //       400);
  //       console.log('navbar classes: ' + $navbar.get(0).className + '\n');
  //
  //     } else if (((_bodyScrollTop < navbarOuterHeight) || (_bodyScrollTop > _previousBodyScrollTop))) {
  //
  //       $navbar.hasClass('navbar-showed') ? $navbar.removeClass('navbar-showed') : '' ;
  //
  //       $navbar
  //       .animate({'transform': 'translateY(0)'},
  //       400, function () {
  //         $navbar.css({});
  //       });
  //
  //       console.log('in need to hide navbar \n');
  //     }
  //
  //     self.rememberBodyScrollTop(_bodyScrollTop);
  //   };
  //
  // },
  //
  // rememberBodyScrollTop(scrollTop) {
  //   _previousBodyScrollTop = scrollTop;
  // }
  /***** end of iphone-like adress line *****/
  }
};

export default navbar;
