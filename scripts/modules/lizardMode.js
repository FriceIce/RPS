//lizardmode
const lizardInfoBtn = document.querySelector(".fa-question");
const lizardInfoContainer = document.querySelector(".howto-container");
const lizardMode = document.querySelector("#mode-toggle");
const closeInfoBtn = document.querySelector(".fa-xmark");
const howToImg = document.getElementById('howto-img');
const nextBtn = document.querySelector('.next-button');
const infoPicture = ['Image/RPSLS.webp', 'Image/rps.png']
const howToContainerH4 = document.querySelector('.howto-title');
let infoPictureIndex = 0

export default function lizardModeFunc(lizardActive, gameTimer){
  document.addEventListener("click",(element) => {
    if(element.target === lizardInfoBtn){
     lizardInfoContainer.showModal()
    }else if (element.target === closeInfoBtn){
     lizardInfoContainer.close()
    }else if (element.target === lizardMode){
     lizardActive = lizardMode.checked
     gameTimer = lizardActive ? 3000 : 2000;
    } else if (element.target == nextBtn){
     infoPictureIndex++
     infoPictureIndex = (infoPictureIndex + infoPicture.length) % infoPicture.length; 
     howToImg.src = infoPicture[infoPictureIndex]
     nextBtn.innerHTML = infoPictureIndex > 0 ? '<i class="fa-solid fa-chevron-left"></i> Back' : 'Next <i class="fa-solid fa-chevron-right"></i>'
     howToContainerH4.innerText = infoPictureIndex > 0 ? 'How to play Rock Paper Scissors!' : 'How to play Lizard-Spock Mode!'
    }
  })
}