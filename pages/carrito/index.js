import React, { useState, useEffect } from 'react'
import Header from '../../components/Header.component'
import Footer from '../../components/Footer.component'
import { CheckIcon, QuestionMarkCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'
import Head from 'next/head'
import Cookies from 'cookies'

export default function Carrito({categories, productsFetched}) {
    const [cart, setCart] = useState([]);
    const [productList, setProductList] = useState([]);
    const [total, setTotal] = useState(0);
    const [shipping, setShipping] = useState(0);
    const [mamaste, setMamaste] = useState(false);

    useEffect(() => {
        let parsedCart = null
        localStorage.cart ? parsedCart = JSON.parse(localStorage.cart) : "";
        if(true && parsedCart) {
          console.log(productsFetched)
          for (let i = 0; i < productsFetched.length; i++) {
            let product = productsFetched[i][0]
            parsedCart[i].inventory = product.inventory
          }
        }
        localStorage.cart ? setCart(parsedCart) : "";

        if (parsedCart) {
            let total = 0
            for (let i = 0; i < parsedCart.length; i++) {
              let product = parsedCart[i]
              total = total + (product.price * product.quantity)
              setTotal(total)
              setShipping(total>500 ? 0 : 100 )
              if(product.inventory<product.quantity) {
                setMamaste(true)
              }
            }
        } else {
            setTotal(0)
            setShipping(0)
        }
    }, [])

    const handleQuantityChange = (newAmount, productIdx) => {
        const newCart = [...cart];
        newCart[productIdx].quantity = eval(newAmount);
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
        let total = 0
        let enoughInventory = []
        for (let i = 0; i < newCart.length; i++) {
          total = total + (newCart[i].price * newCart[i].quantity)
          setTotal(total)
          setShipping(total>500 ? 0 : 100 )
          if(newCart[i].inventory<newCart[i].quantity) {
            enoughInventory.push(false)
          } else {
            enoughInventory.push(true)
          }
        }
        if(enoughInventory.includes(false)) {
          setMamaste(true)
        } else {
          setMamaste(false)
        }
    }

    const handleRemove = (productIdx) => {
        const newCart = [...cart];
        newCart.splice(productIdx, 1);
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
        setTotal(0)
        setShipping(0)
        let total = 0
        let enoughInventory = []
        for (let i = 0; i < newCart.length; i++) {
          total = total + (newCart[i].price * newCart[i].quantity)
          setTotal(total)
          setShipping(total>500 ? 0 : 100 )
          if(newCart[i].inventory<newCart[i].quantity) {
            enoughInventory.push(false)
          } else {
            enoughInventory.push(true)
          }
        }
        if(enoughInventory.includes(false)) {
          setMamaste(true)
        } else {
          setMamaste(false)
        }
    }

    return (
        <>
        <Head>
            <title>Carrito de compras | Hydronaut</title>
            <meta name="description" content="Carrito de compras de Hydronaut." />
        </Head>
        <Header categories={categories} />
        <div className="bg-ow">
      <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Carrito de compras</h1>
        <form method="post" action="/api/pay" className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <input type="hidden" value={cart.length} name="length" />
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            <ul role="list" className="divide-y divide-gray-200 border-t border-b border-gray-200">
              {cart[0] ? cart.map((product, productIdx) => (
                <>
                <input type="hidden" value={product.id} name={`id${productIdx}`} />
                <li key={product.id} className="flex py-6 sm:py-10">
                  <div className="flex-shrink-0">
                    <img
                      src={`/${product.id}_1.jpg`}
                      alt="Foto del producto"
                      className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-sm">
                            <a href={`/product/${product.id}`} className="font-medium text-gray-700 hover:text-gray-800">
                              {product.name}
                            </a>
                          </h3>
                        </div>
                        <p className="mt-1 text-sm font-light text-gray-900">${product.price}</p>
                      </div>

                      <div className="mt-4 sm:mt-0 sm:pr-9">
                        <label htmlFor={`quantity${productIdx}`} className="sr-only">
                          Quantity, {product.name}
                        </label>
                        <select
                          id={`quantity${productIdx}`}
                          name={`quantity${productIdx}`}
                          className="w-[80px] max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-myblack focus:outline-none focus:ring-1 focus:ring-myblack sm:text-sm"
                        defaultValue={localStorage.cart ? JSON.parse(localStorage.cart)[productIdx].quantity : null}
                            onChange={(e) => handleQuantityChange(e.target.value, productIdx)}
                        >
                          {Array.from(Array(10).keys()).map((x) => (
                                <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                </option>
                           ))}
                        </select>

                        <div className="absolute top-0 right-0">
                          <button type="button" className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500" onClick={(e)=>{e.preventDefault(); handleRemove(productIdx)}}>
                            <span className="sr-only">Remove</span>
                            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                      {product.inventory >= product.quantity ? (
                        <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                      ) : (
                        <XMarkIcon className="h-5 w-5 flex-shrink-0 text-red-500" aria-hidden="true" />
                      )}

                      <span>{product.inventory >= product.quantity ? 'En stock' : `No hay suficientes unidades`}</span>
                    </p>
                  </div>
                </li>
              </>
              )) : <p className="text-center text-xl font-semibold my-12">No hay productos en el carrito</p>}
            </ul>
          </section>

          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-white shadow-xl px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
          >
            <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
              Resumen del pedido
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Subtotal</dt>
                <dd className="text-sm font-medium text-gray-900">${total}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex items-center text-sm text-gray-600">
                  <span>Envío</span>
                  <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                  </a>
                </dt>
                <dd className="text-sm font-medium text-gray-900">Gratis</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">Total a pagar</dt>
                <dd className="text-base font-medium text-gray-900">${total}</dd>
              </div>
            </dl>

            <div className="mt-6">
              {mamaste ?
              <button
                disabled
                className="cursor-pointer w-full rounded-md border border-transparent bg-zinc-500 py-3 px-4 text-base font-medium text-white shadow-sm hover:opacity-60 focus:outline-none focus:ring-2 focus:ring-myblack focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                No tenemos suficientes unidades, intenta con menos productos
              </button>
              : cart.length===0 ?
              <button
              disabled
              className="cursor-pointer w-full rounded-md border border-transparent bg-zinc-500 py-3 px-4 text-base font-medium text-white shadow-sm hover:opacity-60 focus:outline-none focus:ring-2 focus:ring-myblack focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                No hay productos en el carrito
              </button>
              :
              <button
                type="submit"
                className="w-full rounded-md border border-transparent bg-myblack py-3 px-4 text-base font-medium text-white shadow-sm hover:opacity-60 focus:outline-none focus:ring-2 focus:ring-myblack focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Continuar
              </button>
              }
            </div>
          </section>
        </form>
      </div>
    </div>
        <Footer />
        </>
    )
}

export async function getServerSideProps({req,res}) {
    const categories = await fetch("https://hydronaut.mx/api/categories");
    const categoriesJson = await categories.json();
    const cookies = new Cookies(req,res);
    let cart = eval(cookies.get("cart"))
    console.log(cart)
    const length = cart ? cart.length : 0;
    console.log(length)
    let productsFetched = [];
    for (let i = 0; i < length; i++) {
      const product = await fetch(`https://hydronaut.mx/api/product/${cart[i].id}`);
      const productJson = await product.json();
      productsFetched.push(productJson);
    }
    console.log(productsFetched)
    return { props: { categories: categoriesJson, productsFetched: productsFetched } };
  }