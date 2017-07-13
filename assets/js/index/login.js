

require(['/bxg/assets/js/config.js'],function(){
  require(['jquery','cookie'],function($){
    //获取变量
    var $btn=$('.btn'),
      userName=$('#name').val(),
      password=$('#pass').val();
    // 点击事件
    $btn.on('click',clickHandler)
    function clickHandler (e){
      e.preventDefault();
      //判断用户名和密码是否为空
      if(!userName.trim()||!password.trim()){
        return;
      }
      options={
        url:'/api/login',
        type:'post',
        data:{
          tc_name:userName,
          tc_pass:password
        },
        success:function(info){
          if(info.code===200){
            console.log(info);
            $.cookie('userInfo',JSON.stringify(info.result),{expires:7,path:'/'});
            window.location.href='/bxg/views/index/dashboard.html';
          }
        }
      }
      $.ajax(options);
    }
  })
})