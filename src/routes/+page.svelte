<script lang="ts">
	import { checkVictory as checkVictory } from '../Helpers/checkVictory';
	import type { BoardType } from '../Types/BoardType';
	import type { Line } from '../Types/Line';
	import type { Player } from '../Types/PlayerType';
	import Board from './Board.svelte';

	function createCleanBoard(): BoardType {
		return [
			[' ', ' ', ' '],
			[' ', ' ', ' '],
			[' ', ' ', ' ']
		];
	}

	let board: BoardType = createCleanBoard();
	let currentPlayer: Player = 'X';
	let victory: { winner: Player; line: Line } | null = null;
	let boardElement: Board;

	const onClick = (rowIndex: number, colIndex: number) => {
		if (board[rowIndex][colIndex] === ' ' && victory === null) {
			board[rowIndex][colIndex] = currentPlayer;

			const win = checkVictory(board);
			if (win.status === 'win') {
				victory = {
					winner: win.winner,
					line: win.line
				};
			}

			currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
		}
	};

	const newGame = () => {
		victory = null;
		board = createCleanBoard();
		boardElement.focusFirstField();
	};

	$: boardElement && newGame();
</script>

<div class="game">
	<Board {board} {victory} {onClick} bind:this={boardElement} />
	<button class="newGame" on:click={newGame}>New Game</button>
</div>

<style>
	.game {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	button.newGame {
		margin-top: 20px;
		font-size: 20px;
		background-color: #efefef;
		width: 10rem;
		height: 3rem;
	}
	button.newGame:focus {
		border: 0.2rem solid blue;
	}

</style>
