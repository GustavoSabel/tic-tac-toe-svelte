<script lang="ts">
	import { checkVictory as checkVictory } from '../Helpers/checkVictory';
	import type { BoardFields } from '../Types/BoardFields';
	import type { Line } from '../Types/Line';
	import type { Player } from '../Types/PlayerType';
	import Board from './Board.svelte';

	function createCleanBoard(): BoardFields {
		return [
			[' ', ' ', ' '],
			[' ', ' ', ' '],
			[' ', ' ', ' ']
		];
	}

	let boardFields: BoardFields = createCleanBoard();
	let currentPlayer: Player = 'X';
	let victory: { winner: Player; line: Line } | null = null;
	let boardElement: Board;

	const onClick = (rowIndex: number, colIndex: number) => {
		if (boardFields[rowIndex][colIndex] === ' ' && victory === null) {
			boardFields[rowIndex][colIndex] = currentPlayer;

			const win = checkVictory(boardFields);
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
		boardFields = createCleanBoard();
		boardElement.focusFirstField();
	};

	$: boardElement && newGame();
</script>

<div class="game">
	<Board {boardFields} {victory} {onClick} bind:this={boardElement} />
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
