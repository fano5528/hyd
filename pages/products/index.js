import Header from "../../components/Header.component";
import Card from "../../components/Card.component";
import Footer from "../../components/Footer.component";

export default function Products({ categories, products }) {
    console.log(products)
  return (
    <>
      <Header categories={categories} />
      <div className="bg-myblack mt-12 sm:mt-20 py-24 sm:py-40 w-sgrid sm:w-grid mx-auto rounded-3xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Todos los focos
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Aquí encontrarás todos los focos que tenemos en stock.
          </p>
        </div>
      </div>
      <div className="w-sgrid sm:w-grid mx-auto mt-12 sm:mt-20 grid grid-cols-3 gap-10">
        {products.map((product, productIdx) => (
            <Card
                key={productIdx}
                img="/foco.jpg"
                name={product.name}
                price={product.price}
                id={product.id}
            />
        ))}
      </div>
        <Footer />
    </>
  );
}

export async function getServerSideProps() {
  const categories = await fetch("https://hydronaut.mx/api/categories");
  const categoriesJson = await categories.json();
  const products = await fetch("https://hydronaut.mx/api/products");
  const productsJson = await products.json();
  return { props: { categories: categoriesJson, products: productsJson } };
}
