import { Game } from '@/models/game';
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface CartState {
    showCart: boolean,
    cartItems: Game[]
}

const cartFromLocalStorage = typeof localStorage !== "undefined" && localStorage.getItem("cart") ?
    JSON.parse(localStorage.getItem("cart")!) : [];

const initialState: CartState = {
    showCart: true,
    cartItems: cartFromLocalStorage
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        toggleCart(state) {
            state.showCart = !state.showCart;
        },
        addItemToCart: (state, action: PayloadAction<Game>) => {
            const newItem = action.payload;
            const existingItem = state.cartItems.find(
                item => item._id === newItem._id
            );
            if (existingItem) {
                existingItem.quantity = newItem.quantity;
            }
            else {
                state.cartItems.push(newItem);
            }
            localStorage.setItem("cart", JSON.stringify(state.cartItems));
        },
        removeItemFromCart: (state, action: PayloadAction<{ id: string }>) => {
            const itemIdToRemove = action.payload.id;
            const updatedStateItems = state.cartItems.filter(
                item => item._id !== itemIdToRemove
            );
            state.cartItems.splice(0, state.cartItems.length, ...updatedStateItems);
            localStorage.setItem("cart", JSON.stringify(state.cartItems));
        }
    }
})

export const { toggleCart, addItemToCart, removeItemFromCart } = cartSlice.actions;

export default cartSlice.reducer;