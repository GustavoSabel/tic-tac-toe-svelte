<script lang="ts">
	import type { BoardType } from '../Types/BoardType';
	import type { Line } from '../Types/Line';
	import type { Player } from '../Types/PlayerType';
	import Field from './Field.svelte';

	export let board: BoardType;
	export let victory: { winner: Player; line: Line } | null = null;
	export let onClick: (rowIndex: number, colIndex: number) => void;

	let cellsElements: Field[][] = [[], [], []];

	export function focusFirstField() {
		cellsElements[0][0].focus();
	}
</script>

<div class="rows">
	{#each board as row, rowIndex}
		<div class="columns">
			{#each row as cell, colIndex}
				<Field
					ariaLabel={`Row ${rowIndex + 1} column ${colIndex + 1}`}
					player={cell}
					isVictoryCell={!!victory &&
						victory.line.some((cell) => cell.row === rowIndex && cell.col === colIndex)}
					bind:this={cellsElements[rowIndex][colIndex]}
					on:click={() => onClick(rowIndex, colIndex)}
				/>
			{/each}
		</div>
	{/each}
</div>

<style>
	.rows {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.columns {
		display: flex;
		flex-direction: row;
	}
</style>
