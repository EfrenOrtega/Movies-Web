import { MenuUser } from "./components/MenuUser.js";


let flag = false;

export function App() {
  document.getElementById('root').innerHTML = null;

  //Abrir y Cerrar las opciones de un usuario al pulsar su Avatar
  document.addEventListener('click', e => {
    if (e.target.matches('#user')) {

      if (flag == true) {
        document.getElementById('root').innerHTML = ""
        flag = false
      } else if (flag == false) {
        document.getElementById('root').appendChild(MenuUser());
        flag = true
      }

    }
  })

}