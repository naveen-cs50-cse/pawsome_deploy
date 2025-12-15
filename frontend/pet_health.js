

const API_URL = 'https://pawsome-41bj.onrender.com/api/auth';

async function submit_health()
    {
       
       let servicename=document.querySelector(".healthservicename").innerText
        let hospital=document.querySelector(".hospital").value
        let doctor=document.querySelector(".doctor").value;
        let date=document.querySelector(".date").value;
        let time=document.querySelector(".time").value;

        let hospitalbooked=document.querySelector(".hospitalbooked")
    if(!hospital || !doctor || !date || !time )
    {
        
        const showmsg=document.querySelector(".bookingmessage");
        showmsg.id="bookingmessage_show";
           
        showmsg.style.backgroundColor='red';
        hospitalbooked.innerText="enter all details to book";
        return;
    }


                         hospitalbooked.innerText="hospital booked : "+hospital;
        let doctorbooked=document.querySelector(".doctorbooked").innerText="doctor booked   : "+doctor;
        let datebooked=document.querySelector(".datebooked").innerText="date booked  : "+date;
        let timebooked=document.querySelector(".timebooked").innerText="time booked   : "+time;

        const showmsg=document.querySelector(".bookingmessage");
        showmsg.id="bookingmessage_show";

        showmsg.style.backgroundColor='#77d075f5';

        //for username email
         const userRes = await fetch("https://pawsome-41bj.onrender.com/api/auth/me", {
                credentials: "include"
            });

            let useremail = "";
            if (userRes.ok) {
                const data = await userRes.json();
                useremail = data.user.email;
            }
         
        try
        {
            const res=await fetch(`${API_URL}/emailhealth`,{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                credentials:'include',
                body:JSON.stringify({useremail,servicename,hospital,doctor,date,time})
            })
            const data=await res.json();

            if(res.ok)
            {
                console.log(data);
                console.log("email sent for pet health")
            }
            else{
                console.log("email not sent")
            }
        }
        catch(err)
        {
            console.log(err);
        }
       

        setTimeout(() => {
             showmsg.id="";
             popup.id = "";
            grid.style.filter = "";
           text.style.filter='blur(0px)';

        }, 6000);
       

        console.log("hospital : ",hospital)
        console.log("doctor : ",doctor)
        console.log("Date : ",date)
        console.log("Time : ",time)

    }

    document.querySelector(".health_book").addEventListener("click",()=>{
        submit_health();
    })