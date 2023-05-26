export default function Card(props) {
    return (
        <div>
            <a className={`block w-full rounded-3xl hover:opacity-60 bg-cover overflow-hidden`} href={`/product/${props.id}`}><div className="w-full h-96 bg-center bg-contain bg-no-repeat bg-white"style={{backgroundImage: `url('/${props.id}_1.jpg')`}}/></a>
            <h1 className="mt-4 text-xl font-semibold"><a href={`/product/${props.id}`} className="hover:opacity-60">{props.name}</a></h1>
            <h2 className="mt-0 text-md">${props.price}</h2>
        </div>
    )
}