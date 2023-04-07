<script lang="ts">
	import type { BoardType } from '../Types/BoardType';
	import type { Player } from '../Types/PlayerType';
	import Field from './Field.svelte';

	const board: BoardType = [
		[' ', ' ', ' '],
		[' ', ' ', ' '],
		[' ', ' ', ' ']
	];
	let currentPlayer: Player = 'X';

	const onClick = (rowIndex: number, colIndex: number) => {
		if (board[rowIndex][colIndex] === ' ') {
			board[rowIndex][colIndex] = currentPlayer;
			currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
		}
	};
	const onKeyDown = (event: KeyboardEvent, rowIndex: number, colIndex: number) => {
		if (event.key === 'Space') {
			onClick(rowIndex, colIndex);
		}
	};
</script>

<div class="board">
	{#each board as row, rowIndex}
		<div class="row">
			{#each row as cell, colIndex}
				<Field
					player={cell}
					on:click={() => onClick(rowIndex, colIndex)}
					on:keydown={(e) => onKeyDown(e, rowIndex, colIndex)}
				/>
			{/each}
		</div>
	{/each}
</div>

<style>
	.board {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
</style>
