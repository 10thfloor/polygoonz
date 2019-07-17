import Link from 'next/link';

const WTF = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <div className="font-display tracking-wide text-4xl">FAQ</div>
            <div className="flex flex-col p-10 md:max-w-2xl">
                <h4 className="text-2xl md:text-3xl font-bold tracked-tight mb-2">WTF is a <span className="font-display tracked-wider text-purple-600">Polygoon</span>?</h4>

                <p className="mb-10 text-xl">Every Polygoon is unique and has never been seen before. If you don't claim it, it's gone forever. Each one you claim becomes a provably rare <a className="underline text-blue-500" href="https://blog.enjincoin.io/erc-1155-the-crypto-item-standard-ac9cf1c5a226">"ERC1155"</a> token embedded forever in the <a href="https://www.rinkeby.io/#stats" className="underline text-blue-400 hover:text-blue-600">Rinkeby</a> blockchain. If you claim one, you'll own an indestructible digital goon.
                </p>
                {/*  */}
                <h4 className="text-2xl md:text-3xl font-bold tracked-tight mb-2">How is a <span className="font-display tracked-wider text-purple-600">Polygoon</span> generated?</h4>

                <p className="mb-20 text-xl">
                    Polygoonz are made by combining (using magic) coordinates
                    from here: <a className="underline text-blue-500" href="https://api.noopschallenge.com/polybot">https://api.noopschallenge.com/polybot</a>&nbsp;
                    with colors from here:<a className="underline text-blue-500" href="https://api.noopschallenge.com/hexbot"> https://api.noopschallenge.com/hexbot</a>&nbsp;
                    and faces from..? <br /><a className="text-green-500" href="https://www.axiomzen.co/about/pablo">pablo@axiomzen.com</a> is their creator.
                </p>
                <div className="flex justify-center">
                    <Link href="/goon">
                        <button className="goon-button">Get One</button>
                    </Link>
                </div>
            </div>
        </div >
    )
}

export default WTF;