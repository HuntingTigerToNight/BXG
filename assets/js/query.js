

define(function(){
  var search=window.location.search;
  var array=search.split('?')[1].split('&')||'';
  var obj={};
  array.forEach(function(v){
    var key=v.split('=')[0];
    var value=v.split('=')[1];
    obj[key]=value;
  })
  return obj;
})