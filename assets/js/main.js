/**
 *  SLIDE
 */

var mainSlide = new Swiper('.mainSlide', {
  loop: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false, // 사용자 컨트롤 이후 동작유무
  },
  pagination: {
    el: '.mainSlide .swiper-pagination',
    type: 'progressbar',
  },
})

var bannerSlide = new Swiper('.bannerSlide', {
  loop: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
})

var rankBtnSlide = new Swiper('.rankBtnSlide', {
  slidesPerView: 'auto',
  spaceBetween: 10,
  on: {
    click: function () {
      const clikedIndex = this.clickedIndex
      rankConSlide.slideTo(clikedIndex)
      $('.tabmenu-item')
        .eq(clikedIndex)
        .addClass('active')
        .siblings()
        .removeClass('active')
    },
    slideChangeTransitionEnd: function () {
      const realIndex = this.realIndex
      rankConSlide.slideTo(realIndex)
    },
  },
})

var rankConSlide = new Swiper('.rankConSlide', {
  spaceBetween: 10,
  on: {
    slideChangeTransitionEnd: function () {
      clearInterval(rolling)
      rollingItem(this.realIndex)

      const realIndex = this.realIndex
      rankBtnSlide.slideTo(realIndex)
      $('.tabmenu-item')
        .eq(realIndex)
        .addClass('active')
        .siblings()
        .removeClass('active')
    },
  },
})

var instagramSlide = new Swiper('.instagramSlide', {
  slidesPerView: 'auto',
  pagination: {
    el: '.instagramSlide .swiper-pagination',
    type: 'progressbar',
  },
})

/**
 * RANKING
 */

let rolling
let nowIndex = 0

function rollingItem(index, target) {
  const rankItems = $('.rankConSlide .swiper-slide')
    .eq(index)
    .find('.rank-item') // 해당 슬라이드 내의 rank-item 요소들을 선택합니다.
  nowIndex = target

  function ani() {
    if (nowIndex < rankItems.length) {
      $(rankItems).eq(nowIndex).addClass('active')
      $(rankItems).eq(nowIndex).siblings().removeClass('active')
      nowIndex++
    } else {
      nowIndex = 0
    }
  }
  ani()

  rolling = setInterval(function () {
    ani()
  }, 2000)
}

rollingItem(0)

$('.rank-item').click(function () {
  clearInterval(rolling)
  rollingItem($(this).parents('.swiper-slide').index(), $(this).index())
})

/**
 * DATA
 */

//fetch는 파일로 가져올때 최상단까지 같이 가져와야함

prdList(1, '#recommList')
prdList(2, '#weeklyList')

function prdList(num, frame) {
  fetch('./assets/data/product.json')
    .then((res) => res.json())
    .then((json) => {
      data = json.items
      sortData = data.filter(function (param) {
        return param.mainvis.indexOf(num) >= 0
      })
      let html = ''

      onlineEl = `<span class="badge">온라인단독</span> `
      newEl = `<span class="badge point">NEW</span>`

      sortData.forEach((element) => {

        onlineBadge = (element.badge.online) ? onlineEl : '';
        newBadge = (element.badge.new) ? newEl : '';

        isSale = (!element.price.sale) ? "hide" : "";

        html += `
                <li class="recommend-item">
                    <span class="blind">상품정보</span>
                    <a href="#" class="item-wrap link">
                        <div class="thumb-box">
                            <img class="thumb-image"
                                src="${element.image}"
                                alt="${element.name}">
                        </div>
                        <div class="info-wrap">
                            <em class="brand-name">${element.brand}</em>
                            <h3 class="product-name ellipsis3">${element.name}</h3>
                            <div class="group-price group-flex">
                                <strong class="price-now">${numFormat(element.price.curr)}</strong>
                                <del class="price-origin ${isSale}">${numFormat(element.price.ori)}</del>
                                <em class="percent point ${isSale}">${element.price.sale}%</em>
                            </div>
                            <div class="group-review group-flex">
                                <i class="ico ico-star"></i>
                                <div class="review-box">
                                    <span class="score">${element.review.grade}</span>
                                    <span class="comments">(${numFormat(element.review.cnt)})</span>
                                </div>
                            </div>
                            <div class="group-badge group-flex">
      
                            </div>
                        </div>
                    </a>
                </li>
      `
      })

      $(frame).append(html)
    })
}


function numFormat(number) {
  return number.toLocaleString();
}