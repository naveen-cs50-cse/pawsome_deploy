
async function cartpopup()
{
      let carticon =document.querySelector(".cart-icon")
       let cartpop=document.querySelector(".cartpop");
       let body=document.querySelector("body");

       carticon.addEventListener("click",(e)=>{
            e.stopPropagation()
            cartpop.setAttribute("id","cart");
       })
       

      document.querySelector(".container").addEventListener("click", (e) => {
        // If click is NOT inside popup AND NOT on the box → close
        if (!e.target.closest(".cartpop") ) {
            cartpop.id=" ";
        }
    })


}
cartpopup();
     

      //   const phoneinput=document.querySelector(".enter")
      //    phoneinput.addEventListener("input",()=>{
      //       phoneinput.value=phoneinput.value.replace(/[^0-9]/g,'');

      //   if(phoneinput.value.length>10)
      //    {
      //       phoneinput.value=phoneinput.value.slice(0,10);
      //    }
      //   });