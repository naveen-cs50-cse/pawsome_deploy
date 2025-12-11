
    const boxes=document.querySelectorAll(".box");

    
    
 
    boxes.forEach((box)=>{
           const btn=box.querySelector("button")
           
          box.addEventListener("click",(e)=>{
               e.stopPropagation();
             const  dogcat=btn.innerText;
               console.log(dogcat)
             
               
            })
            
        })


