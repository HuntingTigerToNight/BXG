
require(['/bxg/assets/js/config.js','/bxg/assets/js/common.js'],function(){
  require(['jquery','/bxg/assets/js/query.js','validate','datepicker','form','Chinese',],function($,obj){

    //编辑讲师
    edit();
    //修改讲师资料
    upData();

    function edit(){
        options={
          url:'/api/teacher/edit',
          type:'get',
          data:{
            tc_id:obj.tcId
          },
        success:function(info){
          if(info.code===200){
            console.log(info);
            $('input[name="tc_name"]').val(info.result.tc_name);
            $('input[name="tc_join_date"]').val(info.result.tc_join_date);
            $('select[name="tc_type"]').val(info.result.tc_type);
            var num=info.result.tc_gender==0?1:0;
            $($('input[name="tc_gender"]')[num]).attr('checked',true);
          }
        }
      }
      $.ajax(options);
    }

    function upData(){
      //日期插件
      var options={
        format:'yyyy年mm月dd日',
        todayHighlight:true,
        language:'zh-CN'
      }
      $('input[name="tc_join_date"]').datepicker(options);
      
      //表单验证
      $('form').validate({
        submitHandler:function(){
          $('form').ajaxSubmit({
            url:'/api/teacher/update',
            type:'post',
            data:{
              tc_id:obj.tcId
            },
            success:function(info){
              if(info.code===200){
                window.location.href='/bxg/views/teacher/list.html';
              }
            }
          })
        },
        rules:{
          tc_name:{
            required:true,
            rangelength:[2,10]
          },
          tc_join_date:{
            required:true
          }
        },
        messages:{
          tc_name:{
            required:'用户名不能为空!',
            rangelength:'长度必须为2到10字符!'
          },
          tc_join_date:{
            required:'日期不能为空!'
          }
        }
      })
    }
  })
})

