import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useFolderStructureStore = defineStore('foderStructure', () => {
  const folderData = ref([
    {
      _id: '1',
      value: 'src',
      type: 'folder',
      children: [
        {
          _id: '1-1',
          value: 'index.css',
          type: 'file',
          children: [],
        },
        {
          _id: '1-2',
          value: 'assets',
          type: 'folder',
          children: [
            {
              _id: '1-2-1',
              value: 'profile.png',
              type: 'file',
              children: [],
            },
          ],
        },
      ],
    },
    {
      _id: '2',
      value: 'FileItem.vue',
      type: 'file',
      children: [],
    },
    {
      _id: '685bfafb27e1258d2959d62a',
      value: 'public',
      type: 'folder',
      children: [],
    },
  ])

  function addFolderToRoot(payload: any) {
    console.log('🟢🟢🟢Add-Folder-to-root-is worked')
    console.log('🟢Payload', payload)
    folderData.value.push(payload)
  }

  // const doubleCount = computed(() => count.value * 2)
  // function increment() {
  //   count.value++
  // }

  // return { count, doubleCount, increment }

  return { folderData, addFolderToRoot }
})
