<main>
  <h1>Tic Tac Toe with Svelte</h1>
  <slot />
</main>

<style>
  :global(*) {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    font-family: 'Open Sans', sans-serif; 
  }
  :global(body, html) {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  h1 {
    text-align: center;
    color: #efefef;
    font-size: 2rem;
    padding: 1rem 0;
  }
  main {
    height: 100%;
    height: 100vh;
    margin: 0 auto;
    background-color: #192A32;
  }
</style>