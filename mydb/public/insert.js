function verifyInsert(que,queArray)
{
  
  //console.log(que);
  if(queArray[1]!="into")
  {
    console.log("into err");
    return 0;
  }
  
  let start,end;
  var col,colValue;
  for(var i=0;i<que.length;i++)
 {
   if(que[i]=='(')
   {
     start=i+1;
   }
   if(que[i]==')')
   {
     end=i;
     col=que.substring(start,end).split(',');
     break;
   }
   
 }
 for(let j=i+1;j<que.length;j++)
 {
   if(que[j]=='(')
   {
     start=j+1;
   }
   if(que[j]==')')
   {
     end=j;
     colValue=que.substring(start,end).split(',');
     break;
   }
 }
 
 //console.log(col,colValue);
 var data=[];
 if(colValue.length!=col.length)
 {
   console.log("col val err");
   return 0;
 }
 var ob={};
 for(let i=0;i<col.length;i++)
 {
  
   ob[col[i]]=colValue[i];
  
 }
 console.log(ob);
 
  console.log(data);
  
  

  var request = new XMLHttpRequest();
  request.addEventListener('load', function()
  {
    
  });
  request.open('POST', '/insertData');
  request.setRequestHeader("Content-Type", "application/json");
  request.send(JSON.stringify({name : queArray[2],'data' : ob}));
 }
