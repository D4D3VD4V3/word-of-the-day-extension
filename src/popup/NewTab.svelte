<script>
  import { onMount } from "svelte";
  import WordOfTheDay from "./WordOfTheDay.svelte";
  import WordListCard from "./WordListCard.svelte";
  import LoadingCard from "./LoadingCard.svelte";
  import { SvelteToast } from "@zerodevx/svelte-toast";
  import { toast } from "@zerodevx/svelte-toast";

  let wotdObj;
  $: saveBtnStatus = false;
  $: loaded = false;
  $: wordlistArr = [];

  function readLocalStorage(key) {
    return new Promise((resolve) =>
      chrome.storage.local.get([key], (result) =>
        Object.values(result).length
          ? resolve(Object.values(result)[0])
          : resolve(null)
      )
    );
  }

  function writeLocalStorage(key, value) {
    chrome.storage.local.set({ [key]: value });
  }

  async function checkWordInWordList(key) {
    let wordlist = await readLocalStorage("wordlist");
    if (wordlist) {
      if (key in wordlist) return true;
    }
    return false;
  }

  async function retrieveWordList(key) {
    let wordlist = await readLocalStorage("wordlist");
    wordlist = wordlist ? wordlist : {};
    return Object.keys(wordlist);
  }

  //https://stackoverflow.com/a/30599930
  function highlightWord(word, sentence) {
    return sentence.replace(
      new RegExp("(\\b)(" + word + ")(\\b)", "ig"),
      "$1<i>$2</i>$3"
    );
  }

  async function saveWord() {
    try {
      let wordlist = await readLocalStorage("wordlist");
      let wotdobj = await getLocalWOTD();
      wordlist = wordlist ? wordlist : {};

      wordlist[wotdobj.word] = JSON.stringify(wotdobj);
      wordlistArr = [...wordlistArr, wotdobj.word];

      writeLocalStorage("wordlist", wordlist);
      toast.push("Saved!");
    } catch (err) {
      toast.push("Error saving word!");
      console.error(err.message);
    }
  }

  async function deleteWord(event) {
    try {
      saveBtnStatus = false;
      wordlistArr = wordlistArr.filter((el) => el != event.detail.text);
      let wordlist = await readLocalStorage("wordlist");
      wordlist = wordlist ? wordlist : {};
      delete wordlist[event.detail.text];

      writeLocalStorage("wordlist", wordlist);
      toast.push("Deleted!");
    } catch (err) {
      toast.push("Error deleting word!");
      console.error(err.message);
    }
  }

  async function getLocalWOTD() {
    let date = await readLocalStorage("date");

    let now = new Date();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);

    if (!date) {
      writeLocalStorage("date", now.getTime());
      return;
    }
    let old = await readLocalStorage("date");
    if (now.getTime() <= old) {
      let datum = await readLocalStorage("wotd");
      return datum;
    }
    let wotdobj = await getWOTD();
    writeLocalStorage("wotd", wotdobj);
    writeLocalStorage("date", now.getTime());
    return wotdobj;
  }

  async function getWOTD() {
    const res = await fetch(
        `https://oq3p80.deta.dev/`
    );
    const data = await res.json();
    if (res.ok) {
      return {
        word: data["word"],
        partOfSpeech: data["definitions"][0]["partOfSpeech"],
        definition_arr: data.definitions.map(({ text }) => text),
        usage_arr: data.examples.map(({ text }) =>
          highlightWord(data["word"], text)
        ),
        note: data["note"],
      };
    } else {
      throw new Error(res.text());
    }
  }

  async function getRandomWord() {
    const res = await fetch(
      `https://api.wordnik.com/v4/words.json/randomWord?api_key=${API_KEY}`
    );
    const data = await res.json();
    if (res.ok) {
      return {
        word: data["word"],
        partOfSpeech: data["definitions"][0]["partOfSpeech"],
        definition_arr: data.definitions.map(({ text }) => text),
        usage_arr: data.examples.map(({ text }) => text),
        note: data["note"],
      };
    } else {
      throw new Error(res.text());
    }
  }

  onMount(async () => {
    try {
      wordlistArr = await retrieveWordList();
    } catch (err) {
      toast.push("Error");
      console.error(err.message);
    }
  });

  async function setValues() {
    wotdObj = await getLocalWOTD();
    saveBtnStatus = await checkWordInWordList(wotdObj.word);
    loaded = true;
  }

  const primaryPromise = setValues();
</script>

<main class="h-screen">
  {#if loaded}
    <div
      class="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 w-full h-full justify-center flex py-16"
    >
      <div class=" grid grid-cols-1 gap-12 xl:grid-cols-2 max-h-full">
        {#await primaryPromise}
          <LoadingCard />
        {:then wotdArgs}
          <WordOfTheDay
            {...wotdObj}
            cardTitle="Word of the Day"
            on:savebtn={saveWord}
            bind:saveBtnStatus
          />
        {/await}
        {#if wordlistArr}
          <WordListCard on:deletebtn={deleteWord} bind:wordlistArr />
        {/if}
      </div>
      <SvelteToast />
    </div>
  {:else}
    <div
      class="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 w-full h-screen justify-center flex py-12 px-4 gap-5 "
    />
  {/if}
</main>

<style>
  :global(.scrollbox) {
    position: relative;
    z-index: 1;
    overflow: auto;
    width: 200px;
    max-height: 200px;
    margin: 50px auto;
    background: #fff no-repeat;
    background-image: -webkit-radial-gradient(
        50% 0,
        farthest-side,
        rgba(0, 0, 0, 0.2),
        rgba(0, 0, 0, 0)
      ),
      -webkit-radial-gradient(50% 100%, farthest-side, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0));
    background-image: -moz-radial-gradient(
        50% 0,
        farthest-side,
        rgba(0, 0, 0, 0.2),
        rgba(0, 0, 0, 0)
      ),
      -moz-radial-gradient(50% 100%, farthest-side, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0));
    background-image: radial-gradient(
        farthest-side at 50% 0,
        rgba(0, 0, 0, 0.2),
        rgba(0, 0, 0, 0)
      ),
      radial-gradient(
        farthest-side at 50% 100%,
        rgba(0, 0, 0, 0.2),
        rgba(0, 0, 0, 0)
      );
    background-position: 0 0, 0 100%;
    background-size: 100% 14px;
  }

  .scrollbox:before,
  .scrollbox:after {
    content: "";
    position: relative;
    z-index: -1;
    display: block;
    height: 30px;
    margin: 0 0 -30px;
    background: -webkit-linear-gradient(
      top,
      #fff,
      #fff 30%,
      rgba(255, 255, 255, 0)
    );
    background: -moz-linear-gradient(
      top,
      #fff,
      #fff 30%,
      rgba(255, 255, 255, 0)
    );
    background: linear-gradient(
      to bottom,
      #fff,
      #fff 30%,
      rgba(255, 255, 255, 0)
    );
  }

  .scrollbox:after {
    margin: -30px 0 0;
    background: -webkit-linear-gradient(
      top,
      rgba(255, 255, 255, 0),
      #fff 70%,
      #fff
    );
    background: -moz-linear-gradient(
      top,
      rgba(255, 255, 255, 0),
      #fff 70%,
      #fff
    );
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0),
      #fff 70%,
      #fff
    );
  }
</style>
