window.onload = function() {
  scrollToAlert();
};

function scrollToAlert() {
  const alertElement = document.getElementById('alrt');
  
  if (alertElement) {
      alertElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}
function navigate(page) {
  fetch(page)
      .then(response => response.text())
      .then(data => {
        if (page == 'home.html') {
          document.querySelector('.footer').style.display = 'none';
          const homeContent = document.querySelector('#home-content');
          homeContent.style.display = 'block';
      } else  {
          const homeContent = document.querySelector('#home-content');
          document.querySelector('.footer').style.display = 'block';

          if (homeContent) {
      
            homeContent.style.display = 'none';
          }
            document.getElementById('content').innerHTML = data;
            console.log();
         
          }
      })
      .catch(error => console.error('Error loading the page:', error));
}

document.addEventListener('DOMContentLoaded', function() {
  homeData();
  document.querySelector('.footer').style.display = 'none';
});

function homeData(){
  let main_catagories = document.querySelector("#main-catagories");
let all_data;
getCategoriesData("FashionTrends");
const categories = ["FashionTrends", "TargetDemographics", "BrandCategories"];
categories.forEach((element) => {
  let btn_catagories = document.createElement("button");
  btn_catagories.classList.add(
    "stext-106",
    "cl6",
    "hov1",
    "bor3",
    "trans-04",
    "m-r-32",
    "m-tb-5"
  );
  btn_catagories.textContent = element;
  btn_catagories.addEventListener("click", () => getCategoriesData(element));
  main_catagories.appendChild(btn_catagories);
});
}

function getCategoriesData(category) {
  return fetch("http://localhost:3000/data")
    .then((response) => response.json())
    .then((data) => {
      data = data[0];
      all_data = data[category];
      getSubCategoriesData(data[category]);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function getSubCategoriesData(data) {
  setDataAll(all_data);
  document.querySelector("#sub-categories").innerHTML = "";
  data.forEach((element) => {
    let sub_categories = document.querySelector("#sub-categories");
   
    
    let subCategoriesDiv = document.createElement("div");
    subCategoriesDiv.classList.add("filter-col1", "p-r-15", "p-b-27");
    subCategoriesDiv.id = element.id;
    let subCategoriesHTML = `
			<div class="mtext-102 cl2 p-b-15">
      <button onclick="setData(${element.id})" >
				${element.name}
        </button>
			</div>
			<ul>
		`;
    element.sub_categories.forEach((subCategory) => {
      subCategoriesHTML += `
				<li class="p-b-6">
        	<button onclick="setData(${subCategory.id})" >
          ${subCategory.name}
	        </button>
				</li>
			`;
    });

    subCategoriesHTML += `</ul>
	
	`;
    subCategoriesDiv.innerHTML = subCategoriesHTML;
    sub_categories.appendChild(subCategoriesDiv);
  });
}

function setData(id) {
  let filter_data;
  const idStr = String(id);
  if (idStr.length > 1) {
    filter_data = filterSubCategories(all_data, id);
  } else {
    console.log(all_data);
    filter_data = all_data.filter((category) => category.id === id);
  }
  console.log(filter_data);
  setDataAll(filter_data);
}

function filterSubCategories(data, desiredId) {
  return data
    .map((category) => {
      const filteredSubCategories = category.sub_categories.filter(
        (subCategory) => subCategory.id == desiredId
      );

      return {
        ...category,
        sub_categories: filteredSubCategories,
      };
    })
    .filter((category) => category.sub_categories.length > 0);
}
function setDataAll(data) {
  document.querySelector("#main-data-cards").innerHTML = "";
  data.forEach((element) => {
    let sub_categories = element.sub_categories;
    sub_categories.forEach((sub_category) => {
      sub_category.data.forEach((data) => {
        let cards_container = document.querySelector("#main-data-cards");
        let card = document.createElement("div");
        card.classList.add(
          "col-sm-6",
          "col-md-4",
          "col-lg-3",
          "p-b-35",
          "cards_custom"
        );
        card.innerHTML = `
          <div class="block2 d-flex flex-column align-items-center" >
               <div type="button" onclick='openModal(${JSON.stringify(data)})' class="block2-pic hov-img0 text-center " data-toggle="modal" data-target="#exampleModal">
                 <img src="${data.img}" alt="IMG-PRODUCT" id="js-show-modal1" style=" width: 260px; height: 320px;">
               </div>
      
               <div class="block2-txt flex-w flex-t p-t-14"  style=" width: 260px;">
                 <div class="block2-txt-child1 flex-col-l ">
                   <a href="product-detail.html" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                   ${data.name}
                   </a>
      
                   <span class="stext-105 cl3">
                   $ ${data.price}
                   </span>
                 </div>
                 <div class="block2-txt-child2 flex-r p-t-3">
                 <button onclick='addToCart(${JSON.stringify(data)})'>
                 <a  class="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                  <i class="zmdi zmdi-shopping-cart" 
       style="font-size: 24px;
      color: #838383;
       "
                  
  ></i>
                 </a>
                 </button>
                 </div>
               </div>
             </div>
        `;
        cards_container.appendChild(card);
      });
    });
  });
}



function addToCart(newItem){
  newItem.id = String(newItem.id);
  fetch('http://localhost:3000/add_to_cart', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json' 
    },
    body: JSON.stringify(newItem) 
  })
    .then(response => response.json())
    .then(data => {
        console.log('Item added:', data); 
    })
    .catch(error => {
        console.error('Error adding item:', error); 
    });
};




function openModal(data) {
  console.log(data);
  let modalData = document.querySelector('#modal-data');
  modalData.innerHTML = `
  <div class="container">
    <div class="bg0 p-lr-15-lg how-pos3-parent">
      <div class="row">
        <div class="col-md-6 col-lg-7 p-b-30">
          <div class="p-l-25 p-r-30 p-lr-0-lg">
            <div class="wrap-slick3 flex-sb flex-w">
              <div class="slick3 gallery-lb slick-initialized slick-slider slick-dotted">
                <div class="slick-list draggable">
                  <div class="slick-track" style="opacity: 1;">
                    <div class="item-slick3 slick-slide slick-current slick-active">
                      <div class="wrap-pic-w pos-relative">
                        <img src="${data.img}" alt="IMG-PRODUCT">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-5 p-b-30">
          <div class="p-r-50 p-t-5 p-lr-0-lg">
            <h4 class="mtext-105 cl2 js-name-detail p-b-14">
              ${data.name}
            </h4>
            <span class="mtext-106 cl2">
              ${data.product_description}
            </span>
            <p class="stext-102 cl3 p-t-23">
              ${data.product_description}
            </p>
            <div class="p-t-33">
              <div class="d-flex flex-w flex-col-sa">
                <div class="product_color">
                  <span>Color:</span>
                  <ul>
                    ${data.color_options.map(color => `<li style="background: ${color};"></li>`).join('')}
                  </ul>
                </div>
                <div class="product_specifications pt-2">
                  <span>Specifications:</span>
                  <ul>
                    <li>Material: ${data.product_specifications.material}</li>
                    <li>Sizes: ${data.product_specifications.sizes.join(', ')}</li>
                    <li>Care Instructions: ${data.product_specifications.care_instructions}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="size-204 flex-w flex-m respon6-next pt-4">
										<button class="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 js-addcart-detail"  onclick='addToCart(${JSON.stringify(data)})'>
											To cart
										</button>
                    </div>
           </div>
      </div>
    </div>
  </div>
  `;
}







(function ($) {
    "use strict";

    /*[ Load page ]
    ===========================================================*/
    $(".animsition").animsition({
        inClass: 'fade-in',
        outClass: 'fade-out',
        inDuration: 1500,
        outDuration: 800,
        linkElement: '.animsition-link',
        loading: true,
        loadingParentElement: 'html',
        loadingClass: 'animsition-loading-1',
        loadingInner: '<div class="loader05"></div>',
        timeout: false,
        timeoutCountdown: 5000,
        onLoadEvent: true,
        browser: [ 'animation-duration', '-webkit-animation-duration'],
        overlay : false,
        overlayClass : 'animsition-overlay-slide',
        overlayParentElement : 'html',
        transition: function(url){ window.location.href = url; }
    });
    
    /*[ Back to top ]
    ===========================================================*/
    var windowH = $(window).height()/2;

    $(window).on('scroll',function(){
        if ($(this).scrollTop() > windowH) {
            $("#myBtn").css('display','flex');
        } else {
            $("#myBtn").css('display','none');
        }
    });

    $('#myBtn').on("click", function(){
        $('html, body').animate({scrollTop: 0}, 300);
    });


    /*==================================================================
    [ Fixed Header ]*/
    var headerDesktop = $('.container-menu-desktop');
    var wrapMenu = $('.wrap-menu-desktop');

    if($('.top-bar').length > 0) {
        var posWrapHeader = $('.top-bar').height();
    }
    else {
        var posWrapHeader = 0;
    }
    

    if($(window).scrollTop() > posWrapHeader) {
        $(headerDesktop).addClass('fix-menu-desktop');
        $(wrapMenu).css('top',0); 
    }  
    else {
        $(headerDesktop).removeClass('fix-menu-desktop');
        $(wrapMenu).css('top',posWrapHeader - $(this).scrollTop()); 
    }

    $(window).on('scroll',function(){
        if($(this).scrollTop() > posWrapHeader) {
            $(headerDesktop).addClass('fix-menu-desktop');
            $(wrapMenu).css('top',0); 
        }  
        else {
            $(headerDesktop).removeClass('fix-menu-desktop');
            $(wrapMenu).css('top',posWrapHeader - $(this).scrollTop()); 
        } 
    });


    /*==================================================================
    [ Menu mobile ]*/
    $('.btn-show-menu-mobile').on('click', function(){
        $(this).toggleClass('is-active');
        $('.menu-mobile').slideToggle();
    });

    var arrowMainMenu = $('.arrow-main-menu-m');

    for(var i=0; i<arrowMainMenu.length; i++){
        $(arrowMainMenu[i]).on('click', function(){
            $(this).parent().find('.sub-menu-m').slideToggle();
            $(this).toggleClass('turn-arrow-main-menu-m');
        })
    }

    $(window).resize(function(){
        if($(window).width() >= 992){
            if($('.menu-mobile').css('display') == 'block') {
                $('.menu-mobile').css('display','none');
                $('.btn-show-menu-mobile').toggleClass('is-active');
            }

            $('.sub-menu-m').each(function(){
                if($(this).css('display') == 'block') { console.log('hello');
                    $(this).css('display','none');
                    $(arrowMainMenu).removeClass('turn-arrow-main-menu-m');
                }
            });
                
        }
    });


    /*==================================================================
    [ Show / hide modal search ]*/
    $('.js-show-modal-search').on('click', function(){
        $('.modal-search-header').addClass('show-modal-search');
        $(this).css('opacity','0');
    });

    $('.js-hide-modal-search').on('click', function(){
        $('.modal-search-header').removeClass('show-modal-search');
        $('.js-show-modal-search').css('opacity','1');
    });

    $('.container-search-header').on('click', function(e){
        e.stopPropagation();
    });


    /*==================================================================
    [ Isotope ]*/
    var $topeContainer = $('.isotope-grid');
    var $filter = $('.filter-tope-group');

    // filter items on button click
    $filter.each(function () {
        $filter.on('click', 'button', function () {
            var filterValue = $(this).attr('data-filter');
            $topeContainer.isotope({filter: filterValue});
        });
        
    });



    var isotopeButton = $('.filter-tope-group button');

    $(isotopeButton).each(function(){
        $(this).on('click', function(){
            for(var i=0; i<isotopeButton.length; i++) {
                $(isotopeButton[i]).removeClass('how-active1');
            }

            $(this).addClass('how-active1');
        });
    });

    /*==================================================================
    [ Filter / Search product ]*/
    $('.js-show-filter').on('click',function(){
        $(this).toggleClass('show-filter');
        $('.panel-filter').slideToggle(400);

        if($('.js-show-search').hasClass('show-search')) {
            $('.js-show-search').removeClass('show-search');
            $('.panel-search').slideUp(400);
        }    
    });

    $('.js-show-search').on('click',function(){
        $(this).toggleClass('show-search');
        $('.panel-search').slideToggle(400);

        if($('.js-show-filter').hasClass('show-filter')) {
            $('.js-show-filter').removeClass('show-filter');
            $('.panel-filter').slideUp(400);
        }    
    });




    /*==================================================================
    [ Cart ]*/
    $('.js-show-cart').on('click',function(){
        $('.js-panel-cart').addClass('show-header-cart');
    });

    $('.js-hide-cart').on('click',function(){
        $('.js-panel-cart').removeClass('show-header-cart');
    });

    /*==================================================================
    [ Cart ]*/
    $('.js-show-sidebar').on('click',function(){
        $('.js-sidebar').addClass('show-sidebar');
    });

    $('.js-hide-sidebar').on('click',function(){
        $('.js-sidebar').removeClass('show-sidebar');
    });

    /*==================================================================
    [ +/- num product ]*/
    $('.btn-num-product-down').on('click', function(){
        var numProduct = Number($(this).next().val());
        if(numProduct > 0) $(this).next().val(numProduct - 1);
    });

    $('.btn-num-product-up').on('click', function(){
        var numProduct = Number($(this).prev().val());
        $(this).prev().val(numProduct + 1);
    });

    /*==================================================================
    [ Rating ]*/
    $('.wrap-rating').each(function(){
        var item = $(this).find('.item-rating');
        var rated = -1;
        var input = $(this).find('input');
        $(input).val(0);

        $(item).on('mouseenter', function(){
            var index = item.index(this);
            var i = 0;
            for(i=0; i<=index; i++) {
                $(item[i]).removeClass('zmdi-star-outline');
                $(item[i]).addClass('zmdi-star');
            }

            for(var j=i; j<item.length; j++) {
                $(item[j]).addClass('zmdi-star-outline');
                $(item[j]).removeClass('zmdi-star');
            }
        });

        $(item).on('click', function(){
            var index = item.index(this);
            rated = index;
            $(input).val(index+1);
        });

        $(this).on('mouseleave', function(){
            var i = 0;
            for(i=0; i<=rated; i++) {
                $(item[i]).removeClass('zmdi-star-outline');
                $(item[i]).addClass('zmdi-star');
            }

            for(var j=i; j<item.length; j++) {
                $(item[j]).addClass('zmdi-star-outline');
                $(item[j]).removeClass('zmdi-star');
            }
        });
    });
    
    /*==================================================================
    [ Show modal1 ]*/
    $('#js-show-modal1').on('click',function(e){
        console.log(js-show-modal1);
        
        e.preventDefault();
        $('.js-modal1').addClass('show-modal1');
    });

    $('.js-hide-modal1').on('click',function(){
        $('.js-modal1').removeClass('show-modal1');
    });



})(jQuery);



