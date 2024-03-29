import Link from 'next/link'

export default function Categories() {
    return (
        <footer className="mt-20 bg-myblack pt-12 pb-4 px-10 md:mt-32 sm:px-24">
            <div className="flex flex-col items-start sm:flex-row sm:justify-between">
                <img src="/whitelogo.png" className="h-8 w-auto"/>
                <ul className="mt-10 sm:mt-0">
                    <li className="sm:text-right"><Link href="/tienda" className="text-ow text-xl hover:underline">tienda</Link></li>
                    <li className="sm:text-right"><Link href="/acerca-de" className="text-ow text-xl hover:underline">acerca de</Link></li>
                    <li className="sm:text-right"><Link href="/contacto" className="text-ow text-xl hover:underline">contacto</Link></li>
                </ul>
            </div>
            <div className="w-full h-px bg-[#999999] mt-12"></div>
            <h3 className="text-ow mt-3 text-center">página hecha por <a href="https://internaut.mx" className="underline">internaut</a></h3>
        </footer>
    )
}