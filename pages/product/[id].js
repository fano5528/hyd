import Header from "../../components/Header.component";
import Card from "../../components/Card.component";
import Footer from "../../components/Footer.component";
import { useContext, useEffect, useState } from "react";
import { Disclosure, RadioGroup, Tab } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/20/solid";
import { HeartIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { CartContext } from "../../context/cartContext";
import Head from "next/head";
import { cookies } from "next/headers"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Products({ categories, productinfo }) {
    const { state, dispatch } = useContext(CartContext);
    const [ canAdd, setCanAdd ] = useState(true);

    useEffect(() => {
        if(localStorage.cart) {
          let cart = JSON.parse(localStorage.cart);
          if(cart.find((product) => product.id === productinfo[0].id)) {
            let product = cart.find((product) => product.id === productinfo[0].id)
            if(product.quantity > 9) {
              setCanAdd(false);
            }
          }
        }
    }, [])

    useEffect(() => {
        console.log(canAdd)
    }, [canAdd])


    let product = {
        name: productinfo[0].name,
        id: productinfo[0].id,
        price: `$${productinfo[0].price.toString()}`,
        description: productinfo[0].description,
        inventory: productinfo[0].inventory,
        details: [
            {
                name: "Ficha técnica",
                items: [
                    "Wattage: "+productinfo[0].watts.toString()+"W",
                ]
            }
        ],
        images: [
            {
              id: 1,
              name: productinfo[0].name  + ", imagen 1",
              src: "/"+productinfo[0].id+"_1.jpg",
            },
            // More images...
          ],
    }
    for (let i = 2; i <= productinfo[0].imgs; i++) {
        product.images.push({
            id: i,
            name: productinfo[0].name + ", imagen " + i.toString(),
            src: "/"+productinfo[0].id+"_"+i.toString()+".jpg",
        })
    }
    
    const addToCartHandler = () => {
        dispatch({type: "add_to_cart", payload: { id: product.id, name: product.name, price: product.price, inventory: product.inventory } });
        //set cookie with cart
        window.location = "/carrito";
    }

  return (
    <>
      <Head>
        <title>{product.name} | Hydronaut</title>
        <meta name="description" content={product.description} />
      </Head>
      <Header categories={categories} />
      <div className="bg-ow">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-[1.3fr_1fr] lg:items-start lg:gap-x-12">
            {/* Image gallery */}
            <Tab.Group as="div" className="flex flex-col-reverse">
              {/* Image selector */}
              <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                <Tab.List className="grid grid-cols-4 gap-6">
                  {product.images.map((image) => (
                    <Tab
                      key={image.id}
                      className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-ow text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                    >
                      {({ selected }) => (
                        <>
                          <span className="sr-only"> {image.name} </span>
                          <span className="absolute inset-0 overflow-hidden rounded-md">
                            <img
                              src={image.src}
                              alt=""
                              className="h-full w-full object-cover object-center"
                            />
                          </span>
                          <span
                            className={classNames(
                              selected ? "ring-myblack" : "ring-transparent",
                              "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2"
                            )}
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </Tab>
                  ))}
                </Tab.List>
              </div>

              <Tab.Panels className="aspect-w-1 aspect-h-1 w-full">
                {product.images.map((image) => (
                  <Tab.Panel key={image.id}>
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-full w-full object-cover object-center sm:rounded-lg"
                    />
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>

            {/* Product info */}
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {product.name}
              </h1>

              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl tracking-tight text-gray-900">
                  {product.price}
                </p>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Description</h3>

                <div
                  className="space-y-6 text-base text-gray-700"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>

              <form className="mt-6">
                {/* Colors */}

                <div className="sm:flex-col1 mt-10 flex">
                  {canAdd ? 
                  <button
                    type="submit"
                    onClick={(e)=>{e.preventDefault(); addToCartHandler()}}
                    className="flex flex-1 items-center justify-center rounded-md border border-transparent bg-myblack py-3 px-8 text-base font-medium text-white hover:opacity-60 focus:outline-none focus:ring-2 focus:ring-myblack focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                  >
                    agregar al carrito
                  </button>
                  :
                  <button
                    disabled
                    className="cursor-pointer flex flex-1 items-center justify-center rounded-md border border-transparent bg-zinc-500 py-3 px-8 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-myblack sm:w-full"
                  >Has agregado la máxima cantidad posible</button>
                  }
                </div>
              </form>

              <section aria-labelledby="details-heading" className="mt-12">
                <h2 id="details-heading" className="sr-only">
                  Additional details
                </h2>

                <div className="divide-y divide-gray-200 border-t">
                  {product.details.map((detail) => (
                    <Disclosure as="div" key={detail.name}>
                      {({ open }) => (
                        <>
                          <h3>
                            <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                              <span
                                className={classNames(
                                  open ? "text-myblack" : "text-gray-900",
                                  "text-sm font-medium"
                                )}
                              >
                                {detail.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="block h-6 w-6 text-myblack group-hover:text-myblack"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel
                            as="div"
                            className="prose prose-sm pb-6"
                          >
                            <ul role="list">
                              {detail.items.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export async function getServerSideProps({ params }) {
  const categories = await fetch("https://hydronaut.mx/api/categories");
  const categoriesJson = await categories.json();
  const product = await fetch("https://hydronaut.mx/api/product/" + params.id);
  const productJson = await product.json();
  return { props: { categories: categoriesJson, productinfo: productJson } };
}
