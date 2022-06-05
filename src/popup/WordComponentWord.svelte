<svelte:options immutable={true} />

<script>
  export let word;
  export let partOfSpeech;
</script>

<p
  class="focus:outline-none text-sm md:text-lg lg:text-xl leading-7 text-gray-700 dark:text-gray-300"
>
  <span class="font-bold font-serif text-md md:text-xl lg:text-2xl"
    ><a href="https://www.wordnik.com/words/{word}">{word}</a>
  </span><span class="font-medium font-serif text-md md:text-xl lg:text-2xl"
    >({partOfSpeech})</span
  >
</p>
