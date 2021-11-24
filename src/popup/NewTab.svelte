<style>
</style>

<script>
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { SvelteToast, toast } from '@zerodevx/svelte-toast';
  import WordOfTheDay from './WordOfTheDay.svelte';
  import WordListCard from './WordListCard.svelte';

  let loaded;
  let saveBtnStatus;
  let wordArr;

  let wotdObj;
  $: saveBtnStatus = false;
  $: loaded = false;
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
    const wordlist = await readLocalStorage('wordlist');
    if (wordlist) {
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
    try {
      wordArr = await retrieveWords();
    } catch (err) {
      toast.push('Error');
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
  <div
    class="bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900 w-full h-full justify-center flex py-16 background-animate"
  >
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
      <div
        class="bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900 w-full h-screen justify-center flex py-12 px-4 gap-5 "
      >
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
</main>
