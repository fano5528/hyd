import { createContext, useReducer } from "react";

export const CartContext = createContext();

const initialState = {
    cart: {cartItems: []},
}

const reducer = (state, action) => {
    switch (action.type) {
        case "add_to_cart": {
            const localCart = eval(localStorage.cart) || []; 
            const newItem = action.payload;
            const existItem = localCart.find((item) => item.id === newItem.id);
            if (existItem) {
                const cartItems = localCart.map((item) => 
                    item.id === existItem.id ? {id: item.id, name: item.name, price: item.price, quantity: item.quantity + 1, inventory: item.inventory} : item
                );
                localStorage.setItem("cart", JSON.stringify(cartItems));
                document.cookie = "cart=" + JSON.stringify(cartItems) + ";path=/carrito"
                return {...state, cart: {cartItems}}
            } else {
                const cartItems = [...localCart, {id: newItem.id, name: newItem.name, price: eval(newItem.price.slice(1)), quantity: 1, inventory: newItem.inventory}];
                localStorage.setItem("cart", JSON.stringify(cartItems));
                document.cookie = "cart=" + JSON.stringify(cartItems) + ";path=/carrito"
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