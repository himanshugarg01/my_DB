var tableName;
function selectCommand(que,queArray)
      {
        console.log(que);
        
        if(que.search('from')!=-1)
        {
          var demo=que.split('from');
          for(i in demo)
          {
            demo[i]=demo[i].trim();
          }
          var colFilter=demo[0].split(',');
          for(i in colFilter)
          {
            colFilter[i]=colFilter[i].trim();
          }
          console.log(colFilter);
          
          console.log(demo);
          tableName=demo[1];
        }
        else{
          alert("from not found");
        }
        
        
        var request = new XMLHttpRequest();
        request.addEventListener('load', function()
        {
          var finalOp=[];
          var data=JSON.parse(request.responseText);
          if(colFilter.length==1&&colFilter[0]=='*')
          {
             finalOp=data;
          }
          else
          {
             for(i in data)
             {
              var ob={};
               for(j in colFilter)
               {
                ob[colFilter[j]] = data[i][colFilter[j]];
               }
               finalOp.push(ob);
             }
            
             
          }
          console.log(finalOp);
          var opt=document.getElementById('output');
         // console.log(data);
          opt.appendChild(document.createTextNode(finalOp));
          
        });
        request.open('POST', '/selectData');
        request.setRequestHeader("Content-Type", "application/json");
        request.send(JSON.stringify({name : tableName,col : colFilter}));
       
      }
