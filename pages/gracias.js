import Header from "../components/Header.component";
import Footer from "../components/Footer.component";

export default function Gracias({categories}) {
    return (
        <>
            <Head>
                <title>Gracias por tu compra | Hydronaut</title>
            </Head>
            <Header categories={categories}/>
            <h1 className="text-2xl font-bold tracking-tight text-center sm:text-5xl sm:leading-snug leading-tight mt-12 sm:mt-20">
                Gracias por tu compra
            </h1>
            <p className="text-lg sm:text-xl text-center leading-snug sm:leading-snug max-w-2xl mx-auto mt-2">Comenzamos a trabajar en ella ahora mismo. Recibirás la confirmación de tu compra por correo electrónico.</p>
            <Footer />
        </>
    )
}

export async function getServerSideProps() {
    const categories = await fetch('https://hydronaut.mx/api/categories')
    const categoriesJson = await categories.json()
    return {props: {categories: categoriesJson}}
  }