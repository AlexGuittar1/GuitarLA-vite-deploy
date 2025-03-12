import { useMemo } from "react"
import { db } from "../Data/db"
import { useState, useEffect } from "react"

export const useCart = () => {

    const initialCart = () => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
      }
    
      const [data] = useState(db)
      const [cart, setCart] = useState(initialCart)
    
      const MAX_ITEM = 5
      const MIN_ITEM = 1
    
      useEffect(()=> {
        localStorage.setItem('cart', JSON.stringify(cart))
      }, [cart])
    
      function addToCart(item) {
        const itemExist = cart.findIndex (guitar => guitar.id === item.id)
        if(itemExist >= 0 ){
          if (cart[itemExist].quantity >= MAX_ITEM) return
          const updatedCart = [...cart]
          updatedCart[itemExist].quantity++
          setCart(updatedCart)
        }
        else{
        item.quantity = 1
        setCart ([...cart, item])
        }
      }
    
      function removeFromCart (id) {
        setCart (prevCart => prevCart.filter(guitar => guitar.id !== id))
      }
    
      function increaseQuantity (id) {
        const updatedCart = cart.map (item => {
          if(item.id === id && item.quantity < MAX_ITEM ){
            return{
              ...item,
              quantity: item.quantity + 1
            }
          }
          return item
        })
        setCart(updatedCart)
      }
    
      function decreaseQuantuty (id){
        const updatedCart = cart.map (item => {
          if(item.id === id && item.quantity > MIN_ITEM ){
            return{
              ...item,
              quantity: item.quantity - 1
            }
          }
          return item
        })
        setCart(updatedCart)
      }
    
      function clearCart () {
        setCart([])
      }

       //state dervado
    const isEmpty = useMemo( () => cart.length === 0, [cart])
    const cartTotal = useMemo( () => cart.reduce((total, item )=> total + (item.quantity * item.price), 0), [cart])


    return{
        cart,
        addToCart,
        data,
        removeFromCart,
        increaseQuantity,
        decreaseQuantuty,
        clearCart,
        isEmpty,
        cartTotal
    }

}