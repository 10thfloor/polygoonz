import Link from 'next/link';

const Landing = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <div className="m-10 flex flex-col items-center justify-center">
                <h1 className="block w-auto font-display text-6xl title-rotation">Polygoons!</h1>
                <p className="block w-auto title-rotation tighter-top relative text-gray-500">Digitally Unique Forever</p>
                <Link href="https://rinkeby.etherscan.io/address/0x87a07d2c2bdfb082e1811f1945217962d078e494"><a className="block p-2 underline text-green-400 hover:text-green-600">0x87a07d2c2bdfb082e1811f1945217962d078e494</a></Link>
            </div>
            <Link href="/goon">
                <button className="font-display bg-blue-200 tracking-widest text-blue-500 border border-blue-500 font-bold py-2 px-4 border-b-4 border-green-70 hover:border-green-500 hover:bg-green-200 hover:text-green-500 rounded">Get One</button>
            </Link>
            <Link href="/what"><a className="block p-2 underline text-green-400 hover:text-green-600">What is this?</a></Link>
        </div>
    )
}

export default Landing;