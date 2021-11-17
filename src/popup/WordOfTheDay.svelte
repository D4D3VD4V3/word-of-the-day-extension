<style>
  @layer utilities {
    @variants responsive {
      /* Chrome, Safari and Opera */
      .no-scrollbar::-webkit-scrollbar {
        display: none;
      }

      .no-scrollbar {
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
      }
    }
  }
</style>

<script>
  import { createEventDispatcher } from 'svelte';
  import { toast } from '@zerodevx/svelte-toast';
  import { fade, fly } from 'svelte/transition';
  /* import { deleteButtonClickEvent } from "./WordListCard.svelte"; */

  export let word;
  export let partOfSpeech;
  export let note;
  export let cardTitle;
  export let saveBtnStatus;
  export let definition_arr = [];
  export let usage_arr = [];

  const dispatch = createEventDispatcher();

  function saveButtonClickEvent() {
    saveBtnStatus = true;
    dispatch('savebtn', {
      text: 'Save button clicked'
    });
  }
</script>

<div
  class="flex flex-col transform transition hover:scale-105 hover:shadow-4xl px-8 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl max-w-lg h-auto overflow-hidden"
>
  <div
    class=" text-white flex items-center absolute rounded-full pt-8 pb-4 px-4  bg-yellow-500 right-4 -top-6"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="feather feather-sunrise"
      ><path d="M17 18a5 5 0 0 0-10 0" /><line x1="12" y1="2" x2="12" y2="9" /><line
        x1="4.22"
        y1="10.22"
        x2="5.64"
        y2="11.64"
      /><line x1="1" y1="18" x2="3" y2="18" /><line
        x1="21"
        y1="18"
        x2="23"
        y2="18"
      /><line x1="18.36" y1="11.64" x2="19.78" y2="10.22" /><line
        x1="23"
        y1="22"
        x2="1"
        y2="22"
      /><polyline points="8 6 12 2 16 6" /></svg
    >
  </div>
  <div class=" divide-y-4 divide-opacity-75 ">
    <div>
      <p
        tabindex="0"
        class="py-4 opacity-90 focus:outline-none text-2xl lg:text-3xl font-bold lg:leading-10 text-gray-800 dark:text-gray-50 text-center"
      >
        {cardTitle}
      </p>
    </div>
    <div />
  </div>
  <div class="overflow-y-scroll ">
    <div class="mt-8">
      <p
        tabindex="0"
        class="focus:outline-none text-sm md:text-lg lg:text-xl leading-7 text-gray-700 dark:text-gray-300"
      >
        <span class="font-bold font-serif text-md md:text-xl lg:text-2xl"
          >{word}
        </span><span class="font-medium font-serif text-md md:text-xl lg:text-2xl"
          >({partOfSpeech})</span
        >
      </p>
      <p
        tabindex="0"
        class="focus:outline-none text-sm md:text-lg lg:text-xl leading-7 text-gray-700 dark:text-gray-300 mt-3 md:mt-6"
      >
        <span class="text-gray-500 dark:text-gray-50 font-bold">Definitions</span>
      </p>
      <ul
        class="px-8 space-y-3 list-disc focus:outline-none text-sm md:text-md lg:text-lg leading-4 text-gray-700 dark:text-gray-300 mt-3 md:mt-6"
      >
        {#each definition_arr as definition}
          <li>{definition}</li>
        {/each}
      </ul>
      <p
        tabindex="0"
        class="focus:outline-none text-sm md:text-lg lg:text-xl leading-7 text-gray-700 dark:text-gray-300 mt-3 md:mt-6"
      >
        <span class="text-gray-500 dark:text-gray-50 font-bold">Usage</span>
      </p>
      <ul
        class="px-8 space-y-3 list-disc focus:outline-none text-sm md:text-md lg:text-lg leading-4 text-gray-700 dark:text-gray-300 mt-3 md:mt-6"
      >
        {#each usage_arr as usage}
          <li>{@html usage}</li>
        {/each}
      </ul>
      {#if note}
        <p
          tabindex="0"
          class="focus:outline-none text-sm md:text-lg lg:text-xl leading-7 text-gray-700 dark:text-gray-300 mt-3 md:mt-6"
        >
          <span class="text-gray-500 dark:text-gray-50 font-bold">Note</span>
        </p>
        <span
          class="space-y-3 list-disc focus:outline-none text-sm md:text-md lg:text-lg leading-4 text-gray-700 dark:text-gray-300 mt-3 md:mt-6"
        >
          {note}
        </span>
      {/if}
    </div>
  </div>
  <div class="mt-auto mt-4 pt-4 border-t-2 border-gray-200 dark:border-gray-900">
    <div class="flex  items-center justify-between px-4 py-4 sm:px-16">
      {#if saveBtnStatus}
        <button
          class="focus:outline-none rounded-full px-8 sm:py-2 py-1 bg-green-700 sm:text-base text-sm font-semibold leading-9 text-center text-white "
          style="cursor:not-allowed"
          disabled
          >Saved <span class="inline-block">
            <!-- feathericons.com -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-check"><polyline points="20 6 9 17 4 12" /></svg
            >
          </span></button
        >
      {:else}
        <button
          on:click={saveButtonClickEvent}
          class="focus:outline-none rounded-full px-8 sm:py-2 py-1 bg-gray-700 hover:bg-gray-600 active:bg-gray-800 sm:text-base text-sm font-semibold leading-9 text-center text-white"
          >Save <span class="inline-block"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-star"
              ><polygon
                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
              /></svg
            ></span
          ></button
        >
      {/if}

      <button
        on:click={() => toast.push('Redirecting')}
        class="focus:outline-none rounded-full px-8 sm:py-2 py-1 active:bg-gray-800 bg-gray-700 hover:bg-gray-600 sm:text-base text-sm font-semibold leading-9 text-center text-white"
        ><a href="https://youglish.com/pronounce/{word}/english?"
          >YouGlish <span class="inline-block"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-external-link"
              ><path
                d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
              /><polyline points="15 3 21 3 21 9" /><line
                x1="10"
                y1="14"
                x2="21"
                y2="3"
              /></svg
            ></span
          ></a
        ></button
      >
    </div>
  </div>
</div>
