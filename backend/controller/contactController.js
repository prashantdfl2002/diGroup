const nodemailer = require('nodemailer');

const submitContactform = async(req,res)=>{
    const {name,email,subject,message} = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ success: false, message: "All fields are required." });
    }

    console.log("SMTP_EMAIL:", process.env.SMTP_EMAIL);
console.log(
  "SMTP_PASSWORD:",
  process.env.SMTP_PASSWORD ? "FOUND" : "MISSING"
);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD
        }
    })

    try{
        await transporter.sendMail({
            from: `${name}   <${email}>`,
            to: `${process.env.SMTP_EMAIL}`,
            subject: `Production lead: ${subject}`,
            html: `<h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-line;">${message}</p> `
        })
        res.status(200).json({success: true,message: 'message sent successfully'})
    }catch(err){
        res.status(500).json({success: false, message: err.message})
    }
}

module.exports = {submitContactform}
