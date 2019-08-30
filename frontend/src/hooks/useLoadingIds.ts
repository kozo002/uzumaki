import * as React from 'react'
import uniq from 'lodash/uniq'

interface ResultValueI {
  loadingStoryIds: number[]
  addLoading: (id: number) => void
  removeLoading: (id: number) => void
  checkLoading: (id: number) => boolean
}

export default function useLoadingIds (initialState: number[] = []): ResultValueI {
  const [loadingStoryIds, setStoryIds] = React.useState<number[]>(initialState)

  const addLoading = (id: number) => {
    setStoryIds(uniq([...loadingStoryIds, id]))
  }

  const removeLoading = (id: number) => {
    setStoryIds(loadingStoryIds.filter(it => it !== id))
  }

  const checkLoading = (id: number): boolean => {
    return loadingStoryIds.indexOf(id) > -1
  }

  return { loadingStoryIds, addLoading, removeLoading, checkLoading }
}