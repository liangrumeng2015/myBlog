<template>
  <div class="home">
      <v-EditorArticle />
  </div>
</template>

<script>
// @ is an alias to /src
import EditorArticle from '@/components/EditorArticle'
export default {
  name: 'Home',
  components: {
    'v-EditorArticle':EditorArticle
  }
}
</script>
