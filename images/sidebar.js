$(function(){
  function sideScript(){
    function insertIcon(){
      const $linkItem = $('.category_list li > a');
      const $linkNameLoad = decodeURI(window.location.pathname);
      const $linkName = $linkNameLoad.split('/');
      const $listDep = $linkName.map(x => x.toLowerCase().replace(/%2c|\s|[\(\d\)]|\,|\%/g,'').trim());
      const $linkDep00 = $listDep[1];
      const $linkDep01 = $listDep[2];
      const $linkDep02 = $listDep[3];
      
      $linkItem.each(function(){
        const $linkItemTxt = $(this).text().toLowerCase().replace(/%2c|\s|[\(\d\)]|\,|\%/g,'').trim();
        const $linkTxtChk = categoryIcon[$linkItemTxt] ? true : false;
        
        if($linkTxtChk){
            $(this).prepend(categoryIcon[$linkItemTxt]);
        }
      });
      // 현재 활성화된 페이지 표시
      if($listDep.includes($linkDep01) || $listDep.includes($linkDep02)){
        $linkItem.each(function(){
          const $linkDepName = $(this).text().toLowerCase().replace(/%2c|\s|[\(\d\)]|\,|\%/g,'').trim();
          // 1depth
          if($linkDep01 == $linkDepName){
            $(this).parent('li').addClass('active');
            $(this).siblings('.sub_category_list').slideDown(100);
          }
          // 2depth
          if($linkDep02 == $linkDepName){
            $(this).parent('li').addClass('selected');
          }
        });
      }
      // 전체보기 탭 활성화
      if($linkDep00 == 'category' && $linkDep01 == undefined){
        $('.link_tit').addClass('active');
      }
    }
    insertIcon();
  }
  sideScript();

  // LNB 하위 메뉴 열기/닫기 버튼추가 및 기능
  var categoryList = $(".category_list > li");
  categoryList.each(function(){
    var categoryBtn = $(this).find(".link_item"),
      subCategory = categoryBtn.siblings('ul');
  
      if(subCategory.length == 1){
      // 버튼추가
      categoryBtn.parent('li').addClass('more');

      // 열고 닫힘
      categoryBtn.on('click', function(e){
        e.preventDefault();
        if(subCategory.parent('li').hasClass('active')){
          subCategory.parent('li').removeClass('active');
          subCategory.slideUp(100);
        }else{
          subCategory.parent('li').removeClass('active');
          subCategory.parent('li').addClass('active');
          subCategory.slideDown(100);
        }
      })
    }
  })

  /*** LNB 관련 기능 ***/
  const $aside = $(".sidebar")
  const $lnbBtn = $(".lnbBtn")
  const $lnbCloseBtn = $(".lnbCloseBtn")

  /* LNB 반응형 */
  $(window).on('resize', function(){
    if($(window).width() <= 1700) {
      $('body').removeClass('toggleMode')
      $('body').addClass('toggleMode')
    } else {
      $('body').removeClass('toggleMode')
    }
  }).trigger('resize')

  /* LNB 열기,닫기 기능 */
  $lnbBtn.on('click', function(e) {
    e.stopPropagation(); // 이벤트 버블링 방지
    $aside.removeClass('open')
    $aside.addClass('open')
    $('.dimmed').css('display', 'block');
    // $('body').css('overflow', 'hidden');
  })

  $lnbCloseBtn.on('click', function() {
    $aside.removeClass('open')
    $('.dimmed').css('display', 'none');
    // $('body').css('overflow', '');
  })
  $(document).on('click', function(e) {
    if(!$(e.target).closest($aside).length) {
      $aside.removeClass('open')
      $('.dimmed').css('display', 'none');
      // $('body').css('overflow', '');
    }
  })

})