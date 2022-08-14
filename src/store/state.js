import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: {
        name: 'roberto',
        email: 'roberto24r@gmail.com'
      }
    }
  },
  actions: {
    setUser() {
    },
  },
})