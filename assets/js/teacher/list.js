/**
 * 功能1获取讲师列表
 * 功能2查看功能
 * 功能3启用功能
 * 
*/
require(['/bxg/assets/js/config.js','/bxg/assets/js/common.js'],function(){
  require(['jquery','template','bootstrap'],function($,template){
    // 功能1
    getTeacherList();
    //功能2
    getDetailInfo();
    //功能3
    enableOrLogout();
    //获取讲师列表
    function getTeacherList(){
      options={
        url:'/api/teacher',
        type:'get',
        success:function(info){
          if(info.code===200){
            console.log(info);
            var result=template('tmpl-list',{list:info.result});
            $('#list').html(result);
          }
        }
      }
      $.ajax(options);
    }
    //查看功能
    function getDetailInfo(){
      $('#list').on('click','.preview',function(){
        $('#teacherModal').modal();
        var tcId=$(this).closest('tr').attr('tc-id');
        console.log(tcId);
        options={
          url:'/api/teacher/view',
          type:'get',
          data:{
            tc_id:tcId
          },
          success:function(info){
            if(info.code===200){
              console.log(info);
              var obj=info.result;
              var result=`
                <tr>
                  <th>姓名:</th>
                  <td>${obj.tc_name}</td>
                  <th>职位:</th>
                  <td colspan="3">讲师</td>
                  <td rowspan="4" width="128">
                      <div class="avatar">
                          <img src="${obj.tc_avatar}" alt="">
                      </div>
                  </td>
                </tr>
                <tr>
                    <th>花名:</th>
                    <td>${obj.tc_roster}</td>
                    <th>出生日期:</th>
                    <td colspan="3">${obj.tc_birthday}</td>
                </tr>
                <tr>
                    <th>性别:</th>
                    <td>${obj.tc_gender==='0'?'女':'男'}</td>
                    <th>入职日期:</th>
                    <td colspan="3">${obj.tc_join_date}</td>
                </tr>
                <tr>
                    <th>手机号码:</th>
                    <td colspan="2">${obj.tc_cellphone}</td>
                    <th>邮箱:</th>
                    <td colspan="2">${obj.tc_email}</td>
                </tr>
                <tr>
                    <th>籍贯:</th>
                    <td colspan="6">${obj.tc_hometown}</td>
                </tr>
                <tr>
                    <td colspan="7">
                        <div class="introduce">
                            ${obj.tc_introduce}
                        </div>
                    </td>
                </tr>
                `
              $('.table tbody').html(result);
            }
          }
        }
        $.ajax(options);
      })
    }
    //启用注销功能
    function enableOrLogout(){
      $('#list').on('click','.start-stop',function(){
        var $this=$(this);
        var tcId=$this.closest('tr').attr('tc-id');
        var tcStatus=$this.attr('status');
        options={
          url:'/api/teacher/handle',
          type:'post',
          data:{
            tc_id:'tcId',
            tc_status:tcStatus
          },
          success:function(info){
            if(info.code===200){
              console.log(info);
              $this.text(`${info.result.tc_status===0?'注销':'启用'}`);
              $this.attr('status',info.result.tc_status);
            }
          }
        }
        $.ajax(options);
      })
    }
    //传入出生日期返回年龄
    function getAge(birth){
      var birthYear=new Date(birth).getFullYear();
      var currentYear=new Date().getFullYear();
      return currentYear-birthYear;
    }
    // 使用template过滤器//template.defaults.imports固定语法
    template.defaults.imports.getTcAge=getAge;
  })
})