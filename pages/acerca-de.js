import Header from '../components/Header.component'
import Footer from '../components/Footer.component'
import { TruckIcon, ShieldCheckIcon, ArrowPathIcon } from '@heroicons/react/20/solid'

const features = [
    {
      name: 'Envío gratis',
      description:
        'a todo el país en órdenes mayores a $500.',
      icon: TruckIcon,
    },
    {
      name: 'Productos garantizados',
      description: 'ante cualquier defecto de fábrica.',
      icon: ShieldCheckIcon,
    },
    {
      name: 'Devoluciones gratuitas',
      description: 'por productos defectuosos.',
      icon: ArrowPathIcon,
    },
  ]

export default function AcercaDe({categories}) {
    return (
        <>
            <Header categories={categories}/>
            <div className="py-24 px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-base font-semibold leading-7 text-zinc-500">acerca de: hydronaut</p>
        <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Especialistas en la venta de grow lights.</h2>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Contamos con más de 10 años de experiencia en el mercado de focos, y ahora incursionamos en el mercado de la venta de focos para cultivo.
        </p>
      </div>
    </div>
    <div className="overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-zinc-500">Nuestra propuesta</h2>
              <p className="mt-2 text-3xl font-bold tracking-normal text-gray-900 sm:text-4xl">Mejores focos, menores precios, envíos a casa.</p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Ofrecemos los mejores focos del mercado, y los hacemos llegar hasta la puerta de tu casa.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon className="absolute top-1 left-1 h-5 w-5 text-zinc-500" aria-hidden="true" />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <img
            src="/acercade.png"
            alt="Product screenshot"
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            width={2432}
            height={1442}
          />
        </div>
      </div>
    </div>
            <Footer />
        </>
    )
}

export async function getServerSideProps() {
    const categories = await fetch('https://hydronaut.mx/api/categories')
    const categoriesJson = await categories.json()
    return {props: {categories: categoriesJson}}
  }