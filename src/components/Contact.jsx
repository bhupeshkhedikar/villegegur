import React from 'react';


export default function Contact(){
return (
<section className="container contact" id="contact" style={{marginTop:18}}>
<div className="left">
<h3>Contact Information</h3>
<p style={{color:'var(--muted)'}}>Address: Replace with real address<br/>Phone: +91-XXXXXXXXXX<br/>Email: info@example.com</p>
</div>
<div className="right">
<h3>Send a message</h3>
<form onSubmit={(e)=>{e.preventDefault(); alert('Message sent (demo)')}}>
<input className="input" placeholder="Name" required />
<input className="input" placeholder="Email" type="email" required />
<textarea className="input" placeholder="Message" rows={5} required />
<button className="btn" type="submit">Send</button>
</form>
</div>
</section>
)
}