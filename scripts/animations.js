// Här skapar vi variabler som vi ansluter våra HTML-element vi vill komma åt med Java-script.

const userName = document.querySelectorAll(".player-field h3");

export function inputAnimation(userNameInput) {
  userNameInput.value = ''
  userNameInput.placeholder = "Please enter your username";
  userNameInput.style.animation = "input-animation 0.1s 2"; 

  setTimeout(() => {
    userNameInput.style.animation = "none";
    console.log("200ms senare, animationen är klar.");
  }, 200); 
}

// ------------------------------------------------------------------------------------------------------
const emoji = document.querySelectorAll(".emoji"); 
const h2El = document.querySelector(".h2"); 
export const arrowBtn = document.querySelector(".arrow-btn");
const healthBar = document.querySelectorAll('.health-bar');


export function countDown(result, choice, emojis, lizardActive) {
  const animationText = lizardActive ? 
  ["Rock", "Paper", "Scissors","Lizard", "Spock"] : ["Rock", "Paper", "Scissors"];
  let intervalID; 
  let index = 0;

  emojis.forEach((button) => {
    button.disabled = true;
  });

  arrowBtn.style.display = "none";

  // Health-bar invinsible
  healthBar[0].style.opacity = 0; 
  healthBar[1].style.opacity = 0; 

  // computername and username = opacity 0
  userName.forEach((value) => {
    value.style.opacity = 0;
  });

  h2El.style.animation = `count-down 500ms 500ms ${animationText.length}`; 

  intervalID = setInterval(() => {
    if (index < animationText.length) {
      h2El.innerText = animationText[index];
      index++;
    } else {
      clearInterval(intervalID); 
      h2El.style.animation = "none"; 

      userName.forEach((value) => {
        value.style.opacity = 1;
      });

      result(choice.id);
      console.log('Återställer #result texten till "VS" om 2 sekunder.');

      setTimeout(() => {
        h2El.innerText = "VS";
        console.log('Texten är nu ändrad till "VS"');

        //Health bar visible
        healthBar[0].style.opacity = 1;
        healthBar[1].style.opacity = 1;

        emoji.forEach((button) => {
          button.disabled = false;
        });

        arrowBtn.style.display = "";
      }, 2000);
    }
  }, 500); 
}

// ----------------------------------------------------------------------------------------------------------------
export const characterList = document.querySelectorAll(".choose-character li");
export const elementObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show-character");
    }
  });
});