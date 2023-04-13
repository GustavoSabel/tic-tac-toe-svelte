<script lang="ts">
	import type { Player, PlayerNone } from '../Types/PlayerType';

	export let ariaLabel: string;
	export let player: Player | PlayerNone;
	export let isVictoryCell: boolean;
	$: victoryClass = isVictoryCell ? 'victory' : '';

	let input: HTMLButtonElement;
	export function focus() {
		input.focus();
	}
</script>

<button on:click class={victoryClass} bind:this={input} aria-label={ariaLabel}>
	{player}
</button>

<style>
	button {
		width: 100px;
		height: 100px;
		background-color: #efefef;
		border: 1px solid #000;

		display: flex;
		justify-content: center;
		align-items: center;

		font-size: 50px;
		font-weight: bold;
	}

	button:focus {
		border-color: blue;
		border-width: 0.2rem;
	}

	.victory {
		background-color: #00ff00;
	}
</style>
