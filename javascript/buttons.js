

export default function buttons(){

    const $videoHeader = document.getElementById('video_background'),
          $btnSoundOn = document.getElementById('sound-on'),
          $btnSoundOff = document.getElementById('sound-off'),
          $btnMenu = document.getElementById('menu-hamburger'),
          $menuMobile = document.querySelector('.menu-mobile'),
          $menuMobileClose = document.getElementById('btn-close-menu'),
          $watchTrailer = document.getElementById('watch-trailer'),
          $trailer = document.querySelector('.video-trailer');

        document.addEventListener('click', e=>{

            if(location.pathname === '/'){
                if($trailer.classList.contains('is-active')){
                    $trailer.classList.remove('is-active');
                }
            }

            switch(e.target){

                case $btnSoundOff:
                    $videoHeader.muted = false;
                    e.target.style = 'display: none';
                    $btnSoundOn.style = 'display: inline-block';
                break;

                case $btnSoundOn:
                    $videoHeader.muted = true;
                    e.target.style = 'display: none';
                    $btnSoundOff.style = 'display: inline-block';
                break;

                case $btnMenu:
                    $btnMenu.classList.add('is-active')
                    $menuMobile.classList.add('is-active');
                break;

                case $menuMobileClose:
                    $btnMenu.classList.remove('is-active')
                    $menuMobile.classList.remove('is-active');
                break;

                case $watchTrailer:
                    $trailer.classList.add('is-active');
                break;
            }
            
            if(location.pathname === '/' || location.pathname === '/search.html'){
                if(e.target.matches('#btn-play')){
                    e.preventDefault()
                    let id = ((e.target.parentNode).parentNode).dataset.movie;                        
                    localStorage.setItem('movieId', id)   
                    location.href = `${location.origin}/movie.html`;
                }
            }

        })
}