import type { BoardFields } from "../Types/BoardFields";
import type { Line } from "../Types/Line";
import type { Player } from "../Types/PlayerType";

type ResultWin = {
  status: 'win'
  winner: Player
  line: Line
}

type ResultTie = {
  status: 'tie'
}

type ResultNone = {
  status: 'none'
}

type Result = ResultWin | ResultTie | ResultNone

const checkVictoryOnLine = (board: BoardFields, line: Line): ResultWin | null => {
  const [firstCell, secondCell, thirdCell] = line.map(x => board[x.row][x.col])
  if (firstCell === secondCell && secondCell === thirdCell && thirdCell !== ' ') {
    return {
      status: 'win',
      winner: thirdCell,
      line: line
    }
  }
  return null
}

export function checkVictory(board: BoardFields): Result {
  // Check rows
  for (let row = 0; row < 3; row++) {
    const resultRow = checkVictoryOnLine(board, [{ row, col: 0 }, { row, col: 1 }, { row, col: 2 }])
    if (resultRow) {
      return resultRow
    }
  }

  // Check columns
  for (let col = 0; col < 3; col++) {
    const resultColumm = checkVictoryOnLine(board, [{ row: 0, col }, { row: 1, col }, { row: 2, col }])
    if (resultColumm) {
      return resultColumm
    }
  }

  // Check diagonal \
  const resultDiagnal1 = checkVictoryOnLine(board, [{ row: 0, col: 0 }, { row: 1, col: 1 }, { row: 2, col: 2 }])
  if (resultDiagnal1) {
    return resultDiagnal1
  }

  // Check diagonal /
  const resultDiagnal2 = checkVictoryOnLine(board, [{ row: 0, col: 2 }, { row: 1, col: 1 }, { row: 2, col: 0 }])
  if (resultDiagnal2) {
    return resultDiagnal2
  }

  if (board.every(row => row.every(cell => cell !== ' '))) {
    return { status: 'tie' }
  }

  return {
    status: 'none'
  }
}