<svelte:options immutable={true} />

<script>
  export let note;
</script>

{#if note}
  <p
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
