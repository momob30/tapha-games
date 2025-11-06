// Variables globales pour les scores
let playerScore = 0;
let computerScore = 0;

// Fonction pour le choix aléatoire de l'ordinateur
function getComputerChoice() {
    const choices = ['pierre', 'papier', 'ciseaux'];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

// Fonction pour déterminer le gagnant
function playRound(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return "Égalité !";
    }

    if (
        (playerChoice === "pierre" && computerChoice === "ciseaux") ||
        (playerChoice === "papier" && computerChoice === "pierre") ||
        (playerChoice === "ciseaux" && computerChoice === "papier")
    ) {
        playerScore++;
        return `Vous gagnez ! ${playerChoice} bat ${computerChoice}`;
    } else {
        computerScore++;
        return `Vous perdez ! ${computerChoice} bat ${playerChoice}`;
    }
}

// Fonction pour mettre à jour l'interface
function updateUI(playerChoice, computerChoice, result) {
    document.getElementById('player-choice').textContent = `Votre choix : ${playerChoice}`;
    document.getElementById('computer-choice').textContent = `Choix de l'ordinateur : ${computerChoice}`;
    document.getElementById('result').textContent = result;
    document.getElementById('score').textContent = `Score - Vous: ${playerScore} Ordinateur: ${computerScore}`;
}

// Fonction pour gérer le clic sur un choix
function handleChoice(choice) {
    const computerChoice = getComputerChoice();
    const result = playRound(choice, computerChoice);
    updateUI(choice, computerChoice, result);
    
    // Animation des images
    const playerImg = document.getElementById('player-img');
    const computerImg = document.getElementById('computer-img');
    
    playerImg.src = `../images/${choice}.png`;
    computerImg.src = `../images/${computerChoice}.png`;
    
    // Ajout de la classe d'animation
    playerImg.classList.add('shake');
    computerImg.classList.add('shake');
    
    // Retrait de la classe d'animation après l'animation
    setTimeout(() => {
        playerImg.classList.remove('shake');
        computerImg.classList.remove('shake');
    }, 500);

    // Sauvegarder le score dans le localStorage
    saveScore();
}

// Réinitialiser le jeu
function resetGame() {
    playerScore = 0;
    computerScore = 0;
    document.getElementById('player-choice').textContent = 'Votre choix : ';
    document.getElementById('computer-choice').textContent = "Choix de l'ordinateur : ";
    document.getElementById('result').textContent = 'Choisissez une option pour commencer !';
    document.getElementById('score').textContent = 'Score - Vous: 0 Ordinateur: 0';
    document.getElementById('player-img').src = '../images/question.png';
    document.getElementById('computer-img').src = '../images/question.png';
}

// Sauvegarder le score
function saveScore() {
    const gameScores = JSON.parse(localStorage.getItem('gameScores') || '{}');
    gameScores['pierre-papier-ciseaux'] = {
        player: playerScore,
        computer: computerScore,
        date: new Date().toISOString()
    };
    localStorage.setItem('gameScores', JSON.stringify(gameScores));
}

// Charger le score au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    const gameScores = JSON.parse(localStorage.getItem('gameScores') || '{}');
    const savedScore = gameScores['pierre-papier-ciseaux'];
    if (savedScore) {
        playerScore = savedScore.player;
        computerScore = savedScore.computer;
        document.getElementById('score').textContent = `Score - Vous: ${playerScore} Ordinateur: ${computerScore}`;
    }
});