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
          <input type="text" v-model="rootFolderName" @keyup.enter="addFolderToRoot" />
          <button class="save-btn" @click="addFolderToRoot">✅</button>
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
import type { BaseProperty } from '@/types'

const store = useFolderStructureStore()

const isAddFolderToRoot = ref<boolean>(false)

const rootFolderName = ref('')

// console.log('root-folder-name', rootFolderName.value)

const folderData: BaseProperty[] = store.folderData

// console.log(folderData)

function addFolderToRoot() {
  if (rootFolderName.value.trim() == '') {
    alert('Please Enter Folder name')
  } else {
    const newFolder: BaseProperty = {
      _id: Date.now(),
      type: 'folder',
      value: rootFolderName.value,
      children: [],
    }

    store.addFolderToRoot(newFolder)
  }

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
  height: 85vh;
}

.add-folder-to-root {
  background-color: #000;
  color: #fff;
  padding: 20px;
  border-radius: 4px;
  margin: 10px;
  font-size: 20px;
}

.folder-container {
  margin: 10px;
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 3px;
  width: fit-content;
  font-family: Arial, sans-serif;
  padding: 10px;
  border: 2px solid gray;
}

.folder-icon {
  font-size: 1.5rem;
}

button {
  margin: 2px;
  padding: 8px 10px;
  border: none;
  background: none;
  cursor: pointer;
  transition: background-color 0.2s;
  border-radius: 50%;
  font-size: x-large;
}

.save-btn:hover {
  background-color: #d4f4dd;
}

.cancel-btn:hover {
  background-color: #f8d7da;
}

input {
  padding: 8px;
  border: none;
  border: 2px solid gray;
}
</style>
