var btnor=document.querySelector(".btnor");
var resultbtn=document.querySelector(".resultbtn");
var savebtn=document.querySelector(".savebtn");
var record=document.querySelector(".record");
var today=new Date();
var time=today.getFullYear()+'年'+(today.getMonth()+1)+'月'+today.getDate()+'日'
var database=JSON.parse(localStorage.getItem("healthdata"))||[];

resultbtn.addEventListener('click',count,false);
savebtn.addEventListener('click',addlist,false);
record.addEventListener('click',toggleDone,false);
updatalist(database);

//計算與顯示結果
function count(e){
  var tallcm=parseInt(document.querySelector("#indatacm").value)*0.01;
  var weightkg=parseInt(document.querySelector("#indatakg").value);
  var result=weightkg/(tallcm*tallcm);
  var ans=result.toFixed(1);
  console.log(result);
  if(result<=17.9){
     btnor.innerHTML='<div class="box1">\
                       <p style="text-align:center;font-size:32px;padding-top:35px;">'+ans+'</p>\
                       <p style="text-align:center;padding-bottom:25px;">BMI</p>\
                       <p style="text-align:center;font-size:24px;line-height:2;">過輕</p>\
                       </div>';
  }
     else if(18.0<=result && result<=23.9){
      btnor.innerHTML='<div class="box2">\
                     <p style="text-align:center;font-size:32px;padding-top:35px;">'+ans+'</p>\
                     <p style="text-align:center;padding-bottom:25px;">BMI</p>\
                     <p style="text-align:center;font-size:24px;line-height:2;">理想</p>\
                     </div>';
}   
  
    else if(24.0<=result && result<=27.9){
      btnor.innerHTML='<div class="box3">\
                     <p style="text-align:center;font-size:32px;padding-top:35px;">'+ans+'</p>\
                     <p style="text-align:center;padding-bottom:25px;">BMI</p>\
                     <p style="text-align:center;font-size:24px;line-height:2;">過重</p>\
                     </div>';
}
   
     else if(result>=28.0){ 
      btnor.innerHTML='<div class="box4">\
                     <p style="text-align:center;font-size:32px;padding-top:35px;">'+ans+'</p>\
                     <p style="text-align:center;padding-bottom:25px;">BMI</p>\
                     <p style="text-align:center;font-size:24px;line-height:2;">肥胖</p>\
                     </div>';          
     }

     else if(result="NAN"){
         alert("您未輸入數值");
         return;
       }   
     }


//加入列表並同步更新網頁與localstorage
function addlist(e){ 
var tallcm=parseInt(document.querySelector("#indatacm").value);
var weightkg=parseInt(document.querySelector("#indatakg").value);
var result=weightkg/(tallcm*tallcm*0.01*0.01);
var ans=result.toFixed(1);
console.log(ans);
function memo(){
  if(result<=17.9){
    Results='過輕'; 
    addcolor='<div class="add1"></div>';
   }
    else if(18.0<=result && result<=23.9){
     Results='理想';
     addcolor='<div class="add2"></div>';
    }
    else if(24.0<=result && result<=27.9){
     Results='過重';
     addcolor='<div class="add3"></div>';
    }
   else if(result>=28.0){
     Results='肥胖';
     addcolor='<div class="add4"></div>';
     }
   else {
   alert("您未輸入數據");
   }
}
memo();
var list={
    Tall:tallcm,
    Wei:weightkg,
    Ans:ans,
    Fina:Results,
    Addcolor:addcolor,
    Time:time,
      }; 

  database.push(list);
  updatalist(database);
  localStorage.setItem("healthdata",JSON.stringify(database));
}


//更新網頁內容
function updatalist(item){
  var str="";
  var len=item.length;
   for(var i=0;i<len;i++){
     str+='<li class="notebook"><a href="#"data-index='+i+'>刪除</a><span style="margin-left:30px";>'+item[i].Addcolor+''+item[i].Fina+'</span><span class="small">BMI</span>'+item[i].Ans+'<span class="small">weight</span>'+item[i].Wei+'kg<span class="small">height</span>'+item[i].Tall+'cm<span class="small">'+item[i].Time+'</span></li>';
     }
     record.innerHTML=str;
}


//刪除功能
  function toggleDone(e){
        e.preventDefault();
        if(e.target.nodeName!=='A'){return};
        var index=e.target.dataset.index;
        database.splice(index,1);
        localStorage.setItem("healthdata",JSON.stringify(database));
        updatalist(database);
       }
      






  




