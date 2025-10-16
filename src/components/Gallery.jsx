import React from 'react';
import heroImg from '../assets/hero.jpg';


export default function Gallery(){
const images = [heroImg, heroImg, heroImg, heroImg];
return (
<section className="container" id="gallery" style={{marginTop:18}}>
<h2>Gallery</h2>
<div className="gallery-grid" style={{marginTop:12}}>
{images.map((img,i)=> (
<img key={i} src={img} alt={`gallery-${i}`} />
))}
</div>
</section>
)
}