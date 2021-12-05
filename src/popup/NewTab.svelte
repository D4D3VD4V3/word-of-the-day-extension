<style>
</style>

<script defer>
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { SvelteToast, toast } from '@zerodevx/svelte-toast';
  import nightwind from 'nightwind/helper';
  import WordOfTheDay from './WordOfTheDay.svelte';
  import WordListCard from './WordListCard.svelte';

  let saveBtnStatus;
  let loaded;
  let darkModeEnabled;
  let wordArr;
  let wotdObj;

  $: saveBtnStatus = false;
  $: loaded = false;
  $: darkModeEnabled = true;
  $: wordArr = [];

  function readLocalStorage(key) {
    return new Promise(resolve =>
      chrome.storage.local.get([key], result =>
        Object.values(result).length ? resolve(Object.values(result)[0]) : resolve(null)
      )
    );
  }

  function writeLocalStorage(key, value) {
    chrome.storage.local.set({ [key]: value });
  }

  async function checkWordInWordList(key) {
    const wordlist = await readLocalStorage('wordlist');
    if (wordlist) {
      if (key in wordlist) return true;
    }
    return false;
  }

  async function retrieveWords() {
    console.time('actualwordsretrieve');
    const wordlist = await readLocalStorage('wordlist');
    if (wordlist) {
      console.timeEnd('actualwordsretrieve');
      for (const [key, value] of Object.entries(wordlist)) {
        wordlist[key] = JSON.parse(value);
      }
    }
    return wordlist || {};
  }

  async function retrieveWordList() {
    const wordlist = await retrieveWords();
    return Object.keys(wordlist);
  }

  // https://stackoverflow.com/a/30599930
  function highlightWord(word, sentence) {
    return sentence.replace(new RegExp(`(\\b)(${word})(\\b)`, 'ig'), '$1<i>$2</i>$3');
  }

  async function getWOTD() {
    console.log('fetching new data');
    const res = await fetch('https://oq3p80.deta.dev/');
    const data = await res.json();
    if (res.ok) {
      return {
        word: data.word,
        partOfSpeech: data.definitions[0].partOfSpeech,
        definition_arr: data.definitions.map(({ text }) => text),
        usage_arr: data.examples.map(({ text }) => highlightWord(data.word, text)),
        note: data.note
      };
    }
    throw new Error(res.text());
  }

  async function getLocalWOTD() {
    const date = await readLocalStorage('date');

    const now = new Date();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);

    if (!date) {
      writeLocalStorage('date', now.getTime());
      const wotdobj = await getWOTD();
      writeLocalStorage('wotd', wotdobj);
      writeLocalStorage('date', now.getTime());
      return wotdobj;
    }
    const old = await readLocalStorage('date');
    if (now.getTime() <= old) {
      const datum = await readLocalStorage('wotd');
      if (datum) {
        return datum;
      }
    } else {
      const wotdobj = await getWOTD();
      writeLocalStorage('wotd', wotdobj);
      writeLocalStorage('date', now.getTime());
      return wotdobj;
    }
  }

  async function saveWord() {
    try {
      let wordlist = await readLocalStorage('wordlist');
      const wotdobj = await getLocalWOTD();
      wordlist = wordlist || {};

      wordlist[wotdobj.word] = JSON.stringify(wotdobj);
      wordArr[wotdobj.word] = wotdobj;
      wordArr = wordArr;

      writeLocalStorage('wordlist', wordlist);
      toast.push('Saved!');
    } catch (err) {
      toast.push('Error saving word!');
      console.error(err.message);
    }
  }

  async function deleteWord(event) {
    try {
      console.log(event.detail);
      let wordlist = await readLocalStorage('wordlist');
      wordlist = wordlist || {};
      delete wordlist[event.detail.text];

      writeLocalStorage('wordlist', wordlist);
      toast.push('Deleted!');
      saveBtnStatus = false;
    } catch (err) {
      toast.push('Error deleting word!');
      console.error(err.message);
    }
  }

  onMount(async () => {
    console.time('onmount');
    console.time('wordsretrieve');
    try {
      wordArr = await retrieveWords();
    } catch (err) {
      toast.push('Error');
      console.error(err.message);
    }
    console.timeEnd('wordsretrieve');

    darkModeEnabled = (await readLocalStorage('darkmode')) || true;
    nightwind.enable(darkModeEnabled);
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const sidebar = document.querySelector('.sidebar');

    hamburgerBtn.addEventListener('click', () => {
      sidebar.classList.toggle('-translate-x-2/3');
    });

    console.timeEnd('onmount');
  });

  async function setValues() {
    console.time('setValues');
    wotdObj = await getLocalWOTD();
    saveBtnStatus = await checkWordInWordList(wotdObj.word);
    loaded = true;
    console.timeEnd('setValues');
  }

  console.time('primaryPromise');
  const primaryPromise = setValues();
  console.timeEnd('primaryPromise');
