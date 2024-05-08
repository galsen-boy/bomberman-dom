// Importez votre mini-framework
import MiniFramework from "../framework/mini-framework.js"

// Créez une instance de votre mini-framework
const gameConfig = {
    // Taille de la carte de jeu
    mapSize: { width: 10, height: 10 },

    // Nombre de joueurs
    numberOfPlayers: 4,

    // Paramètres de difficulté
    difficulty: 'normal'
};

const game = new MiniFramework(gameConfig);

// Obtenez une référence à la balise <div class="container">
const container = document.querySelector('.container');

// Exemple : Créez les éléments de l'interface de jeu avec votre mini-framework
const mapSize = { width: 10, height: 10 };

// Créez une liste pour stocker toutes les cellules de la carte
const mapCells = [];

// Générez les cellules de la carte en bouclant à travers chaque ligne et colonne
for (let y = 0; y < mapSize.height; y++) {
    const row = [];
    for (let x = 0; x < mapSize.width; x++) {
        let isWall = false;

        // Vérifiez si la cellule est sur le bord de la carte
        if (x === 0 || x === mapSize.width - 1 || y === 0 || y === mapSize.height - 1) {
            isWall = true;
        }

        // Créez une cellule de carte virtuelle avec les attributs nécessaires
        const cell = game.dom.createVirtualNode('div', {
            attrs: {
                class: isWall ? 'map-cell wall' : 'map-cell',
                'data-x': x,
                'data-y': y
            },
            children: []
        });

        // Ajoutez la cellule à la liste des cellules de la carte
        row.push(cell);
    }
    // Ajoutez la ligne de cellules à la liste principale
    mapCells.push(row);
}
const gameMap = game.dom.createVirtualNode('div', {
    attrs: { id: 'game-map', class: 'game-map' },
    children: mapCells.map(row => {
        // Chaque ligne de cellules est un enfant séparé du conteneur de la carte
        return game.dom.createVirtualNode('div', { class: 'map-row' }, row);
    }),


});

const playerInfo = game.dom.createVirtualNode('div', {
    attrs: { id: 'player-info', class: 'player-info' },
    children: [
        // Ici, vous pouvez afficher les informations sur les joueurs (nombre de vies, power-ups, etc.)
    ]
});

const startGameButton = game.dom.createVirtualNode('button', {
    attrs: { id: 'start-game-button' },
    children: ['Démarrer le jeu']
});

// Montez les éléments de l'interface dans la balise <div class="container">
game.dom.mount(container, gameMap);
game.dom.mount(container, playerInfo);
game.dom.mount(container, startGameButton);