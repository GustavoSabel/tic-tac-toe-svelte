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
	const onKeyDown = (event: KeyboardEvent, rowIndex: number, colIndex: number) => {
		if (event.key === 'Space') {
			onClick(rowIndex, colIndex);
		}
	};
	const newGame = () => {
		victory = null
		board = [
			[' ', ' ', ' '],
			[' ', ' ', ' '],
			[' ', ' ', ' ']
		];
	}
</script>

<div class="game">
	<div class="board">
		{#each board as row, rowIndex}
			<div class="row">
				{#each row as cell, colIndex}
					<Field
						player={cell}
						isVictoryCell={!!victory &&
							victory.line.some((cell) => cell.row === rowIndex && cell.col === colIndex)}
						on:click={() => onClick(rowIndex, colIndex)}
						on:keydown={(e) => onKeyDown(e, rowIndex, colIndex)}
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
		padding: 10px;
		font-size: 20px;
	}
	.board {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
</style>
