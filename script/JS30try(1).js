var check=document.getElementsByClassName("select"); 
    
function checkevent(e){   
    var input1=check[0].getElementsByTagName("input");
    var input2=check[1].getElementsByTagName("input");
    
    //state(1)save.event
    var temp=[];       
        for(var i=1;i<input1.length;i++){
            if(input1[i].checked==true){
                temp.push(input1[i].value);
            }
        }
        for(var j=1;j<input2.length;j++){
            if(input2[j].checked==true){
                temp.push(input2[j].value);
            }
        }
    var state=temp.join('&');
    var url=window.location.pathname+'?input='+state;
    history.pushState(state,'',url);
    
    //checkall && checknothing.event  
    if(e.target.id=="alladdress"){
        if(input1[0].checked==true){
            input1[1].checked=true;
            input1[2].checked=true;
            input1[3].checked=true;
            //console.log("1");
        }
        else{
            input1[1].checked=false;
            input1[2].checked=false;
            input1[3].checked=false;
            //console.log("4");
        }
    }
    else{
        if(input1[1].checked==true && input1[2].checked==true && input1[3].checked==true){
            input1[0].checked=true;
            //console.log("2");
        }
        else{
            input1[0].checked=false;
            //console.log("3");
        }    
    }
    if(e.target.id=="allgoods"){
        if(input2[0].checked==true){
            input2[1].checked=true;
            input2[2].checked=true;
            input2[3].checked=true;
            //console.log("1");
        }
        else{
            input2[1].checked=false;
            input2[2].checked=false;
            input2[3].checked=false;
            //console.log("4");
        }
    }
    else{
        if(input2[1].checked==true && input2[2].checked==true && input2[3].checked==true){
            input2[0].checked=true;
            //console.log("2");
        }
        else{
            input2[0].checked=false;
            //console.log("3");
        }    
    }
    
}
 //-1.1onpopstate.event   
 window.onpopstate=function(){runstate();} 
 function runstate(){
   var hash=decodeURI(window.location.search.split('=')[1]);
   //(1)checkbox.checked.event
   var input1=check[0].getElementsByTagName("input");
   var input2=check[1].getElementsByTagName("input");
   for(var i=1;i<4;i++){
       if(hash.indexOf(input1[i].value)!=-1){
           input1[i].checked=true;
       }
       else{
           input1[i].checked=false;
       }
       if(hash.indexOf(input2[i].value)!=-1){
           input2[i].checked=true;
       }
       else{
           input2[i].checked=false;
       }
   }
   if(input1[1].checked==true && input1[2].checked==true && input1[3].checked==true){
       input1[0].checked=true;
   }else{
       input1[0].checked=false;
   }
   if(input2[1].checked==true && input2[2].checked==true && input2[3].checked==true){
       input2[0].checked=true;
   }else{
       input2[0].checked=false;
   }

   //(2)table && bar && line.event
 }
