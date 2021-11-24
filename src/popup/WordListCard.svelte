<style>
  /* Hide scrollbar for Chrome, Safari and Opera */
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  .no-scrollbar {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
</style>

<script>
  import { createEventDispatcher } from 'svelte';
  import { toast } from '@zerodevx/svelte-toast';
  import { fade, fly } from 'svelte/transition';
  import WordComponentWord from './WordComponentWord.svelte';
  import WordComponentDefinition from './WordComponentDefinition.svelte';
  import WordComponentUsage from './WordComponentUsage.svelte';
  import WordComponentNote from './WordComponentNote.svelte';
  import YouGlishButton from './YouGlishButton.svelte';

  export let wordArr;

  const dispatch = createEventDispatcher();

  function deleteButtonClickEvent(word) {
    delete wordArr[word];
    wordArr = wordArr;
    dispatch('deletebtn', {
      text: word
    });
  }
</script>

<div
  class="flex flex-col transform transition hover:scale-105 hover:shadow-4xl px-8 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl max-w-lg h-auto overflow-hidden"
>
  <!--<div-->
  <!--  class=" text-white flex items-center absolute rounded-full pt-8 pb-4 px-4 left-4 -top-4"-->
  <!-->-->
  <!--  [><div class="badge badge-lg">{Object.keys(wordArr).length}</div><]-->
  <!--  <div class="shadow stats text-sm rounded-full">-->
  <!--    <div class="stat text-sm">-->
  <!--      <div class="stat-value text-sm">{Object.keys(wordArr).length}</div>-->
  <!--    </div>-->
  <!--  </div>-->
  <!--</div>-->
  <div
    class=" text-white flex items-center absolute rounded-full pt-8 pb-4 px-4  bg-green-500 right-4 -top-6"
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
      class="feather feather-bookmark"
      ><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg
    >
  </div>
  <div class="divide-y-4 divide-opacity-75 ">
    <div>
      <p
        class="py-4 opacity-90 focus:outline-none text-2xl lg:text-3xl font-bold lg:leading-10 text-gray-800 dark:text-gray-50 text-center"
      >
        Saved Words <span class="">({Object.keys(wordArr).length})</span>
      </p>
    </div>
    <div />
  </div>
  {#if Object.keys(wordArr).length === 0}
    <div class="overflow-y-scroll flex flex-grow flex-col items-center justify-center">
      <div class="mt-4" />
      <div class="bg-gray-100 w-full mb-8 rounded-lg shadow-xs">
        <div class="bg-gray-100 w-full overflow-x-auto space-y-4">
          <div class="flex flex-col flex-grow justify-center items-center">
            <svg
              class="h-16 w-16 fill-current text-gray-500"
              viewBox="0 0 412.533 412.533"
              style="enable-background:new 0 0 412.533 412.533"
              xml:space="preserve"
              ><path
                d="M412.485 203.954h.041c0-14.323-5.609-27.336-14.729-37.042l.016-.016-79.27-101.819H90.479L13.493 168.961l.033.033C6.243 177.61 1.764 188.559.992 200.508.415 201.629 0 202.84 0 204.19v135.138a8.127 8.127 0 0 0 8.129 8.129h396.276a8.121 8.121 0 0 0 8.129-8.129V204.19c-.001-.081-.049-.155-.049-.236zM97.844 81.335H311.43l48.389 68.5c-.512-.016-1-.081-1.52-.081h-97.502v24.369c0 27.67-29.052 21.687-37.96 21.687h-32.466c-8.909 0-37.96 5.983-37.96-21.687v-24.369H54.9c-1.016 0-2.008.098-3.016.146l45.96-68.565zm298.432 249.864H16.265V204.19c0-.081-.041-.154-.049-.236h.723c0-20.923 17.029-37.944 37.96-37.944h81.253v8.112c0 27.987 21.281 37.944 54.218 37.944h32.466c32.945 0 54.218-9.957 54.218-37.944v-8.112h81.261c10.461 0 19.948 4.251 26.824 11.12l.016.016c6.869 6.869 11.112 16.347 11.112 26.808h.057c0 .081-.049.154-.049.236l.001 127.009z"
              /></svg
            >
            <p class="text-gray-500 text-base">
              Save some words and they will show up here!
            </p>
          </div>
        </div>
      </div>
    </div>
  {:else}
    <div class="overflow-y-scroll">
      <div class="mt-4" />
      <div class="bg-gray-100 w-full mb-8 rounded-lg shadow-xs">
        <div class="bg-gray-100 w-full overflow-x-auto space-y-4">
          {#each Object.entries(wordArr) as [key, value] (key)}
            <div
              class="collapse w-full border rounded-box border-gray-300 collapse-arrow text-gray-800 "
              in:fade
            >
              <input type="checkbox" />
              <div class="collapse-title text-xl font-medium">
                <span class="font-bold font-serif text-sm md:text-md lg:text-lg"
                  >{key}</span
                >
                <span class="font-medium font-serif text-sm md:text-md lg:text-lg"
                  >({value.partOfSpeech})</span
                >
              </div>
              <div class="collapse-content">
                <WordComponentDefinition definition_arr={value.definition_arr} />
                <WordComponentUsage usage_arr={value.usage_arr} />
                <WordComponentNote note={value.note} />
                <div class="divider" />
                <div class="flex flex-col justify-center items-center">
                  <YouGlishButton word={key} />
                </div>
                <div class="divider" />
                <div class="flex flex-col justify-center items-center">
                  <button
                    class="btn btn-circle btn-md dark:bg-red-700 bg-red-700 grid place-items-center border-none"
                    on:click={() => deleteButtonClickEvent(key)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      class="inline-block w-6 h-6 stroke-current"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  {/if}
  <div class="mt-auto mt-4 pt-4 border-t-2 border-gray-200 dark:border-gray-900" />
</div>
