

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

}