<script lang="ts">
	import type { BoardFields } from '../Types/BoardFields';
	import type { Line } from '../Types/Line';
	import type { Player } from '../Types/PlayerType';
	import Field from './Field.svelte';

	export let boardFields: BoardFields;
	export let victory: { winner: Player; line: Line } | null = null;
	export let onClick: (rowIndex: number, colIndex: number) => void;

	let cellsElements: Field[][] = [[], [], []];

	export function focusFirstField() {
		cellsElements[0][0].focus();
	}

	function move(e: KeyboardEvent) {
		let rowInc = 0;
		let colInc = 0;

		if (e.key === 'ArrowRight') colInc = 1;
		else if (e.key === 'ArrowLeft') colInc = -1;
		else if (e.key === 'ArrowUp') rowInc = -1;
		else if (e.key === 'ArrowDown') rowInc = 1;
    else return

		for (let row = 0; row < 3; row++) {
			for (let col = 0; col < 3; col++) {
				if (cellsElements[row][col].isFocused()) {
					const nextRow = row + rowInc;
					const nextCol = col + colInc;

					if (nextRow >= 0 && nextRow < 3 && nextCol >= 0 && nextCol < 3) {
						cellsElements[nextRow][nextCol].focus();
					}
          return
				}
			}
		}
	}
</script>

<div class="rows" on:keydown={move}>
	{#each boardFields as row, rowIndex}
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
