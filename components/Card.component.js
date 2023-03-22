export default function Card(props) {
    return (
        <div>
            <a className={`block w-full rounded-3xl hover:opacity-60 h-80 bg-cover`} style={{backgroundImage: `url('/${props.id}_1.jpg')`}} href={`/product/${props.id}`}> </a>
            <h1 className="mt-4 text-xl font-semibold"><a href={`/product/${props.id}`} className="hover:opacity-60">{props.name}</a></h1>
            <h2 className="mt-0 text-md">${props.price}</h2>
        </div>
    )
}