</script>

<main
  class="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 h-screen"
  transition:fade={{ duration: 100 }}
>
  <div class="flex ">
    <!-- settings hamburger-->
    <div
      class="z-40 backdrop-filter backdrop-blur-3xl hover:backdrop-saturate-150 hover:bg-black hover:bg-opacity-40 sidebar flex absolute inset-y-0 flex-row w-96 transform -translate-x-2/3  transition duration-200 ease-in-out"
    >
      <div class="flex flex-col flex-1">
        <div class="pt-8 flex items-center justify-center">
          <p class="text-lg font-bold">SETTINGS</p>
        </div>
        <!-- settings -->
        <div class="flex-1 px-8 py-16 space-y-8 text-bold text-base">
          <div class="flex justify-between items-center">
            <p>Dark Mode</p>
            <input
              type="checkbox"
              bind:checked={darkModeEnabled}
              on:click={() => {
                nightwind.toggle();
                writeLocalStorage('darkmode', !darkModeEnabled);
              }}
              class="toggle"
            />
          </div>
          <!--<div>
          <button
            class="focus:outline-none rounded-full px-8 sm:py-2 py-1 active:bg-gray-800 bg-gray-700 hover:bg-gray-600 sm:text-base text-sm font-semibold leading-9 text-center text-white"
            ><a href="#"
              >Export <span class="inline-block"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  > <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 16v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 012-2h2m3-4H9a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-1m-1 4l-3 3m0 0l-3-3m3 3V3"
                  />
                  >
                </svg></span
              ></a
            ></button
          >
        </div>
-->
        </div>
      </div>

      <!--
      <div
        class="w-1/3 absolute inset-y-0 left-16 transform -translate-x-full relative translate-x- transition duration-200 ease-in-out"
      >
-->
      <div class="w-1/3 relative flex flex-col items-center">
        <button class="hamburger-btn py-8 focus:outline-none">
          <svg
            class="w-8 h-8"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </div>
    <div class="w-screen h-screen justify-center flex py-16">
      {#if loaded}
        <div class=" grid grid-cols-1 gap-12 xl:grid-cols-2 max-h-full" in:fly={{}}>
          {#await primaryPromise then wotdArgs}
            <WordOfTheDay
              {...wotdObj}
              cardTitle="Word of the Day"
              on:savebtn={saveWord}
              bind:saveBtnStatus
            />
          {/await}
          <WordListCard on:deletebtn={deleteWord} bind:wordArr />
        </div>
        <SvelteToast />
      {:else}
        <div>
          <div class="flex items-center justify-center w-full h-full">
            <div class="flex justify-center items-center space-x-1 text-md text-white">
              <svg
                fill="none"
                class="w-6 h-6 animate-spin"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clip-rule="evenodd"
                  d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
                  fill="currentColor"
                  fill-rule="evenodd"
                />
              </svg>

              <div class="text-lg text-white">Loading ...</div>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>
</main>
