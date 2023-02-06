export const useStore = defineStore('main', {
  state: () => ({
    count: 0
  }),
  getters: {
    getCount: (state) => `mainStore的count 是${state.count}`
  },
  actions: {
    addCount() {
      this.count++
    }
  }
})
