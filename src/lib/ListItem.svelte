<script lang="ts">
    export let songName: string;
    export let thumbnailUrl: string;
    export let url: string | null = null;
</script>

<button
    class="w-full flex flex-row p-1 h-20 outline-2 outline-zinc-900 mx-0 my-2 rounded-2xl hover:outline-[var(--progress-red)]"
    on:click
>
    <img
        class="h-[90%] w-auto object-contain m-1 rounded-xl border-2 border-zinc-900"
        src={thumbnailUrl}
        alt=""
    />
    <div class="ml-3 flex flex-col text-left truncate w-full justify-between">
        <p class="font-bold text-xl">{songName}</p>
        {#if url !== null}
            <div class="self-end mb-1">
                <a href={url} class="ml-auto text-sm font-thin" target="_blank">
                    go to soundcloud
                </a>
            </div>
        {/if}
    </div>
</button>

<style>
    /* 모바일 터치 최적화를 위한 스타일 */
    :global(html) {
        -webkit-text-size-adjust: 100%;
    }

    /* iOS 터치 효과 제거 */
    button {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        user-select: none;
    }
</style>
