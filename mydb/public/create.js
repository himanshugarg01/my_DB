function verifyCreate(que)
{
 
  if(que[1]!="table")
  {
    console.log("table err");
    
    return 0;
  }
  if(que[3]!='(')
  {
    console.log("( err");
    return 0;
  }
  if(que[que.length-1]!=');')
  {
    if(que[que.length-1]!=')')
    return 0;
    console.log("); err");
  }
  var obj={};
  var set=[];
  var k=0;
  for(var i=4;i<que.length-1;)
  {
    set.push(que[i]);
    obj[que[i++]]=que[i++];
    i++;
  }
  console.log(obj);
  var request = new XMLHttpRequest();
  request.addEventListener('load', function()
  {
    
  });
  request.open('POST', '/createTable');
  request.setRequestHeader("Content-Type", "application/json");
  request.send(JSON.stringify({name : que[2],data : set}));
}
