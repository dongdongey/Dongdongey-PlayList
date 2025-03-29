<script lang="ts">
    import PauseIcon from "../assets/pause.svelte";
    import PlayIcon from "../assets/play_arrow.svelte";
    import SkipNextIcon from "../assets/skip_next.svelte";
    import SkipPrevIcon from "../assets/skip_previous.svelte";
    import musics from "../assets/musics.json";

    let nowPlaying: Boolean = false;

    const audioes = musics.map((music) => {
        return new Audio(music.path);
    });

    const audioes_num = audioes.length;
    let playIndex = 0;

    export const play = (index: number) => {
        if (nowPlaying) audioes[playIndex].pause();
        audioes[playIndex].currentTime = 0;
        playIndex = index;
        nowPlaying = true;
        audioes[playIndex].play();
    };

    const clickPlayButton = () => {
        nowPlaying = !nowPlaying;

        if (nowPlaying) {
            audioes[playIndex].play();
        } else {
            audioes[playIndex].pause();
        }
    };

    const nextPlay = () => {
        playIndex++;
        if (playIndex >= audioes_num) {
            playIndex--;
            return;
        }
        audioes[playIndex - 1].currentTime = 0;
        if (nowPlaying) {
            audioes[playIndex - 1].pause();
        }
        nowPlaying = true;
        audioes[playIndex].play();
    };

    const prevPlay = () => {
        if (audioes[playIndex].currentTime > 3) {
            audioes[playIndex].currentTime = 0;
        } else {
            if (playIndex == 0) {
                audioes[playIndex].currentTime = 0;
                nowPlaying = true;
                return;
            }
            playIndex--;
            if (nowPlaying) {
                audioes[playIndex + 1].currentTime = 0;
                audioes[playIndex + 1].pause();
            }
            audioes[playIndex].play();
        }
        nowPlaying = true;
    };

    let volume = 700;

    const changeVolume = () => {
        audioes[playIndex].volume = volume / 1000;
    };

    let progress = 0;

    audioes.forEach((audio, index) => {
        audio.addEventListener("ended", () => {
            nextPlay();
            if (index === playIndex) {
                progress = 0;
            }
        });
        audio.addEventListener("play", () => {
            audio.volume = volume / 1000;
        });

        // Add timeupdate event listener to track progress
        audio.addEventListener("timeupdate", () => {
            if (index === playIndex) {
                progress = (audio.currentTime / audio.duration) * 10000;
            }
        });

        audio.addEventListener("volumechange", () => {
            if (index === playIndex) {
                volume = audio.volume * 1000;
            }
        });
    });

    // New function to handle progress bar seeking
    const seekAudio = () => {
        const currentAudio = audioes[playIndex];
        const seekTime = (progress / 10000) * currentAudio.duration;
        currentAudio.currentTime = seekTime;
    };

    if ("mediaSession" in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: "None",
            artist: "Dongdongey",
            artwork: [
                { src: "/image.png", sizes: "512x512", type: "image/png" },
            ],
        });

        navigator.mediaSession.setActionHandler("play", () => {
            clickPlayButton();
        });

        navigator.mediaSession.setActionHandler("pause", () => {
            clickPlayButton();
        });

        navigator.mediaSession.setActionHandler("nexttrack", () => {
            nextPlay();
        });
        navigator.mediaSession.setActionHandler("previoustrack", () => {
            prevPlay();
        });
    }
    $: if (navigator.mediaSession.metadata)
        navigator.mediaSession.metadata.title = musics[playIndex].name;
    $: progressPercentage = `${progress / 100}%`; //(progress / 10000) * 100
    $: volumePercentage = `${volume / 10}%`; // (volume / 1000) * 100
    let isIOS = false;
    if (typeof navigator !== "undefined") {
        const userAgent =
            navigator.userAgent ||
            navigator.vendor ||
            (window as any).opera ||
            "";
        isIOS = /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream;
    }
</script>

<div class="w-full p-1 bg-zinc-700 rounded-2xl mx-0 my-2">
    <input
        class="w-[90%] m-2"
        type="range"
        min="0"
        max="10000"
        bind:value={progress}
        on:input={seekAudio}
        style="--range-progress: {progressPercentage}"
    />
    <div class="flex flex-row gap-2 justify-center items-center text-zinc-400">
        <audio></audio>
        <div>
            <button
                class="playButt hover:text-[var(--progress-red)]"
                on:click={prevPlay}
            >
                <SkipPrevIcon />
            </button>
            <button
                class="playButt hover:text-[var(--progress-red)]"
                on:click={clickPlayButton}
            >
                <svelte:component this={nowPlaying ? PauseIcon : PlayIcon} />
            </button>
            <button
                class="playButt hover:text-[var(--progress-red)]"
                on:click={nextPlay}
            >
                <SkipNextIcon />
            </button>
        </div>
        {#if !isIOS}
            <input
                type="range"
                min="0"
                max="1000"
                bind:value={volume}
                on:input={changeVolume}
                class="w-24"
                style="--range-progress: {volumePercentage}"
            />
        {/if}
    </div>
</div>

<style>
    input[type="range"] {
        height: 6px;
        appearance: inherit;
        background: linear-gradient(
            to right,
            var(--progress-red) 0%,
            var(--progress-red) var(--range-progress),
            #ddd var(--range-progress),
            #ddd 100%
        );
        outline: none;
        opacity: 0.7;
        transition: opacity 0.2s;
        border-radius: var(--radius-2xl);
    }

    input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none; /* 기본 스타일 제거 */
        appearance: none;
        width: 16px; /* 썸의 너비 */
        height: 16px; /* 썸의 높이 */
        background: var(--progress-red); /* 배경색 */
        cursor: pointer; /* 커서 모양 변경 */
        border-radius: 50%; /* 원형으로 만들기 */
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.3); /* 그림자 효과 */
    }

    input[type="range"]:hover {
        opacity: 1;
    }
    button.playButt {
        border-radius: 4em;
    }
</style>
