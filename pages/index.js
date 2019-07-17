import Link from 'next/link';

const Landing = () => {
    console.log(process.env.CONTRACT_ADDRESS)
    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <div className="m-10 flex flex-col items-center justify-center">
                <h1 className="block w-auto font-display text-6xl title-rotation text-purple-600">Polygoonz!</h1>
                <p className="block w-auto title-rotation tighter-top relative text-gray-500 mb-10">Episode 1: <a href="https://www.rinkeby.io/">Rinkeby</a></p>
                <Link href={`https://rinkeby.etherscan.io/address/${process.env.CONTRACT_ADDRESS}`}><a className="link">{process.env.CONTRACT_ADDRESS}</a></Link>
            </div>
            <Link href="/goon">
                <button className="goon-button">Get One</button>
            </Link>
            <Link href="/wtf"><a className="link">What is this?</a></Link>
        </div>
    )
}

export default Landing;