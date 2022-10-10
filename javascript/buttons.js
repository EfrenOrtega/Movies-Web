

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
    $formSignUp2 = document.getElementById('signUp-2'),
    $back = document.getElementById('previous'),
    $login = document.getElementById('login-form')


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

    let username, password, currentUrl, data, settings

    switch (e.target) {
      case $formSignUp1:
        e.preventDefault()
        document.getElementById('form-signUp-2').classList.add('is-active')
        document.getElementById('form-signUp').classList.remove('is-active')
        break;

      case $login:
        e.preventDefault()

        username = $login.querySelector('#username').value
        password = $login.querySelector('#password').value

        currentUrl = location.hostname
        console.log(currentUrl)

        data = {
          username,
          password
        }

        settings = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }

        fetch(`http://${currentUrl}:5000/auth`, settings)
          .then((res) => res.ok ? res.json() : Promise.reject(res))
          .then(json => {
            console.log(json)
            if (!json.status) {
              document.querySelector('.warning').textContent = `* ${json.message}`
            } else {
              localStorage.setItem('login', true)
              location.href = '/';
            }

          })
          .catch(err => {
            console.log(err)
          })

        break;

      case $formSignUp2:
        e.preventDefault()

        let name = $formSignUp1.querySelector('[name = "name"]').value
        let email = $formSignUp1.querySelector('[name = "email"]').value
        let dateOnBirth = $formSignUp1.querySelector('[name = "date"]').value
        let $FILE = $formSignUp1.querySelector('[name = "file"]')
        let avatar = $FILE.files[0]

        console.log(avatar.name)


        username = $formSignUp2.querySelector('[name = "username"]').value
        password = $formSignUp2.querySelector('[name = "password"]').value

        currentUrl = location.hostname
        console.log(currentUrl)

        data = {
          name,
          email,
          dateOnBirth,
          username,
          password
        }

        const formData = new FormData()
        formData.append('file', avatar)

        //Para hacer la petición de guarda la imagen de perfil en Flask Server
        let settings1 = {
          method: 'POST',
          header: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData
        }

        //Para hace la petición y registrar los datos del usuario
        let settings2 = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }

        //=========================================================
        //Primera Petición para verificar que el usuario no exista
        //=========================================================
        fetch(`http://${currentUrl}:5000/selectuser/${username}`)
          .then((res) => res.ok ? res.json() : Promise.reject(res))
          .then(json => {

            if (json.status) {


              //================================================================
              //Segunda Petición para subir el avatar del usuario a Flask Server
              //================================================================
              fetch(`http://${currentUrl}:5000/uploadFile`, settings1)
                .then((res) => res.ok ? res.json() : Promise.reject(res))
                .then(json => {

                  if (json.status) {


                    //=============================================
                    // Tercera Petición Crear la cuenta del usuario
                    //==============================================
                    fetch(`http://${currentUrl}:5000/createaccount`, settings2)
                      .then((res) => res.ok ? res.json() : Promise.reject(res))
                      .then(json => {
                        console.log(json)
                      })
                      .catch(err => {
                        console.log(err)
                      })
                  } else {
                    console.log(json)
                  }


                })
                .catch(err => {
                  console.error(err)
                })
            } else {
              $formSignUp2.querySelector('.warning').textContent = `* ${json.message}`
            }



          })
          .catch((err) => {
            console.log(err)
          })

        break;
    }
  })


}