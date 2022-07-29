

export default function infoMovie(){

    document.addEventListener('DOMContentLoaded', e=>{

        fetch(`https://api.themoviedb.org/3/movie/${localStorage.getItem('movieId')}/images?api_key=9442d5549eb42ed94e41b7f7e58bdace&language=en-US&include_image_language=en`)
        .then(res => res.ok?res.json():Promise.reject(res))
        .then(json => {

            if(json.backdrops.length === 0){
                fetch(`https://api.themoviedb.org/3/movie/${localStorage.getItem('movieId')}/images?api_key=9442d5549eb42ed94e41b7f7e58bdace&language=en-US&include_image_language=null`)
                .then(res=> res.ok?res.json():Promise.reject(res))
                .then(json=>{

                    if(json.backdrops.length !== 0){
                        json.backdrops.forEach(el=>{
                            if(el.width<2000){
                                document.querySelector('header').style.backgroundImage = `url("https://image.tmdb.org/t/p/original${el.file_path}")`;
                            }else{
                                document.querySelector('header').style.backgroundImage = `url("https://image.tmdb.org/t/p/original${json.backdrops[0].file_path}")`;
                            }
                        })
                    }else{
                        document.querySelector('header').style.backgroundImage = `url("https://via.placeholder.com/1000x400/000011/ffffff.png?text=Image+Not+Found")`;
                    }
        

                })
                .catch(err=>{
                    console.log(err)
                })

            }else{
                json.backdrops.forEach(el=>{
                    if(el.width<2000){
                        document.querySelector('header').style.backgroundImage = `url("https://image.tmdb.org/t/p/original${el.file_path}")`;
                    }else{
                        document.querySelector('header').style.backgroundImage = `url("https://image.tmdb.org/t/p/original${json.backdrops[0].file_path}")`;
                    }
                })
            }
    
        })
        .catch(err=>{
            console.log(err)
        })

    })

    const $title = document.getElementById('title'),
          $sinopsis = document.querySelector('.sinopsis'),
          $genres = document.getElementById('genres'),
          $certification = document.getElementById('certification'),
          $actors = document.querySelector('.main-cast-container'),
          $actorTemplate = document.getElementById('actor-template').content,       
          $fragment = document.createDocumentFragment(),
          $btnWatchTrailer = document.querySelector('.btn-trailer');

    $genres.textContent = "";
    fetch(`https://api.themoviedb.org/3/movie/${localStorage.getItem('movieId')}?api_key=9442d5549eb42ed94e41b7f7e58bdace&language=en-US`)
    .then(res=> res.ok?res.json():Promise.reject(res))
    .then(json=>{
        $title.textContent = json.title;
        $sinopsis.textContent = json.overview

        json.genres.forEach((el, count)=>{
            if(count < (json.genres.length-1)){
                $genres.textContent += ` ${el.name},`;
            }else{
                $genres.textContent += " "+el.name;
            }
        })

    })
    .catch(err=>{
        console.log(err)
    })

    let band = 0;
    fetch(`https://api.themoviedb.org/3/movie/${localStorage.getItem('movieId')}/release_dates?api_key=9442d5549eb42ed94e41b7f7e58bdace`)
    .then(res => res.ok?res.json():Promise.reject(res))
    .then(json=>{
        json.results.forEach(el=>{
            if(el.iso_3166_1 === 'US'){
                if(el.release_dates[0].certification !== ''){
                    $certification.textContent = el.release_dates[0].certification
                    band = 1;
                }
            }

            if(el.iso_3166_1 === 'MX' && band !== 1){
                if(el.release_dates[0].certification !== ''){
                    $certification.textContent = el.release_dates[0].certification
                }
            }

        })
    })
    .catch(err=>{
        console.log(err)
    })


    fetch(`https://api.themoviedb.org/3/movie/${localStorage.getItem('movieId')}/credits?api_key=9442d5549eb42ed94e41b7f7e58bdace&language=en-US`)
    .then(res => res.ok?res.json():Promise.reject(res))
    .then(json=>{
        json.cast.forEach(el=>{

            if(el.known_for_department === 'Acting' && el.profile_path !== null){
                $actorTemplate.querySelector('.name-actor').textContent = el.name
                $actorTemplate.querySelector('img').src = `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${el.profile_path}`
                let clone = $actorTemplate.cloneNode('true')
                $fragment.appendChild(clone)

            }
        });

        $actors.appendChild($fragment)

    })
    .catch(err=>{
        console.log(err)
    })

    fetch(`https://api.themoviedb.org/3/movie/${localStorage.getItem('movieId')}/videos?api_key=9442d5549eb42ed94e41b7f7e58bdace&language=en-US`)
    .then(res => res.ok?res.json():Promise.reject)
    .then(json=>{
        $btnWatchTrailer.querySelector('a').href = `https://www.youtube.com/watch?v=${json.results[0].key}`
    })
    .catch(err=>{
        console.log(err)
    })


}