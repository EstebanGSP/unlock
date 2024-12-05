const assignClassesButton = document.getElementById('assignClasses');
const assignedClassesElement = document.getElementById('assignedClasses');
const playerInputs = document.querySelectorAll('.playerInput');

// Liste des classes possibles
const classes = ["Strategic Hacker", "Data Hacker", "Cryptographer", "Decryptor"];

// Fonction pour assigner les classes aléatoirement aux joueurs sans répétition
function assignClasses() {
  assignedClassesElement.innerHTML = ""; // Réinitialise l'affichage

  // Crée une copie des classes pour éviter de modifier l'originale
  const availableClasses = [...classes];

  // Mélange aléatoirement les classes
  availableClasses.sort(() => Math.random() - 0.5);

  const playerClassData = []; // Contient les paires pseudo-classe

  playerInputs.forEach((input, index) => {
    const pseudo = input.value.trim();
    if (pseudo && index < availableClasses.length) {
      const assignedClass = availableClasses[index];
      // Affichage complet pour la configuration
      const playerClassInfo = `${pseudo} est assigné(e) à la classe ${assignedClass}`;
      const classDiv = document.createElement('div');
      classDiv.textContent = playerClassInfo;
      assignedClassesElement.appendChild(classDiv);

      // Stockage compact pour la page suivante
      playerClassData.push({ pseudo, classe: assignedClass });
    }
  });

  // Enregistrement dans localStorage pour la page suivante
  localStorage.setItem('playerClasses', JSON.stringify(playerClassData));
}

// Événement pour assigner les classes
assignClassesButton.addEventListener('click', assignClasses);
