$(function () {
  /**
   * SCROLL TOP
   */

  $(window).scroll(function () {
    var curr = $(this).scrollTop()
    // console.log(curr);
    if (curr > 0) {
      $('.btn-top').css({ opacity: 1 })
    } else {
      $('.btn-top').css({ opacity: 0 })
    }
  })

  $('.btn-top').click(function (e) {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })

  /**
   * GNB MENU
   */

  function toggleAsideGnb(active) {
    $('.aside-gnb').toggleClass('on', active)
    $('.aside-gnb')
      .next('.bg-shadow')
      .css('display', active ? 'block' : 'none')
    $('body').toggleClass('body-locked', active)
  }

  $('.gnb-menu').click(function (e) {
    e.preventDefault()
    toggleAsideGnb(true)
  })

  $('.aside-gnb .btn-close, .bg-shadow').click(function (e) {
    e.preventDefault()
    toggleAsideGnb(false)
  })

  // $('.gnb-menu').click(function (e) {
  //   e.preventDefault()
  //   $('.aside-gnb').addClass('on')
  //   $('.aside-gnb').next('.bg-shadow').css('display', 'block')
  // })

  // $('.aside-gnb .btn-close').click(function (e) {
  //   e.preventDefault()
  //   $('.aside-gnb').removeClass('on')
  //   $('.aside-gnb').next('.bg-shadow').css('display', 'none')
  // })

  // $('.bg-shadow').click(function (e) {
  //   e.preventDefault()
  //   $('.aside-gnb').removeClass('on')
  //   $('.aside-gnb').next('.bg-shadow').css('display', 'none')
  // })

  /**
   * VIEW EMAIL INFO
   *  **/
  $(document).on('click', function (e) {
    const emailBox = $('.email-box')
    const btnInfo = $('.btn-info')

    if (
      !emailBox.is(e.target) &&
      emailBox.has(e.target).length === 0 &&
      !btnInfo.is(e.target) &&
      btnInfo.has(e.target).length === 0
    ) {
      emailBox.removeClass('on')
    }
  })

  $('.btn-info').click(function (e) {
    $('.email-box').removeClass('on')
    const emailBox = $(this).next('.email-box')
    emailBox.addClass('on')
  })

  /**
   *  SEARCH BOX
   */

  const searchSlide = new Swiper('.searchSlide', {
    slidesPerView: 'auto',
    spaceBetween: 20,
    centeredSlides: true,
    // loop: true,
    // loopAdditionalSlides: 2,
    pagination: {
      el: '.searchSlideBullet',
      type: 'bullets',
      clickable: true,
    },
  })
  const productSlide = new Swiper('.productSlide', {
    slidesPerView: 'auto',
    spaceBetween: 20,
    centeredSlides: true,
    // loop: true,
    // loopAdditionalSlides: 2,
    pagination: {
      el: '.productSlideBullet',
      type: 'bullets',
      clickable: true,
    },
  })
})



function toggleSearchLayer(active) {
  $('.search-layer').toggleClass('active', active)
  $('.search-layer .bg-shadow').toggleClass('active', active)
  $('header .logo').css('display', active ? 'none' : 'flex')
  $('header .btn-back').css('display', active ? 'flex' : 'none')
  $('.color-layer').css('display', 'none')
  $('body').toggleClass('body-locked', active)
}

$('#searchBtn , .btn-filter').click(function (e) {

  toggleSearchLayer(true)

  if ($(e.target).hasClass('btn-filter')) {
    $('.color-layer').css('display', 'block')
  }
})

$('header .btn-back, .search-layer .bg-shadow').click(function () {
  toggleSearchLayer(false)
})

// $('#searchBtn').click(function () {
//   $('.search-layer').addClass('active')
//   $('.search-layer .bg-shadow').addClass('active');
//   $('header .logo').css('display', 'none');
//   $('header .btn-back').css('display', 'flex');
// })

// $('header .btn-back').click(function () {
//   $('.search-layer').removeClass('active')
//   $('.search-layer .bg-shadow').removeClass('active');
//   $('header .logo').css('display', 'flex');
//   $('header .btn-back').css('display', 'none');
// })

// $('.search-layer .bg-shadow').click(function () {
//   $('.search-layer').removeClass('active')
//   $('.search-layer .bg-shadow').removeClass('active');
//   $('header .logo').css('display', 'flex');
//   $('header .btn-back').css('display', 'none');
// })


$(document).on('click', '.color-layer a', function (e) {
  e.preventDefault();
  $(e.target).parent().addClass('active').siblings().removeClass('active');
  let colorName = $(e.target).data('val');
  let colorCode = $(e.target).data('val2'); 

  addColorFilter(colorName, colorCode);
});

function addColorFilter(name, code) {
  let markup = `     
      <div class="filter-color active" style="background-color: ${code};">
          <span>${name}</span>
          <a href="javascript:;">
              <i class="ico ico-delete"></i>
          </a>
          </div>  
  `;

  $('#selectedColor').html(markup);
}

$(document).on('click', '.filter-color', function (e) {
  $('#selectedColor').empty();
  $('.color-layer').css('display', 'none');
})