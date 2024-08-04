import { defineStore } from 'pinia'
import { version } from '@src/../package.json'

export const useAppStore = defineStore('app', {
  state: () => ({
    description: 'This is a description',
    version: 'v' + version,
    developers: [
      { name: 'Gersom Alaja', role: 'CEO', link: 'google.com' },
      { name: 'David Romero', role: 'FullStack Developer', link: 'google.com' }
    ]
  }),
  getters: {
  },
  actions: {
  }
})