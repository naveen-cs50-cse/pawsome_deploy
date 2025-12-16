const API_URL = 'https://pawsomecareapp-production.up.railway.app/api/auth';


async function bookingemail() {

    const servicename=document.querySelector(".servicename").innerText;
    const address=document.getElementById("address").value;
    const datetime=document.getElementById("datetime").value;
    const msg=document.querySelector(".message");
    
    if(!address || !datetime)
     {
         
         msg.id="message";
         msg.innerText="enter address or 'NONE' "
         

         setTimeout(() => {
             msg.id="";
             msg.innerText="";
         }, 2000);
         return;
     
    }
    // const dropaddr=document.querySelector(".store_addresss").innerText;

     const userRes = await fetch(`${API_URL}/me`, {
            credentials: "include"   });

     let useremail = "";
     if (userRes.ok) {
         const data = await userRes.json();
         useremail = data.user.email;
     }

     

                try{
                    const res =await fetch(`${API_URL}/emailapi`,{
                           method:'POST',
                           headers:{'Content-Type':'application/json'},
                           credentials:'include',
                           body:JSON.stringify({useremail,servicename,address,datetime})
                    })
                    const data=await res.json();

                    if(res.ok)
                    {
                        console.log(data);
                        console.log("email sent for pet grooming")

                        msg.id="message";
                        msg.innerText="booking confirmed and will be emailed";
                        setTimeout(() => {
                                msg.id="";
                                msg.innerText="";
                            }, 2000);   

                    }
                    else{
                        console.log("email not sent");
                    }

                }catch(err){
                    console.log("email error")
                    console.log(err);
                }

    
}


document.querySelector(".submitbtn").addEventListener("click",()=>{
    bookingemail();
})