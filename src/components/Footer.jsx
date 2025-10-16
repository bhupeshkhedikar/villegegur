import React from 'react';


export default function Footer(){
return (
<footer className="footer">
<div className="container">
<div>
<h4>GPG Osebu Jruk</h4>
<div style={{fontSize:13, color:'#a8c6ff'}}>Affiliated to Local University</div>
</div>
<div>
<div>© {new Date().getFullYear()} GPG Osebu Jruk</div>
<div style={{fontSize:13, color:'#9fb7dd'}}>Designed as React replica template</div>
</div>
</div>
</footer>
)
}