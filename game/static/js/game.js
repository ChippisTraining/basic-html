class Game {
    /**
     * @param {HTMLElement | null} gameTurnSignal 
     * @param {HTMLElement | null} gameField 
     * @param {HTMLElement | null} scoreXCounter 
     * @param {HTMLElement | null} scoreYCounter 
     * @param {HTMLElement | null} gamesList 
     */
    constructor(gameTurnSignal, gameField, scoreXCounter, scoreYCounter, gamesList) {
    this.gameTurnSignal = gameTurnSignal;
    this.gameField = gameField;
    this.scoreXCounter = scoreXCounter;
    this.scoreYCounter = scoreYCounter;
    this.gamesList = gamesList;

    this.currentPlayer = 'X';
  }

  /**
   * set the current player visual indicator
   * @param {'X'|'Y'} player 
   */
  setCurrentPlayer(player) {
    this.gameTurnSignal.textContent = player;
  }

  /**
   * switch players turn from x to y and vice versa
   */
  nextTurn() {
    if (this.currentPlayer === 'X') {
        this.currentPlayer = 'O';
    } else {
        this.currentPlayer = 'X';
    }

    this.setCurrentPlayer(this.currentPlayer);
  }

  /**
   * returns if the innerHTML of the cell is empty
   * @param {HTMLElement} cell 
   * @returns 
   */
  isCellEmpty(cell) {
    return cell.innerHTML === ' ' || cell.innerHTML === '';
  }

  /**
   * event when game cell is clicked
   * handles cell logic
   * @param {Number} index 
   * @param {HTMLElement} cell 
   */
  cellClickHandler(index, cell) {
    console.log(`[Cell ${index}] clicked`);
    if (!this.isCellEmpty(cell)) { 
        console.log(`[Cell ${index}] not empty`);
        return; 
    }
    cell.innerHTML = this.currentPlayer;
    console.log(`[Cell ${index}] now ${this.currentPlayer}`);
    this.nextTurn();
  }

  /**
   * fills the game field with empty cells
   */
  fillGameField() {
    this.gameField.innerHTML = '';

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'game-cell';
        cell.addEventListener('click', () => this.cellClickHandler(i, cell));
        cell.innerHTML = ' ';
        this.gameField.appendChild(cell);
    }
  }

  /**
   * initializes the game
   */
  init() {
    this.fillGameField();
  }

  /**
   * starts the game
   */
  start() {
    console.log('Game started');
  }
}
