<script lang="ts">
    import ListItem from "./lib/ListItem.svelte";
    import musics from "./assets/musics.json";
    import MusicPlayer from "./lib/MusicPlayer.svelte";
    let musicPlayer: MusicPlayer;
</script>

<main class="flex justify-center">
    <div class="w-[85vw] max-w-full">
        {#each musics as music, index}
            <ListItem
                songName={music.name}
                thumbnailUrl={music.image_url}
                url={music.soundcloud}
                on:click={() => {
                    musicPlayer.play(index);
                }}
            />
        {/each}
        <MusicPlayer bind:this={musicPlayer} />
    </div>
</main>

<style>
</style>
