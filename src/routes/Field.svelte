<script lang="ts">
	import type { Player, PlayerNone } from '../Types/PlayerType';

	export let player: Player | PlayerNone;
</script>

<div on:click on:keydown>
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

	span {
		font-size: 50px;
		font-weight: bold;
	}
</style>
