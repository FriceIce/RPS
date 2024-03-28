import { inputAnimation, countDown, characterList, elementObserver, arrowBtn} from "./animations.js";
import lizardModeFunc from "./modules/lizardMode.js";

const listIds = ["containerWelcome", "containerGame"];
const displayUserChoice = document.querySelector("#humanField"); 
const userName = document.querySelectorAll('.player-field h3'); 
const userNameInput = document.querySelector('#nameInput'); 
const displayResult = document.querySelector("#result");
let emojis = document.querySelectorAll(".emoji"); 
const avatarIcon = document.querySelectorAll('.avatar');
let humanChoice;
let computerChoice;
let currentAvatar = avatarIcon[0]; 

// Here the program checks if the user is on the start page, and if true, the player icons are displayed.
characterList.forEach(character => {
    elementObserver.observe(character);
});

// When the user select an avatar the picked avatr gets a border, and the others loses their borders
avatarIcon.forEach((icon, index) => {
    icon.addEventListener('click', () => {
        avatarIcon.forEach(el => {
            if(el !== icon){
                el.style.border = '2px solid transparent'


            } else if (el.parentElement.tagName == 'LI'){ 
                el.style.border = '2px solid rgb(186, 16, 141, 0.9)';
                currentAvatar = el; 
                changeAvatarIndex = index; 
            }
        }); 
    });
});

function showGame(id) {
    for (let i = 0; i < listIds.length; i++) {
        if (listIds[i] === id) {
            document.getElementById(listIds[i]).style.display = "inherit";
        }
    }
}

const startBtn = document.getElementById("startBtn");
startBtn.addEventListener("click", (event) => readyToPlay(event, userNameInput, displayUserChoice, showGame, emojis, currentAvatar));


//Return to the home page by reloading the entire page. 
arrowBtn.addEventListener("click", () => window.location.reload());

// Loop thru all emojis and pick the selected emoji by id.
emojis.forEach(choice => {
    choice.addEventListener('click', () => {
        console.log("Human Choice: " + choice.id); 
        countDown(result, choice, emojis, lizardActive); 

        setTimeout(() => {
            emojiMove()
        }, gameTimer) 
    })
});

// Genereate the computer pick with the Math.random metod.
function computerMove () {
    const number = Math.floor(Math.random() * emojis.length) + 1;
    if (number === 1) {
        computerChoice = "rock";
    } else if (number === 2) {
        computerChoice = "paper";
    } else if (number === 3) {
        computerChoice = "scissors";
    } else if (number === 4) {
        computerChoice = "lizard";
    } else {
        computerChoice = "spock";
    }
    return computerChoice;
};

// SOUND EFFECT FUNCTION
function soundEffect(soundFile){
    const audio = document.querySelector('audio');
    audio.src = soundFile;
    audio.volume = '0.5'; 
    return audio
}

//Closure
function soundEffectDelay(fn, soundFile, timer){
    return function (modalIsOpen=true) {
        setTimeout(() => {
           if(modalIsOpen) return fn(soundFile).play() 
           return fn(soundFile).load(); // else --> .load() stoppar samt startar om ljudet.
        }, timer);
    }    
}
const gameWinningSoundEffect = soundEffectDelay(soundEffect, 'Sound-effects/cheer.mp3', 300);
const gameLosingSoundEffect = soundEffectDelay(soundEffect, 'Sound-effects/defeat-fiasco.mp3', 800);

// Compares the computers against the users pick based on id. 
function result(human) {
    humanChoice = human;
    computerChoice = computerMove();
    console.log("computer choice: " + computerChoice);

    switch (humanChoice + computerChoice) {
        case "rockscissors":
        case "rocklizard":
        case "paperrock":
        case "paperspock":
        case "scissorspaper":
        case "scissorslizard":
        case "lizardspock":
        case "lizardpaper":
        case "spockscissors":
        case "spockrock":
            displayResult.innerText = "You Win!";
            healthFunction("win");
            break;
        case "rockpaper":
        case "rockspock":
        case "paperscissors":
        case "paperlizard":
        case "scissorsrock":
        case "scissorsspock":
        case "lizardscissors":
        case "lizardrock":
        case "spockpaper":
        case "spocklizard":
            displayResult.innerText = "You Lose!";
            healthFunction("lose");
            break;
        default:
            displayResult.innerText = "Draw!";
            break;
    }
}
 
