


export default function search(){

    const $searchInput = document.getElementById('search-input')
    const $fragment = document.createDocumentFragment()
    const $template = document.getElementById('movie-template-search').content
    let clone = null

    const $loader = document.querySelector('.sk-wave')
    console.log($loader)

    document.addEventListener('keyup', e=>{
        if(e.target === $searchInput){
            $loader.classList.add('is-active');
            document.getElementById('warn').classList.remove('is-active')

            if(e.target.value !== ""){           
                    fetch(`https://api.themoviedb.org/3/search/movie?api_key=9442d5549eb42ed94e41b7f7e58bdace&language=en-US&query=${encodeURI(e.target.value)}&page=1&include_adult=false`)
                    .then(res => res.ok?res.json():Promise.reject(res))
                    .then(json =>{
                        $loader.classList.remove('is-active');

                        console.log(json)
                        if(json.results.length > 0){                        
                            json.results.forEach((el, count)=>{     
                                if(el.poster_path){                        
                                    $template.getElementById('img-movie').src = `https://image.tmdb.org/t/p/w300_and_h450_bestv2${el.poster_path}`
                                    $template.getElementById('img-movie').alt = el.title;

                                    clone = $template.cloneNode(true)
                                    $fragment.appendChild(clone)
                                }
                            })
                
                            document.getElementById('searches').querySelector('.movies').appendChild($fragment)
                        }else{
                            document.getElementById('warn').classList.add('is-active')
                        }
                    })
                    .catch(err=>{
                        console.log(err)
                    })

                document.getElementById('searches').querySelector('.movies').textContent = "";
            }else{
                document.getElementById('searches').querySelector('.movies').textContent = "";
                $loader.classList.remove('is-active');
            }    
        }
    })


    document.addEventListener('search', e=>{
        if(e.target === $searchInput){
            if(e.target.value === ""){
                document.getElementById('searches').querySelector('.movies').textContent = "";
            }
        }
    })

    


}