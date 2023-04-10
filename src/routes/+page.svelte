<script lang="ts">
	import { checkVictory as checkVictory } from '../Helpers/checkVictory';
	import type { BoardType } from '../Types/BoardType';
	import type { Line } from '../Types/Line';
	import type { Player } from '../Types/PlayerType';
	import Field from './Field.svelte';

	let board: BoardType = [
		[' ', ' ', ' '],
		[' ', ' ', ' '],
		[' ', ' ', ' ']
	];
	let currentPlayer: Player = 'X';
	let victory: { winner: Player; line: Line } | null = null;
	let cellsElements: Field[][] = [[], [], []];

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
		board = [
			[' ', ' ', ' '],
			[' ', ' ', ' '],
			[' ', ' ', ' ']
		];
		cellsElements[0][0].focus()
	};
	$: cellsElements[0][0] && newGame();
</script>

<div class="game">
	<div class="board">
		{#each board as row, rowIndex}
			<div class="row">
				{#each row as cell, colIndex}
					<Field
						bind:this={cellsElements[rowIndex][colIndex]}
						player={cell}
						isVictoryCell={!!victory &&
							victory.line.some((cell) => cell.row === rowIndex && cell.col === colIndex)}
						on:click={() => onClick(rowIndex, colIndex)}
					/>
				{/each}
			</div>
		{/each}
	</div>
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
	.board {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.row {
		display: flex;
		flex-direction: row;
	}
</style>
