

export default function trendsMovie(){

    const $trends = document.getElementById('trends-now')
    const $fragment = document.createDocumentFragment()

    const $template = document.getElementById('movie-template').content
    let clone = null

    fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=9442d5549eb42ed94e41b7f7e58bdace')
    .then(res=> res.ok?res.json():Promise.reject(res))
    .then(json=>{
        console.log(json.results)

        json.results.forEach((el, count)=>{
            $template.getElementById('img-movie').src = `https://image.tmdb.org/t/p/w300_and_h450_bestv2${el.poster_path}`
            $template.getElementById('img-movie').alt = el.title;
            $template.querySelector('article').dataset.movie = el.id;

            clone = $template.cloneNode(true)
            $fragment.appendChild(clone)

            if(count == 0){
                $fragment.querySelector('.movie').setAttribute('id', 'picture-size')
            }
        })

        document.getElementById('trends-now').querySelector('.movies').appendChild($fragment)
       
        const $movieCarrousel = document.querySelectorAll('.movies-carrousel');
        let currentWidth = $movieCarrousel[0].clientWidth;
        let sizeMovie = document.getElementById('picture-size').clientWidth;


        window.addEventListener('resize', e=>{
            currentWidth = $movieCarrousel[0].clientWidth
            sizeMovie = document.getElementById('picture-size').clientWidth
        })   

        currentWidth -= (sizeMovie - sizeMovie/5);

        document.addEventListener('click', e=>{
            if(e.target.matches('#arrow-right')){
                $movieCarrousel[e.target.dataset.id].scrollLeft += currentWidth                
            }

            if(e.target.matches('#arrow-left')){
                $movieCarrousel[e.target.dataset.id].scrollLeft -= currentWidth                
        }


    })

    })
    .catch(err=>{
        console.log(err)
    })


}