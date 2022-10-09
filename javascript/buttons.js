

export default function buttons() {

  const $videoHeader = document.getElementById('video_background'),
    $btnSoundOn = document.getElementById('sound-on'),
    $btnSoundOff = document.getElementById('sound-off'),
    $btnMenu = document.getElementById('menu-hamburger'),
    $menuMobile = document.querySelector('.menu-mobile'),
    $menuMobileClose = document.getElementById('btn-close-menu'),
    $watchTrailer = document.getElementById('watch-trailer'),
    $trailer = document.querySelector('.video-trailer'),
    $logIn = document.getElementById('login'),
    $logIn2 = document.getElementById('login-2'),
    $signUp = document.getElementById('signUp'),
    $formSignUp1 = document.getElementById('signUp-1'),
    $back = document.getElementById('previous')


  document.addEventListener('click', e => {

    if (location.pathname === '/') {
      if ($trailer.classList.contains('is-active')) {
        $trailer.classList.remove('is-active');
      }
    }

    switch (e.target) {

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

      case $logIn:
        console.log(e.target)
        e.preventDefault()
        document.getElementById('form-login').classList.add('is-active')

        document.getElementById('form-signUp').classList.remove('is-active')

        document.querySelector('.form-auth').classList.remove('is-active')

        document.querySelector('.backgroud-image').classList.remove('is-active')

        break;

      case $logIn2:
        e.preventDefault()

        document.getElementById('form-signUp-2').classList.remove('is-active')

        document.getElementById('form-login').classList.add('is-active')

        document.getElementById('form-signUp').classList.remove('is-active')

        document.querySelector('.form-auth').classList.remove('is-active')

        document.querySelector('.backgroud-image').classList.remove('is-active')

        break;

      case $signUp:
        e.preventDefault();

        document.getElementById('form-login').classList.remove('is-active')

        document.getElementById('form-signUp').classList.add('is-active')

        document.querySelector('.form-auth').classList.add('is-active')

        document.querySelector('.backgroud-image').classList.add('is-active')
        break;

      case $back:
        e.preventDefault();

        document.getElementById('form-signUp-2').classList.remove('is-active')

        document.getElementById('form-signUp').classList.add('is-active')
        break;
    }

    if (location.pathname === '/' || location.pathname === '/search.html') {
      if (e.target.matches('#btn-play')) {
        e.preventDefault()
        let id = ((e.target.parentNode).parentNode).dataset.movie;
        localStorage.setItem('movieId', id)
        location.href = `${location.origin}/movie.html`;
      }
    }

  })


  document.addEventListener('submit', e => {
    switch (e.target) {
      case $formSignUp1:
        console.log("Hola")
        e.preventDefault()
        document.getElementById('form-signUp-2').classList.add('is-active')
        document.getElementById('form-signUp').classList.remove('is-active')
        break;
    }
  })


}