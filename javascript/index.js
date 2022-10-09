
import actionButtons from './buttons.js';
import trendsMovie from './trends_movie.js';
import newMovies from './new_movies.js';
import upcoming from './upcoming.js';
import search from './search.js';
import methodDevices from './devices.js';
import infoMovie from './info_movie.js';

import { App } from './App.js';

document.addEventListener('DOMContentLoaded', e => {
  //App inicia componentes UI para reutilización
  App();
})

if (location.pathname === '/') {
  trendsMovie();
  newMovies();
  upcoming();

  actionButtons();
}


if (location.pathname === '/search.html') {
  search();
  actionButtons();
}

if (location.pathname === '/movie.html') {
  infoMovie();
  actionButtons();
}


if (methodDevices.isMobile.any()) {
  let arrows = document.querySelectorAll('.arrows');

  arrows.forEach(el => {
    el.classList.add('is-no-active')
  })
}
