

export default function buttons(){

    const $videoHeader = document.getElementById('video_background'),
          $btnSoundOn = document.getElementById('sound-on'),
          $btnSoundOff = document.getElementById('sound-off')
                
          document.addEventListener('click', e=>{


            switch(e.target){
                case $btnSoundOff:
                    $videoHeader.muted = false;
                    e.target.style = 'display: none';
                    $btnSoundOn.style = 'display: inline-block';
                break;

                case $btnSoundOn:
                    $videoHeader.muted = true;
                    e.target.style = 'display: none';
                    $btnSoundOff.style = 'display: inline-block';
                break;
            }

          })
}