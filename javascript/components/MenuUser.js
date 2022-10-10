
const openPage = () => {

  document.addEventListener('click', e => {
    if (e.target.matches('.menu-user li') || e.target.matches('.menu-user li *')) {

      let idOption = null

      if (!e.target.matches('li') && e.target.matches('div *') && (!e.target.matches('div'))) {
        idOption = ((e.target.parentElement).parentElement).id
      } else if (!e.target.matches('li') && (e.target.matches('div'))) {
        idOption = (e.target.parentElement).id
      } else {
        idOption = e.target.id
      }


      switch (idOption) {
        case 'profile':
          alert('Profile')
          break;

        case 'settings':
          alert('settings')
          break;

        case 'logout':
          localStorage.removeItem('login')
          location.reload()
          break;

        case 'login':
          location.href = '../pages/auth.html'
          break;
      }


    }
  })

}


export function MenuUser() {
  const $menu = document.createElement('div')
  const $ul = document.createElement('ul')
  const $li1 = document.createElement('li')
  const $li2 = document.createElement('li')
  const $li3 = document.createElement('li')

  if (!localStorage.getItem('login', true)) {
    $li3.innerHTML = `<div class="options-menu-user">
      <img src="./img/icon-login.png"> 
      <span>Log In</span>
    </div>`
    $li3.id = "login"
    $ul.appendChild($li3)
  } else {

    $li1.innerHTML = `<div class="options-menu-user">
    <img src="./img/icon-profile.png"> 
    <span>My Profile</span>
  </div>`
    $li1.id = "profile"

    $li2.innerHTML = `<div class="options-menu-user">
    <img src="./img/icon-settings.png"> 
    <span>Settings</span>
  </div>`
    $li2.id = "settings"

    $li3.innerHTML = `<div class="options-menu-user">
      <img src="./img/icon-logout.png"> 
      <span>Log Out</span>
    </div>`
    $li3.id = "logout"

    $ul.appendChild($li1)
    $ul.appendChild($li2)
    $ul.appendChild($li3)
  }

  $menu.classList.add('menu-user');
  $menu.appendChild($ul)


  openPage()

  return $menu
}