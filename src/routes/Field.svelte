<script lang="ts">
	import type { Player, PlayerNone } from '../Types/PlayerType';

	export let player: Player | PlayerNone;
	export let isVictoryCell: boolean;
	$: victoryClass = isVictoryCell ? 'victory' : '';
</script>

<div on:click on:keydown class={victoryClass}>
	<span>
		{player}
	</span>
</div>

<style>
	div {
		width: 100px;
		height: 100px;
		background-color: #efefef;
		border: 1px solid #000;

		display: flex;
		justify-content: center;
		align-items: center;
	}

	.victory {
		background-color: #00ff00;
	}

	span {
		font-size: 50px;
		font-weight: bold;
	}

	div {
		background-color: #efefef;
	}
</style>
