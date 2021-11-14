<script>
  import { createEventDispatcher } from "svelte";

  export let wordlistArr;

  const dispatch = createEventDispatcher();

  function deleteButtonClickEvent(word) {
    dispatch("deletebtn", {
      text: word,
    });
  }
</script>

<div
  class="flex flex-col transform transition hover:scale-105 hover:shadow-4xl px-8 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl max-w-lg h-auto overflow-hidden"
>
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
        Saved Words
      </p>
    </div>
    <div />
  </div>
  <div class="no-scrollbar overflow-y-scroll ">
    <div class="mt-8" />
    <div class="bg-gray-100 w-full mb-8 overflow-hidden rounded-lg shadow-xs">
      <div class="bg-gray-100 w-full overflow-x-auto">
        <table class="w-full whitespace-no-wrap">
          <thead>
            <tr
              class="text-sm md:text-md lg:text-lg  font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
            >
              <th class="px-4 py-3">Word</th>
              <th class="px-4 py-3" />
            </tr>
          </thead>
          <tbody
            class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
          >
            {#if wordlistArr}
              {#each wordlistArr as word}
                <tr
                  class="bg-gray-100 text-gray-700 dark:text-gray-400 text-sm md:text-md lg:text-lg "
                >
                  <td class="px-4 py-3">{word}</td>
                  <td class="text-red-700 px-4 py-3 text-sm text-center"
                    ><button
                      class=""
                      on:click={() => deleteButtonClickEvent(word)}
                      ><svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-x"
                        ><line x1="18" y1="6" x2="6" y2="18" /><line
                          x1="6"
                          y1="6"
                          x2="18"
                          y2="18"
                        /></svg
                      ></button
                    ></td
                  >
                </tr>
              {/each}
            {/if}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div
    class="mt-auto mt-4 pt-4 border-t-2 border-gray-200 dark:border-gray-900"
  />
</div>

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
