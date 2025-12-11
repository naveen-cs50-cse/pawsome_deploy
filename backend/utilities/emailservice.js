import nodemailer from 'nodemailer';

const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"yourpawsomecare@gmail.com",
        pass:"mlge ykee tjfw ynaa"
    },
});


async function sendEmail(to,subject,message) {
    const mailOptions={
        from:"yourpawsomecare@gmail.com",
        to,
        subject,
        text:message,
    };


    try{
        const info=await transporter.sendMail(mailOptions);

        console.log("Email sent : ",info.response);
        return true;
    }catch(err){
        console.log("email error :",err);
        return false;
    }  
    
}

export default sendEmail;