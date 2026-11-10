import { create } from 'zustand'

const STORAGE_KEY = 'shop-cart'

function isValidItem(item) {
  return (
    item &&
    typeof item.id === 'number' &&
    typeof item.title === 'string' &&
    typeof item.price === 'number' &&
    Number.isInteger(item.quantity) &&
    item.quantity >= 1
  )
}

function loadItems() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter(isValidItem) : []
  } catch {
    return []
  }
}

export const useCartStore = create((set) => ({
  items: loadItems(),

  addItem: (product) =>
    set((state) => {
      const exists = state.items.some((item) => item.id === product.id)
      if (exists) {
        return {
          items: state.items.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        }
      }
      return {
        items: [
          ...state.items,
          { id: product.id, title: product.title, price: product.price, quantity: 1 },
        ],
      }
    }),

  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((item) => item.id !== id) })),

  setQuantity: (id, quantity) =>
    set((state) => ({
      items:
        quantity < 1
          ? state.items.filter((item) => item.id !== id)
          : state.items.map((item) => (item.id === id ? { ...item, quantity } : item)),
    })),

  clear: () => set({ items: [] }),
}))

// Persistence lives outside React: runs on every change, no component effect involved.
useCartStore.subscribe((state, prevState) => {
  if (state.items === prevState.items) return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items))
  } catch {
    // ignore storage errors
  }
})
