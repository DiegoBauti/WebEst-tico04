document.addEventListener('DOMContentLoaded',function(){
    iniciarApp();
})
function iniciarApp(){
    crearGaleria();
    scrollDeslizante();
    fijarNav();
}

function fijarNav(){
    const barra=document.querySelector('.header');
    const parte=document.querySelector('.sobre-festival');
    const body=document.querySelector('body');

    window.addEventListener('scroll',function(){
        if(parte.getBoundingClientRect().bottom<0){
            barra.classList.add('fijar-nav');
            body.classList.add('scroll-body');
        }else{
            barra.classList.remove('fijar-nav');
            body.classList.remove('scroll-body');
        }
    })
}

function scrollDeslizante(){
    const enlaces=document.querySelectorAll('.navegacion-principal a');
    enlaces.forEach(navs=>{
        navs.addEventListener('click',function(e){
            e.preventDefault();
            const name =e.target.attributes.href.value;
            const seccion=document.querySelector(name);
            seccion.scrollIntoView({behavior : "smooth"});
        })
    })
}
function crearGaleria(){
    const galeria=document.querySelector('.galeria-img');
    for( let i=1;i<=12;i++){
        const pic=document.createElement('picture');
        pic.innerHTML=`<source srcset="build/img/thumb/${i}.avif" type="image/avif">
        <source srcset="build/img/thumb/${i}.webp" type="image/webp">
        <img width="200" height="300" loading="lazy" src="build/img/thumb/${i}.jpg" alt="imagen vocalista">`;
        galeria.appendChild(pic);

        pic.onclick=function(){
            detectarImagen(i);
        }
    }  
}

function detectarImagen(imagen){
    const pic2=document.createElement('picture');
        pic2.innerHTML=`<source srcset="build/img/grande/${imagen}.avif" type="image/avif">
        <source srcset="build/img/grande/${imagen}.webp" type="image/webp">
        <img width="200" height="300" loading="lazy" src="build/img/grande/${imagen}.jpg" alt="imagen vocalista">`;
        
        const overlay=document.createElement('DIV');
        overlay.appendChild(pic2);
        overlay.classList.add('overlay');

        const contenido=document.createElement('p');
        contenido.textContent='x';
        contenido.classList.add('estilo-boton');
        overlay.appendChild(contenido);
        contenido.onclick=function(){
            const body=document.querySelector('body');
            body.classList.remove('fijar-body');
            overlay.remove();
        }

        overlay.onclick=function(){
            const body=document.querySelector('body');
            body.classList.remove('fijar-body');
            overlay.remove();
        }

        const body=document.querySelector('body');
        body.appendChild(overlay);
        body.classList.add('fijar-body');
}