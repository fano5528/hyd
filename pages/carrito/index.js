import React, { useState, useEffect } from 'react'
import Header from '../../components/Header.component'
import Footer from '../../components/Footer.component'
import { CheckIcon, ClockIcon, QuestionMarkCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'

export default function Carrito({categories}) {
    const [cart, setCart] = useState(null);
    const [productList, setProductList] = useState([]);
    const [total, setTotal] = useState(0);
    const [shipping, setShipping] = useState(0);

    useEffect(() => {
        let products = JSON.parse(localStorage.cart)
        setCart(JSON.parse(localStorage.cart))
        let total = 0
        for (let i = 0; i < products.length; i++) {
            fetch(`http://localhost:3000/api/product/${products[i].id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setProductList(prev => [...prev, data[0]])
                console.log(data[0].price * products[i].quantity)
                total = total + (data[0].price * products[i].quantity)
                setTotal(total)
                setShipping(total>500 ? 0 : 100 )
            })
        }
    }, [])

    const handleQuantityChange = (newAmount, productIdx) => {
        const newCart = [...cart];
        newCart[productIdx].quantity = newAmount;
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    }

    const handleRemove = (productIdx) => {
        const newCart = [...cart];
        newCart.splice(productIdx, 1);
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    }

    return (
        <>
        <Header categories={categories} />
        <div className="bg-ow">
      <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Carrito de compras</h1>
        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            <ul role="list" className="divide-y divide-gray-200 border-t border-b border-gray-200">
              {productList.map((product, productIdx) => (
                <li key={product.id} className="flex py-6 sm:py-10">
                  <div className="flex-shrink-0">
                    <img
                      src={`/${product.id}_1.jpg`}
                      alt={product.imageAlt}
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
                        <label htmlFor={`quantity-${productIdx}`} className="sr-only">
                          Quantity, {product.name}
                        </label>
                        <select
                          id={`quantity-${productIdx}`}
                          name={`quantity-${productIdx}`}
                          className="px-3 max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-myblack focus:outline-none focus:ring-1 focus:ring-myblack sm:text-sm"
                        defaultValue={cart[productIdx].quantity}
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
                      {product.inStock ? (
                        <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                      ) : (
                        <ClockIcon className="h-5 w-5 flex-shrink-0 text-gray-300" aria-hidden="true" />
                      )}

                      <span>{product.inStock ? 'En stock' : `No hay suficientes unidades`}</span>
                    </p>
                  </div>
                </li>
              ))}
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
                <dd className="text-sm font-medium text-gray-900">${shipping}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">Total a pagar</dt>
                <dd className="text-base font-medium text-gray-900">${total + shipping}</dd>
              </div>
            </dl>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full rounded-md border border-transparent bg-myblack py-3 px-4 text-base font-medium text-white shadow-sm hover:opacity-60 focus:outline-none focus:ring-2 focus:ring-myblack focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Continuar
              </button>
            </div>
          </section>
        </form>
      </div>
    </div>
        <Footer />
        </>
    )
}

export async function getServerSideProps() {
    const categories = await fetch("http://localhost:3000/api/categories");
    const categoriesJson = await categories.json();
    return { props: { categories: categoriesJson } };
  }