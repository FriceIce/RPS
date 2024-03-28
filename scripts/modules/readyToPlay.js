function readyToPlay(event, userNameInput, displayUserChoice, showGame, emojis, currentAvatar){
  event.preventDefault();
  const invalidInput = /(<[^>]+>)/;
  
  if (userNameInput.value === '' || invalidInput.test(userNameInput.value)) {
      inputAnimation(userNameInput)
  } else if (userNameInput.value !== '') {
      currentAvatar.style.border = 'transparent';
      displayUserChoice.append(currentAvatar);

      userName[1].innerText = userNameInput.value.toUpperCase();   
      showGame("containerGame");
      if(!lizardActive){
          emojis[3].remove();
          emojis[4].remove();
          emojis = document.querySelectorAll(".emoji");
          // console.log(emojis);
      }
  }
}

export default readyToPlay;