<template>
  <ul>
    <li>
      <div class="folder-design">
        <span v-if="items.type === 'folder'" class="folder-nod">
          📁 {{ items.value }}
          <span>
            <button class="addFolderBtn" @click="isAddFolderOrFileBtn = true">+</button>
          </span>
          <span>
            <button class="deleteFolderBtn" @click="deleteFolderBtn(items._id)">-</button>
          </span>
          <div v-if="isAddFolderOrFileBtn" class="add-file-folder-btn">
            <span
              ><button
                class="selectFile"
                @click="
                  () => {
                    isAddFile = true
                    isAddFolderOrFileBtn = false
                  }
                "
              >
                File
              </button></span
            >
            <span
              ><button
                class="selectFolder"
                @click="
                  () => {
                    isAddFolder = true
                    isAddFolderOrFileBtn = false
                  }
                "
              >
                Folder
              </button></span
            >
          </div>
          <div class="file-container" v-if="isAddFile">
            <span class="file-icon">📄</span>
            <input type="text" v-model="fileName" @keyup.enter="addFile(items._id)" />

            <button class="save-btn" @click="addFile(items._id)">➕</button>
            <button class="cancel-btn" @click="cancelAddFile">❌</button>
          </div>
          <div class="folder-container" v-if="isAddFolder">
            <span class="folder-icon">📁</span>
            <input type="text" v-model="folderName" @keyup.enter="addFolders(items._id)" />

            <button class="save-btn" @click="addFolders(items._id)">➕</button>
            <button class="cancel-btn" @click="cancelAddFolder">❌</button>
          </div>
        </span>
        <span v-else class="file-node">
          📄 {{ items.value }}
          <span><button class="deleteFileBtn" @click="deleteFolderBtn(items._id)">-</button></span>
        </span>
      </div>
      <div v-if="items.children?.length">
        <div v-for="child in items.children" :key="child._id">
          <FileTree :items="child" />
        </div>
      </div>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import FileTree from '@/components/FileTree.vue'
import { ref } from 'vue'
import { useFolderStructureStore } from '@/stores/folderStructureStore'

defineProps({
  items: Object,
  required: true,
})

const store = useFolderStructureStore()

const isAddFolderOrFileBtn = ref(false)
const isAddFile = ref(false)
const isAddFolder = ref(false)

const fileName = ref('')
const folderName = ref('')

function addFolders(parentid: number) {
  if (folderName.value.trim() == '') {
    alert('Plaese Enter Folder Name')
  } else {
    // console.log(parentid)
    store.addFolder({
      ParentId: parentid,
      _id: Date.now(),
      type: 'folder',
      value: folderName.value,
      children: [],
    })
  }
  isAddFolder.value = false
  folderName.value = ''
  // console.log('Add folder work at FileTree component')
}

function addFile(parentid: number) {
  // console.log('add file compoenennt ✅')

  if (fileName.value.trim() == '') {
    alert('Plaese Enter File Name')
  } else {
    // console.log(parentid)
    store.addFile({
      ParentId: parentid,
      _id: Date.now(),
      type: 'file',
      value: fileName.value,
    })
  }
  isAddFile.value = false
  fileName.value = ''
}

function cancelAddFile() {
  fileName.value = ''
  isAddFile.value = false
  isAddFolderOrFileBtn.value = false
}

function cancelAddFolder() {
  folderName.value = ''
  isAddFolder.value = false
  isAddFolderOrFileBtn.value = false
}

function deleteFolderBtn(id: number) {
  // console.log('Componenent delete folder is work', id)
  store.deleteFolder(id)
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding-left: 1.5rem;
  position: relative;
  font-size: xx-large;
}

ul::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0.75rem;
  border-left: 2px solid black;
  height: 100%;
}

li {
  position: relative;
  padding-left: 1rem;
  margin: 0;
}

li::before {
  content: '';
  position: absolute;
  top: 1.2rem;
  left: -11px;
  width: 2rem;
  border-top: 2px solid black;
}

li:last-child::after {
  content: '';
  position: absolute;
  top: 1.2rem;
  left: 0.75rem;
  height: calc(100% - 1.2rem);
  border-left: 2px solid transparent;
}

.folder-node,
.file-node {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

  border-radius: 6px;
  transition: background 0.2s ease;
}

.folder-node {
  font-size: 14px;
}

.folder-node:hover,
.file-node:hover {
  background-color: #f0f0f0;
}

.file-node {
  margin-left: 0.5rem;
}

.folder-design {
  background-color: #fdfdfd;
  padding: 8px;
  margin-bottom: 4px;
}

button {
  margin-left: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  padding: 5px 8px;
  font-size: 20px;
  transition:
    background-color 0.2s ease,
    transform 0.1s ease;
}

button:hover {
  transform: scale(1.05);
}

.addFolderBtn {
  background-color: #3cb371;
  color: white;
}

.deleteFolderBtn {
  background-color: #e74c3c;
  color: white;
}

.deleteFileBtn {
  background-color: #f39c12;
  color: white;
}

.selectFile,
.selectFolder {
  background-color: #3498db;
  color: white;
  margin: 4px 6px;
  padding: 5px 10px;
  border-radius: 5px;
}

.selectFolder {
  background-color: #9b59b6;
}

.file-container,
.folder-container {
  background-color: #f9f9f9;
  padding: 8px;
  margin-top: 6px;
  border-radius: 6px;
  border: 1px solid #ddd;
}

input[type='text'] {
  padding: 5px;
  font-size: 13px;
  margin-right: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 150px;
}

.save-btn {
  background-color: #2ecc71;
  color: white;
}

.cancel-btn {
  background-color: #e74c3c;
  color: white;
}

.file-icon,
.folder-icon {
  font-size: 16px;
  margin-right: 6px;
}
</style>
