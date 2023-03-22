import Header from "../../components/Header.component";
import Card from "../../components/Card.component";
import Footer from "../../components/Footer.component";
import Head from "next/head";

export default function Products({ categories, products, category }) {
    console.log(products)
  return (
    <>
      <Head>
        <title>{category[0].name} | Hydronaut</title>
        <meta name="description" content={category[0].description} />
      </Head>
      <Header categories={categories} />
      <div className="bg-myblack mt-12 sm:mt-20 py-24 sm:py-40 w-sgrid sm:w-grid mx-auto rounded-3xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl sm:leading-snug leading-tight">
            {category[0].name}
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            {category[0].description}
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

export async function getServerSideProps({params}) {
  const categories = await fetch("https://hydronaut.mx/api/categories");
  const categoriesJson = await categories.json();
  const products = await fetch("https://hydronaut.mx/api/products/"+params.category);
  const productsJson = await products.json();
  const category = await fetch("https://hydronaut.mx/api/category/"+params.category);
  const categoryJson = await category.json();
  return { props: { categories: categoriesJson, products: productsJson, category: categoryJson } };
}