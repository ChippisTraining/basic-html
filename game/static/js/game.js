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
    this.gameScore = {
        X: 0,
        Y: 0,
        winLog: []
    };

    
    this.GAME_WON = 'won';
    this.GAME_DRAW = 'draw';
    this.GAME_PLAYING = 'playing';
    this.gameStatus = this.GAME_PLAYING;
  }

  /**
   * set the current player visual indicator
   * @param {'X'|'O'} player 
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
   * set the cell with the player symbol and class
   * @param {HTMLElement} cell 
   * @param {'X'|'O'} player 
   */
  setCell(cell, player) {
    cell.innerHTML = player.toUpperCase();
    cell.className = `game-cell-${player.toLowerCase()}`;
  }

  /**
   * handle game won event and update the score
   * @param {'XXX'|'OOO'} player 
   */
  handleGameWon(player) {
    const winner = player === 'XXX' ? 'X' : 'O';
    this.gameScore[winner]++;
    this.gameScore.winLog.push(winner);

    this.gamesList.innerHTML = this.gameScore.winLog.map((winner, i) => `<li key=${i}>${winner}</li>`).join('');
    this.scoreXCounter.textContent = this.gameScore.X;
    this.scoreYCounter.textContent = this.gameScore.Y;
  }

  /**
   * handle game draw event and update the score
   */
  handleGameDraw() {
    this.gameScore.winLog.push('DRAW');
    this.gamesList.innerHTML = this.gameScore.winLog.map((winner, i) => `<li key=${i}>${winner}</li>`).join('');
    this.fillGameField();
  }

  /**
   * detect if the game is won in a extremely naive way :D
   */
  checkWin() {
    const cells = Array(this.gameField.children.length).fill(null).map((_, i) => this.gameField.children[i].innerHTML);
    console.log(cells);

    const winCases = [
      // horizontal
      [cells[0], cells[1], cells[2]].join(''),
      [cells[3], cells[4], cells[5]].join(''),
      [cells[6], cells[7], cells[8]].join(''),

      // vertical
      [cells[0], cells[3], cells[6]].join(''),
      [cells[1], cells[4], cells[7]].join(''),
      [cells[2], cells[5], cells[8]].join(''),

      // diagonal
      [cells[0], cells[4], cells[8]].join(''),
      [cells[6], cells[4], cells[2]].join(''),
    ]

    const win = winCases.find((winCase) => winCase === 'XXX' || winCase === 'OOO');
    const draw = cells.every(cell => cell !== ' ');
    
    if (win) {
      this.handleGameWon(win);
      return
    }
    if (draw) {
      this.handleGameDraw();
    }
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
    this.setCell(cell, this.currentPlayer);
    console.log(`[Cell ${index}] now ${this.currentPlayer}`);

    console.log(`[Cell ${index}] checking win`);
    this.checkWin();

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
    this.gameStatus = this.GAME_PLAYING;
    this.gameScore = {
        X: 0,
        Y: 0,
        winLog: []
    };
  }
}