function emojiMove(){
    const img = document.querySelectorAll('.player-field img') 
    
    emojis.forEach(element => {
       
        if (element.id === computerChoice){
            userName[0].innerText = element.textContent; 
            userName[0].style.fontSize = '4rem'
            img[0].style.display = 'none'; 
        } 
        
        if (element.id == humanChoice){
            userName[1].innerText = element.textContent; 
            userName[1].style.fontSize = '4rem';
            img[1].style.display = 'none'
        }  
    })

    // This setTimeout is to reset the the username and computername
    setTimeout(() => {
        userName.forEach((value, index) => {
            let text = index < 1 ? 'OPTIMUS PRIME' : userNameInput.value.toUpperCase(); 
            value.style.fontSize = '1.5rem';
            value.innerText = text;
            img[index].style.display = ''; 
        });
    },2000)
}

const healthBar = document.querySelectorAll (".health-bar i")
const computerHearts = document.querySelectorAll(".health-bar-computer i")
const playerHearts = document.querySelectorAll(".health-bar-human i")
const modalTitle = document.querySelector ("#modal-title")
let computerIndex = 0;
let humanIndex = 0;
const modal = document.querySelector(".modal")
const modalBtn = document.querySelectorAll (".modal-btn")
let confettiID;

function healthFunction (hpResult){
    if(hpResult === "win"){
        computerHearts[computerIndex].classList.add("fa-heart-crack")
        computerHearts[computerIndex].classList.remove("fa-heart")
        computerIndex++;
    } else if (hpResult === "lose"){
        playerHearts[humanIndex].classList.add("fa-heart-crack")
        playerHearts[humanIndex].classList.remove("fa-heart")
        humanIndex++;
    }

    if (humanIndex > 2 || computerIndex > 2){
        setTimeout( () => {
            modal.showModal(); 
            if(computerIndex > humanIndex){
                return confettiID = setInterval(() => confetti({
                spread: 200
              }), 600);   
            }
        },2000)
        
        modalTitle.innerHTML = computerIndex > humanIndex ? "You Won!" : '<span class="game-styling">GAME</span> <span class="game-over-styling">OVER</span>';
        
        //If user wins
        if(computerIndex > humanIndex){
            return gameWinningSoundEffect();
        } 

        //if computer wins
        gameLosingSoundEffect()
    }
}

modalBtn.forEach(btn => {
    btn.addEventListener('click',() => {
        if(btn.id === "home-btn"){
            return window.location.reload()
        }

        healthBar.forEach(heart => {
            heart.classList.remove("fa-heart-crack")
            heart.classList.add("fa-heart")
        });
        
        modal.close(); 
        if(computerIndex > humanIndex) {
            clearInterval(confettiID);
            gameWinningSoundEffect(false)
        } else {
            gameLosingSoundEffect(false)
        }
        computerIndex = 0;
        humanIndex = 0;
    })
});


function changeAvatarWithArrowKey(index){
    let avatarIndex = (index + avatarIcon.length) % avatarIcon.length; 
    avatarIcon.forEach((avatar, index) => {
        if (avatarIndex == index && avatar.parentElement.tagName == 'LI') {
            avatar.style.border = '2px solid rgb(186, 16, 141, 0.9)';
            currentAvatar = avatar; 
        } else if(avatarIndex !== index && avatar.parentElement.tagName == 'LI'){
            avatar.style.border = '2px solid transparent'; 
        }
    });   
}

let changeAvatarIndex = 0; 
document.addEventListener('keydown', event => {
    if (event.key == 'Escape' && !lizardInfoContainer.open){
        event.preventDefault(); 
        window.location.reload();
    } else if((event.key == 'ArrowRight' || event.key == 'ArrowLeft') && !lizardInfoContainer.open){
        changeAvatarIndex = event.key == 'ArrowRight' ? changeAvatarIndex+1 : changeAvatarIndex-1; 
        changeAvatarIndex = changeAvatarIndex <= 0 ? avatarIcon.length : changeAvatarIndex;  
        changeAvatarWithArrowKey(changeAvatarIndex);
    }
}, {capture: true});

//lizardmode
let lizardActive
let gameTimer = 2000;
lizardModeFunc(lizardActive, gameTimer); 

