import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { BaseProperty } from '@/types'

export const useFolderStructureStore = defineStore('foderStructure', () => {
  const folderData = ref<BaseProperty[]>([])

  function addFolderToRoot(payload: BaseProperty): void {
    folderData.value.push(payload)
    console.log('add Folder To Root', payload)
  }

  function addFolder(payload: { ParentId: number } & BaseProperty) {
    function insertIntoTree(tree: BaseProperty[], ParentId: number) {
      for (let node of tree) {
        if (node._id == ParentId) {
          node.children.push(payload)
          return true
        }

        if (node.children?.length > 0) {
          const inserted = insertIntoTree(node.children, payload.ParentId)
          if (inserted) return true
        }
      }
      return false
    }

    const success = insertIntoTree(folderData.value, payload.ParentId)

    if (!success) {
      console.log('🔴🔴🔴Error')
    }
  }

  function addFile(payload: { ParentId: number } & BaseProperty) {
    function insertFileIntoTree(tree: BaseProperty[], ParentId: number): boolean {
      for (let node of tree) {
        if (node._id == ParentId) {
          if (!node.children) node.children = []
          node.children.push(payload)
          return true
        }
        if (node.children?.length > 0) {
          const inserted = insertFileIntoTree(node.children, ParentId)
          if (inserted) return true
        }
      }
      return false
    }

    const success = insertFileIntoTree(folderData.value, payload.ParentId)
    if (!success) {
      console.log('❌')
    }
  }

  function deleteFolder(payload: number): void {
    function removechild(tree: BaseProperty[], payload: number): boolean {
      for (let node of tree) {
        if (node._id == payload) {
          const findIndex = tree.findIndex((obj) => obj._id == payload)
          tree.splice(findIndex, 1)
          return true
        }
        if (node.children?.length > 0) {
          const deleteChildNode = removechild(node.children, payload)
          if (deleteChildNode) return true
        }
      }
      return false
    }

    const success = removechild(folderData.value, payload)

    if (!success) {
      console.log(' ☠️☠️☠️ we are getting problem to delete data  ☠️☠️☠️')
    }
  }

  return { folderData, addFolderToRoot, addFolder, addFile, deleteFolder }
})
