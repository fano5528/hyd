import { createContext, useReducer } from "react";

export const CartContext = createContext();

const initialState = {
    cart: {cartItems: []},
}

const reducer = (state, action) => {
    switch (action.type) {
        case "add_to_cart": {
            const localCart = eval(localStorage.cart);
            console.log(localCart)
            const newItem = action.payload;
            const existItem = localCart.find((item) => item.id === newItem.id);
            if (existItem) {
                const cartItems = localCart.map((item) => 
                    item.id === existItem.id ? {id: item.id, quantity: item.quantity + 1} : item
                );
                localStorage.setItem("cart", JSON.stringify(cartItems));
                console.log(localStorage.cart)
                return {...state, cart: {cartItems}}
            } else {
                const cartItems = [...localCart, {id: newItem.id, quantity: 1}];
                localStorage.setItem("cart", JSON.stringify(cartItems));
                console.log(localStorage.cart)
                return {...state, cart: {cartItems}}
            }
        }
        default:
            return state;
    }
}

export function StoreProvider({children}) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = {state, dispatch};

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
} 