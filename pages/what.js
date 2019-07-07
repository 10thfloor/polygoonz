import Link from 'next/link';

const WTF = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <div className="font-display tracking-wide text-4xl mb-10">FAQ</div>
            <div className="flex flex-col items-center w-2/6">
                <h4 className="text-2xl font-bold tracked-tight mb-2">What is a <span className="font-display tracked-wider">Polygoon</span>?</h4>

                <p className="mb-6">Polygoons are provably rare, indestructible digiital goons. No two are alike. Or, are they?
                When you claim one using an Ethereum account that belongs to you,
                 It becomes yours forever. Unless you give it away.</p>

                <h4 className="text-2xl font-bold tracked-tight mb-2">How is a <span className="font-display tracked-wider">Polygoon</span> generated?</h4>

                <p className="mb-12">
                    Polygoons are made by combining (using magic) coordinates
                    from here: <a className="underline text-blue-500" href="https://api.noopschallenge.com/polybot">https://api.noopschallenge.com/polybot</a>&nbsp;
                    with colors from here:<a className="underline text-blue-500" href="https://api.noopschallenge.com/hexbot"> https://api.noopschallenge.com/hexbot</a>&nbsp;
                    and faces from..? <a className="text-green-500" href="https://www.axiomzen.co/about/pablo">pablo@axiomzen.com</a> is their creator.
                </p>
                <Link href="/goon">
                    <button className="font-display bg-blue-200 tracking-widest text-blue-500 border border-blue-500 font-bold py-2 px-4 border-b-4 border-green-70 hover:border-green-500 hover:bg-green-200 hover:text-green-500 rounded">Get One</button>
                </Link>

            </div>
        </div >
    )
}

export default WTF;