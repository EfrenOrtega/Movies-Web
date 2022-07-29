

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
          $actor = document.querySelector('main-cast-container')
          
    $genres.textContent = "";
    fetch(`https://api.themoviedb.org/3/movie/${localStorage.getItem('movieId')}?api_key=9442d5549eb42ed94e41b7f7e58bdace&language=en-US`)
    .then(res=> res.ok?res.json():Promise.reject(res))
    .then(json=>{
        console.log(json)
        $title.textContent = json.title;
        $sinopsis.textContent = json.overview

        json.genres.forEach((el, count)=>{
            if(count === 0){
                $genres.textContent += `${el.name},`;
            }else{
                $genres.textContent += " "+el.name;
            }
        })

    })
    .catch(err=>{
        console.log(err)
    })


    fetch(`https://api.themoviedb.org/3/movie/${localStorage.getItem('movieId')}/release_dates?api_key=9442d5549eb42ed94e41b7f7e58bdace`)
    .then(res => res.ok?res.json():Promise.reject(res))
    .then(json=>{
        console.log(json.results)
        json.results.forEach(el=>{
            if(el.iso_3166_1 === 'US'){
                $certification.textContent = el.release_dates[0].certification
            }
        })
    })
    .catch(err=>{
        console.log(err)
    })


    fetch(`https://api.themoviedb.org/3/movie/${localStorage.getItem('movieId')}/credits?api_key=9442d5549eb42ed94e41b7f7e58bdace&language=en-US`)
    .then(res => res.ok?res.json():Promise.reject(res))
    .then(json=>{
        console.log(json.cast)
        json.cast.forEach(el=>{

            if(el.known_for_department === 'Acting' && el.profile_path !== null){
                console.log(el)
                console.log(el.name)
                console.log(el.profile_path)
            }
            
        });
    })
    .catch(err=>{
        console.log(err)
    })


}