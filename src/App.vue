<template>
  <div>
    <header>
      <h1>FOLDER STRUCTURE</h1>
    </header>
    <main>
      <div>
        <button class="add-folder-to-root" @click="isAddFolderToRoot = true">
          Add folder to Root
        </button>
        <div class="folder-container" v-if="isAddFolderToRoot">
          <span class="folder-icon">📁</span>
          <input type="text" v-model="rootFolderName" /> {{ rootFolderName }}
          <button class="save-btn" @click="addFolderToRoot">💾</button>
          <button class="cancel-btn" @click="isAddFolderToRoot = false">❌</button>
        </div>
      </div>
      <div v-for="items in folderData">
        <FileTree :items="items" :key="items._id"></FileTree>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useFolderStructureStore } from './stores/folderStructureStore'
import FileTree from '@/components/FileTree.vue'

const store = useFolderStructureStore()

const isAddFolderToRoot = ref<boolean>(false)

const rootFolderName = ref('')

console.log('root-folder-name', rootFolderName.value)

const folderData = store.folderData

console.log(folderData)

function addFolderToRoot() {
  store.addFolderToRoot({
    _id: Date.now(),
    type: 'folder',
    value: rootFolderName.value,
    children: [],
  })

  isAddFolderToRoot.value = false
  rootFolderName.value = ''
}
</script>

<style scoped>
header {
  background-color: black;
  color: #fff;
  padding: 10px;
  text-align: center;
  margin: 10px;
}
main {
  border: 2px solid red;
  background-color: cornflowerblue;
  height: 85vh;
}

.add-folder-to-root {
  background-color: #000;
  color: #fff;
  padding: 10px;
  border-radius: 4px;
  margin: 10px;
}

.folder-container {
  margin: 10px;
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 3px;
  width: fit-content;
  font-family: Arial, sans-serif;
}

.folder-icon {
  font-size: 1rem;
}

button {
  margin: 2px;
  padding: 8px 10px;
  border: none;
  background: none;
  cursor: pointer;
  transition: background-color 0.2s;
  border-radius: 50%;
}

.save-btn:hover {
  background-color: #d4f4dd;
}

.cancel-btn:hover {
  background-color: #f8d7da;
}
</style>
