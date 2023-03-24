import Header from "../components/Header.component";
import Footer from "../components/Footer.component";

export default function Contacto({ categories }) {
    return (
        <>
            <Header categories={categories} />
            <div className="pt-24 sm:pt-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl space-y-16 divide-y divide-gray-100 lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-y-10 gap-x-8 lg:grid-cols-3">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">Ponte en contacto</h2>
              <p className="mt-4 leading-7 text-gray-600">
                Para órdenes grandes, quejas o sugerencias.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2 lg:gap-8">
              <div className="rounded-2xl bg-gray-200 p-10">
                <h3 className="text-base font-semibold leading-7 text-gray-900">Correo</h3>
                <dl className="mt-3 space-y-1 text-sm leading-6 text-gray-600">
                  <div>
                    <dt className="sr-only">Correo</dt>
                    <dd>
                      <a className="font-semibold text-zinc-500" href="mailto:hola@hydronaut.mx">
                        hola@hydronaut.mx
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="rounded-2xl bg-gray-200 p-10">
                <h3 className="text-base font-semibold leading-7 text-gray-900">Teléfono</h3>
                <dl className="mt-3 space-y-1 text-sm leading-6 text-gray-600">
                  <div>
                    <dt className="sr-only">Teléfono</dt>
                    <dd>
                      <a className="font-semibold text-zinc-500" href="tel:5567627281">
                      55.67.62.72.81
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
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