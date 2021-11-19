<script>
  import { toast } from '@zerodevx/svelte-toast';

  export let word;
</script>

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
        ><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline
          points="15 3 21 3 21 9"
        /><line x1="10" y1="14" x2="21" y2="3" /></svg
      ></span
    ></a
  ></button
>
