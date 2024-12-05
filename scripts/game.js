let countdown; // Timer interval
let countdownSpeed = 1000; // Vitesse normale (1 seconde par tick)
const duration = 1800; // 5 minutes en secondes
let remainingTime = duration;

const timerElement = document.getElementById('timer');
const startButton = document.getElementById('start'); // Bouton START
const validateButton = document.getElementById('validate'); // Bouton VALIDER
const passwordInput = document.getElementById('password');
const messageElement = document.getElementById('message');
const finalButton = document.getElementById('finalButton'); // Bouton FINALE

const correctPassword = "P4ssw0rd"; // Exemple de mot de passe final
let attemptCount = 0; // Compteur pour le nombre de tentatives échouées

// Fonction pour démarrer le chronomètre
function startTimer() {
  if (countdown) clearInterval(countdown); // Réinitialise si déjà lancé
  countdown = setInterval(() => {
    remainingTime--;
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    if (remainingTime <= 0) {
      clearInterval(countdown);
      timerElement.textContent = "00:00";
      messageElement.textContent = "Temps écoulé ! La mission a échoué.";
      messageElement.classList.remove("success", "error");
      messageElement.classList.add("error");
      passwordInput.disabled = true;
      validateButton.disabled = true;

      // Redirection vers la page de défaite
      window.location.href = "lose.html"; 
    }
  }, countdownSpeed);
}

// Fonction pour valider le mot de passe
function validatePassword() {
  if (passwordInput.value === correctPassword) {
    clearInterval(countdown);
    messageElement.textContent = "Victoire ! Vous avez déchiffré le mot de passe.";
    messageElement.classList.remove("error");
    messageElement.classList.add("success");

    // Redirection vers la page de victoire
    window.location.href = "victory.html"; 
  } else {
    attemptCount++; // Incrémenter le compteur de tentatives

    // Si 3 tentatives échouées, rediriger immédiatement vers la page de défaite
    if (attemptCount >= 3) {
      window.location.href = "lose.html";
    } else {
      messageElement.textContent = "Mot de passe incorrect, réessayez.";
      messageElement.classList.remove("success");
      messageElement.classList.add("error");
    }
  }
}

// Fonction pour accélérer le temps
function speedUpTimer() {
  clearInterval(countdown);
  countdownSpeed /= 2; // Double la vitesse (1 tick = 0.5 seconde)
  startTimer();
}

// Fonction pour afficher les classes des joueurs
function displayPlayerClasses() {
  const playerClassesContainer = document.getElementById('playerClasses');
  const playerClassesData = JSON.parse(localStorage.getItem('playerClasses'));

  if (playerClassesData && playerClassesContainer) {
    playerClassesContainer.innerHTML = ""; // Réinitialise le conteneur
    playerClassesData.forEach(({ pseudo, classe }) => {
      const classEntry = document.createElement('div');
      classEntry.textContent = `${pseudo} : ${classe}`; // Format compact
      playerClassesContainer.appendChild(classEntry);
    });
  }
}

// Vérifie que les éléments existent avant d'ajouter les écouteurs
if (startButton) {
  startButton.addEventListener('click', startTimer); // Lance le chronomètre
}

if (validateButton) {
  validateButton.addEventListener('click', validatePassword);
}

if (finalButton) {
  finalButton.addEventListener('click', speedUpTimer); // Accélère le chronomètre
}

// Appelle la fonction pour afficher les classes au chargement de la page
displayPlayerClasses();
