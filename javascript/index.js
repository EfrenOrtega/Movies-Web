
import actionButtons from './buttons.js';
import trendsMovie from './trends_movie.js';
import newMovies from './new_movies.js';
import upcoming from './upcoming.js';
import search from './search.js';

if(location.pathname === '/'){
    trendsMovie();
    newMovies();
    upcoming();
    
    actionButtons();
}


if(location.pathname === '/search.html'){
    search();
    actionButtons();
}

