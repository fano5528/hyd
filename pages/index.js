import Header from '../components/Header.component'
import { ArrowPathIcon, CalendarIcon, TruckIcon } from '@heroicons/react/24/outline'
import Footer from '../components/Footer.component'
import Card from '../components/Card.component'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import Head from 'next/head'

const perks = [
  { name: '1 año de garantía', description: 'Si no funciona, lo cambiamos.', icon: CalendarIcon },
  { name: 'Devoluciones gratuitas', description: 'Envíos de vuelta gratis.', icon: ArrowPathIcon },
  { name: 'Envío por nuestra cuenta', description: 'En órdenes mayores a $500.', icon: TruckIcon },
]

export default function Home({categories}) {
  return (
    <>
      <Head>
        <title>Hydronaut | Home</title>
        <meta name="description" content="Hydronaut es la primer tienda en México dedicada a la venta de focos para cultivos en interiores." />
      </Head>
    <Header categories={categories}/>
    <div className="bg-mygray w-sgrid sm:w-grid h-[425px] mx-auto rounded-3xl mt-12 sm:mt-16"></div>
    <div className="w-sgrid sm:w-grid mx-auto">
      <div className="mx-auto max-w-7xl mt-12 sm:mt-20">
        <div className="sm:flex sm:items-baseline sm:justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Shop by Category</h2>
          <Link href="/products" className="hidden text-sm font-semibold text-myblack hover:opacity-50 sm:block">
            ver todos los focos
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
          <div className="group aspect-w-2 aspect-h-1 overflow-hidden rounded-3xl sm:aspect-h-1 sm:aspect-w-1 sm:row-span-2">
            <img
              src="https://tailwindui.com/img/ecommerce-images/home-page-03-featured-category.jpg"
              alt="Two models wearing women's black cotton crewneck tee and off-white cotton crewneck tee."
              className="object-cover object-center group-hover:opacity-75"
            />
            <div aria-hidden="true" className="bg-gradient-to-b from-transparent to-black opacity-50" />
            <div className="flex items-end p-6">
              <div>
                <h3 className="font-semibold text-xl text-white">
                  <Link href="#">
                    <span className="absolute inset-0" />
                    New Arrivals
                  </Link>
                </h3>
                <p aria-hidden="true" className="mt-1 text-sm text-white">
                  Shop now
                </p>
              </div>
            </div>
          </div>
          <div className="group aspect-w-2 aspect-h-1 overflow-hidden rounded-3xl sm:aspect-none sm:relative sm:h-full">
            <img
              src="https://tailwindui.com/img/ecommerce-images/home-page-03-category-01.jpg"
              alt="Wooden shelf with gray and olive drab green baseball caps, next to wooden clothes hanger with sweaters."
              className="object-cover object-center group-hover:opacity-75 sm:absolute sm:inset-0 sm:h-full sm:w-full"
            />
            <div
              aria-hidden="true"
              className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
            />
            <div className="flex items-end p-6 sm:absolute sm:inset-0">
              <div>
                <h3 className="font-semibold text-white text-xl">
                  <Link href="#">
                    <span className="absolute inset-0" />
                    Accessories
                  </Link>
                </h3>
                <p aria-hidden="true" className="mt-1 text-sm text-white">
                  Shop now
                </p>
              </div>
            </div>
          </div>
          <div className="group aspect-w-2 aspect-h-1 overflow-hidden rounded-3xl sm:aspect-none sm:relative sm:h-full">
            <img
              src="https://tailwindui.com/img/ecommerce-images/home-page-03-category-02.jpg"
              alt="Walnut desk organizer set with white modular trays, next to porcelain mug on wooden desk."
              className="object-cover object-center group-hover:opacity-75 sm:absolute sm:inset-0 sm:h-full sm:w-full"
            />
            <div
              aria-hidden="true"
              className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
            />
            <div className="flex items-end p-6 sm:absolute sm:inset-0">
              <div>
                <h3 className="font-semibold text-white text-xl">
                  <Link href="#">
                    <span className="absolute inset-0" />
                    Workspace
                  </Link>
                </h3>
                <p aria-hidden="true" className="mt-1 text-sm text-white">
                  Shop now
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 sm:hidden">
          <Link href="/products" className="block text-sm font-semibold text-myblack hover:opacity-50">
            ver todos los focos
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>
      </div>
    </div>
    <div className="w-sgrid sm:w-grid mx-auto mt-12 sm:mt-20">
      <h2 className="sr-only">Our perks</h2>
      <div className="mx-auto max-w-7xl divide-y divide-gray-200 lg:flex lg:justify-center lg:divide-y-0 lg:divide-x">
        {perks.map((perk, perkIdx) => (
          <div key={perkIdx} className="py-8 lg:w-1/3 lg:flex-none lg:py-0">
            <div className="mx-auto flex max-w-xs items-center px-4 lg:max-w-none lg:px-8">
              <perk.icon className="h-8 w-8 flex-shrink-0 text-myblack" aria-hidden="true" />
              <div className="ml-4 flex flex-auto flex-col-reverse">
              <p className="text-sm text-gray-500">{perk.description}</p>
                <h3 className="font-medium text-gray-900">{perk.name}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <h1 className="mt-12 sm:mt-20 text-center text-2xl font-semibold">Nuestros focos más vendidos</h1>
    <div className="w-sgrid sm:w-grid mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 mt-4 sm:mt-6">
      <Card img="/foco.jpg" name="Foco más vendido 1" price="499" id="foco-perron"/>
      <Card img="/foco.jpg" name="Foco más vendido 1" price="499" id="test"/>
      <Card img="/foco.jpg" name="Foco más vendido 1" price="499" id="foco-perron"/>
    </div>
    <Link href="/products" className="flex items-center justify-center bg-myblack text-ow mx-auto block w-64 py-4 text-lg text-center rounded-xl mt-6 sm:mt-10 hover:opacity-60">
      ver todos los focos
      <ArrowRightIcon className="h-6 ml-2"/>
    </Link>
    <Footer />
    </>
  )
}

export async function getServerSideProps() {
  const categories = await fetch('https://hydronaut.mx/api/categories')
  const categoriesJson = await categories.json()
  return {props: {categories: categoriesJson}}
}