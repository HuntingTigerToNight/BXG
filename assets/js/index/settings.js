/**
 * 功能1 展示个人数据
 * 功能2上传图片
 * 功能3省市三联动
 * 
 * 
*/
require(['/bxg/assets/js/config.js','/bxg/assets/js/common.js'],function(){
  require(['jquery','uploader','template','validate','form'],function($,WebUploader,template){

    //获取个人资料并展示==============================
    options={
      url:'/api/teacher/profile',
      type:'get',
      success:function(info){
        if(info.code===200){
          console.log(info);
          var result=template('tcInfo',{list:info.result});
          $('.settings').html(result);
          $($('input[name="tc_gender"]')[info.result.tc_gender]).attr('checked',true);
          //请求 获取省市区数据
          var $province=$('select[name="tc_province"]');
          var $city=$('select[name="tc_city"]');
          var $district=$('select[name="tc_district"]');
          options={
          url:'/bxg/assets/region.json',
          success:function(info){
            //默认省
            var p=info['p']['000000'];
            var pv=$province.attr('value');
            //默认市
            var c=info['c'][pv];
            var cv=$city.attr('value');
            //默认区
            var d=info['d'][cv];
            var dv=$district.attr('value');

            showOptions($province,p,pv);
            showOptions($city,c,cv);
            showOptions($district,d,dv);
            //省市区三联动
            $province.on('change',function(){
              getOptions($province,$city,info['c']);
              getOptions($city,$district,info['d']);
            });
            $city.on('change',function(){
              getOptions($city,$district,info['d']);
            });

            //更改保存数据
            var pr= $province.val();
            var ci=$city.val();
            var di=$district.val();
            var tcId=$('button').attr('tcId');
            $('form').validate({
              submitHandler:function(){
                $('form').ajaxSubmit({
                  url:'/api/teacher/modify',
                  type:'post',
                  data:{
                    tc_id:tcId,
                    tc_hometown:pr+ci+di
                  },
                  success:function(info){
                    if(info.code===200){
                      console.log(info);
                      window.location.href='/bxg/views/index/dashboard.html'
                    }
                  }
                })
              }
            })
          }
        }
        $.ajax(options);
        }
      }
    }
    $.ajax(options);

    //上传图片=====================================
    $('.settings').on('change','#upfile',function(){
      nativeUploader();
    })
    function nativeUploader(){
      var fileInput=document.getElementById('upfile').files[0];
      var xhr=new window.XMLHttpRequest();
      xhr.open('post','/api/uploader/avatar');
      xhr.onreadystatechange=function(){
        if(xhr.readyState===4&&xhr.status===200){
          var data=JSON.parse(xhr.responseText);
          var img=document.querySelector('.preview img');
          img.src=data.result.path;
        }
      }
      // 使用FormDate对应我们的参数进行包装
      var fd =new window.FormData();
      fd.append('tc_avatar',fileInput);
      xhr.send(fd);
      console.log(fileInput);
    }

    //省市区三级联动==================================
    //显示option
    function showOptions(select,area,v){
      var str='';
      for(var key in area){
        str +=`<option value="${key}">${area[key]}</option>`;
      }
      select.html(str);
      select.val(v).attr('checked',true);
    }
    //改变的option
    function getOptions(select1,select2,level){
      var str='';
      var val=select1.val();
      var obj=level[val];
      for(var key in obj){
        str +=`<option value="${key}">${obj[key]}</option>`
      }
      select2.html(str);
    }
  })
})