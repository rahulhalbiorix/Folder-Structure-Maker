<template>
  <ul>
    <div>
      <div>
        <span v-if="items.type === 'folder'"> 📁 {{ items.value }} </span>
        <span v-else> 📄 {{ items.value }} </span>
      </div>
      <div v-if="items.children.length">
        <div v-for="items in items.children">
          <FileTree :items="items" :key="items._id" />
        </div>
      </div>
    </div>
  </ul>
</template>

<script setup>
import FileTree from '@/components/FileTree.vue'

defineProps({
  items: Object,
  required: true,
})
</script>

<style scoped>
ul {
  list-style-type: none;
  padding-left: 20px;
  background-color: purple;
}
span {
  cursor: pointer;
}
</style>
