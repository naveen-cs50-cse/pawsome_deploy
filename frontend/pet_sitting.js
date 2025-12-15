    const API_URL = 'https://pawsome-41bj.onrender.com/api/auth';


    
    async function sitting_booking()
    {
        // at start of sitting_booking()
                 const valid = await window.validateDatetimeBeforeSubmit();
                 if (!valid.ok) {
                   const msg = document.querySelector(".message");
                   msg.style.display = "block";
                   msg.style.backgroundColor = 'red';
                   msg.innerText = valid.msg;
                   setTimeout(() => { msg.style.display = "none"; }, 2000);
                   return; // stop submission
                 }

        console.log("booking attempt.....")
       
           // FETCH USER FIRST
            const userRes = await fetch("https://pawsome-41bj.onrender.com/api/auth/me", {
                                 credentials: "include"
                             });

                             let useremail = "";
                             if (userRes.ok) {
                                 const data = await userRes.json();
                                 useremail = data.user.email;
                             }

                             

        const servicename=document.querySelector(".sitting_service_type").innerText;
        const address=document.querySelector("#input_address").value;
        const datetime=document.querySelector("#datetime_sitting").value;
        
        const msg= document.querySelector(".message")
        

        if(!address ||  !datetime)
        {
                msg.style.display="block";
                msg.style.backgroundColor = 'red'; // Sets the background color to blue
                msg.innerText="Enter adress and date-time";
                setTimeout(() => {
                           msg.style.display="none";
                           msg.style.backgroundColor = ' rgba(38, 189, 38, 0.992)';
                }, 1000);
        }
        else{
                msg.style.display="block";
                msg.innerText="Booking confirmed - booking details will be emailed";
                
                
                try{
                    const res =await fetch(`${API_URL}/emailsitting`,{
                           method:'POST',
                           headers:{'Content-Type':'application/json'},
                           credentials:'include',
                           body:JSON.stringify({useremail,servicename,address,datetime})
                    })
                    const data=await res.json();

                    if(res.ok)
                    {
                        console.log(data);
                        console.log("email sent for pet sitting")
                    }
                    else{
                        console.log("email not sent");
                    }

                }catch(err){
                    console.log("email error")
                    console.log(err);
                }




                setTimeout(() => {
                           msg.style.display="none";
                }, 2000);
        }

    

    }

    document.querySelector("#sitting_submit").addEventListener("click",()=>{
        sitting_booking();
    })
    
    
