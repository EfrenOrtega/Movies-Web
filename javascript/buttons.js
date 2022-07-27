

export default function buttons(){

    const $videoHeader = document.getElementById('video_background'),
          $btnSoundOn = document.getElementById('sound-on'),
          $btnSoundOff = document.getElementById('sound-off'),
          $btnMenu = document.getElementById('menu-hamburger'),
          $menuMobile = document.querySelector('.menu-mobile'),
          $menuMobileClose = document.getElementById('btn-close-menu')

            document.addEventListener('click', e=>{
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
                }
            })
}