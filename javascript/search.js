


export default function search(){

    const $searchInput = document.getElementById('search-input')

    document.addEventListener('click', e=>{
        if(e.target === $searchInput){ 
            e.target.parentNode.classList.add('is-active')
        }else if(e.target.matches('.search-input svg') !== true ){
            console.log("s")
            $searchInput.parentNode.classList.remove('is-active')
        }
                
    })
}