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

  import { fade, fly } from 'svelte/transition';

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
        tabindex="0"
        class="py-4 opacity-90 focus:outline-none text-2xl lg:text-3xl font-bold lg:leading-10 text-gray-800 dark:text-gray-50 text-center"
      >
        Saved Words <span class="">({Object.keys(wordArr).length})</span>
      </p>
    </div>
    <div />
  </div>
  <div class="overflow-y-scroll ">
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
              <span class="font-bold font-serif text-sm md:text-md lg:text-lg">{key}</span
              >
              <span class="font-medium font-serif text-sm md:text-md lg:text-lg"
                >({value.partOfSpeech})</span
              >
            </div>
            <div class="collapse-content">
              <p
                tabindex="0"
                class="focus:outline-none text-sm md:text-lg lg:text-xl leading-7 text-gray-700 dark:text-gray-300 mt-3 md:mt-6"
              >
                <span class="text-gray-500 dark:text-gray-50 font-bold">Definitions</span>
              </p>
              <ul
                class="px-8 space-y-3 list-disc focus:outline-none text-sm md:text-md lg:text-lg leading-4 text-gray-700 dark:text-gray-300 mt-3 md:mt-6"
              >
                {#each value.definition_arr as definition}
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
                {#each value.usage_arr as usage}
                  <li>{@html usage}</li>
                {/each}
              </ul>
              {#if value.note}
                <p
                  tabindex="0"
                  class="focus:outline-none text-sm md:text-lg lg:text-xl leading-7 text-gray-700 dark:text-gray-300 mt-3 md:mt-6"
                >
                  <span class="text-gray-500 dark:text-gray-50 font-bold">Note</span>
                </p>
                <span
                  class="space-y-3 list-disc focus:outline-none text-sm md:text-md lg:text-lg leading-4 text-gray-700 dark:text-gray-300 mt-3 md:mt-6"
                >
                  {value.note}
                </span>
              {/if}
              <div class="divider" />
              <div class="flex flex-col justify-center items-center">
                <!--<a href="#my-modal" class="btn bg-red-500 m-10 border-none rounded-full"-->
                <!--  >DELETE</a-->
                <!-->-->

                <!--<div id="my-modal" class="modal">-->
                <!--  <div class="modal-box bg-gray-100">-->
                <!--    <p>Are you sure you want to delete this word?</p>-->
                <!--    <div class="modal-action">-->
                <!--      <a-->
                <!--        href="#"-->
                <!--        class="btn bg-red-500 border-none rounded-full"-->
                <!--        on:click={() => deleteButtonClickEvent(key)}>Yes</a-->
                <!--      >-->
                <!--      <a href="#" class="btn border-none rounded-full">No</a>-->
                <!--    </div>-->
                <!--  </div>-->
                <!--</div>-->

                <button
                  class="btn btn-circle btn-md bg-red-700 grid place-items-center border-none"
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
  <div class="mt-auto mt-4 pt-4 border-t-2 border-gray-200 dark:border-gray-900" />
</div>
