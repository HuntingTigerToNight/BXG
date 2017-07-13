
/**
 * 这里就完成其他页面公共要使用的功能!
 * 功能1: 判断用户是否登陆
 * 功能2: 从cookie读取用户的资料，并展示
 * 功能3: 导航菜单交互(展开与收起!)
 * 功能4: 退出登陆
 * 功能5: 让页面打开时有进度条，让每个ajax发送过程有进度
 */

define(['jquery','nprogress','cookie'],function($,NProgress){
  NProgress.start();
  //功能1
  isLogin();
  //功能2
  getInfo();
  //功能3
  navToggle();
  //功能4
  logOut();
  //功能5
  globalAjaxEvent();


  function isLogin(){
    var sessionId=$.cookie('PHPSESSID');
    if(!sessionId){
      window.location.href='/bxg/views/index/login.html';
    }
  }

  function getInfo(){
    var userInfo=JSON.parse($.cookie('userInfo'));
    $('.profile .avatar img').attr('src',userInfo.tc_avatar);
    $('.profile h4').text(userInfo.tc_name);
  }

  function navToggle(){
    $('.arrow').closest('a').on('click',function(){
      $(this).next('.list-unstyled').slideToggle();
    })
  }

  function logOut(){
    $('.fa-sign-out').closest('a').on('click',clickHandler)
    function clickHandler(){
      options={
        url:'/api/logout',
        type:'post',
        success:function(info){
          console.log(info);
          if(info.code==200){
            window.location.href='/bxg/views/index/login.html';
          }
        }
      }
      $.ajax(options);
    }
  }

  function globalAjaxEvent(){
    $(document).ajaxStart(function(){
      NProgress.start();
    })
    $(document).ajaxStop(function(){
      NProgress.done();
    })
    $(function(){
      NProgress.done();
    })
  }
})
