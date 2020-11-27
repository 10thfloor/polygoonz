import Link from "next/link";

const WTF = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-4xl tracking-wide font-display">FAQ</div>
      <div className="flex flex-col p-10 md:max-w-2xl">
        <h4 className="mb-2 text-2xl font-bold md:text-3xl tracked-tight">
          WTF is a{" "}
          <span className="text-purple-600 font-display tracked-wider">
            Polygoon
          </span>
          ?
        </h4>

        <p className="mb-10 text-xl">
          Every Polygoon is unique and has never been seen before. If you don't
          claim it, it's gone forever. Each one you claim becomes a provably
          rare{" "}
          <a
            className="text-blue-500 underline"
            href="https://blog.enjincoin.io/erc-1155-the-crypto-item-standard-ac9cf1c5a226"
          >
            "ERC1155"
          </a>{" "}
          token embedded forever in the{" "}
          <a
            href="https://www.rinkeby.io/#stats"
            className="text-blue-400 underline hover:text-blue-600"
          >
            Rinkeby
          </a>{" "}
          blockchain. If you claim one, you'll own an indestructible digital
          goon.
        </p>
        {/*  */}
        <h4 className="mb-2 text-2xl font-bold md:text-3xl tracked-tight">
          How is a{" "}
          <span className="text-purple-600 font-display tracked-wider">
            Polygoon
          </span>{" "}
          generated?
        </h4>

        <p className="mb-20 text-xl">
          Polygoonz are made by combining (using magic) coordinates from here:{" "}
          <a
            className="text-blue-500 underline"
            href="https://api.noopschallenge.com/polybot"
          >
            https://api.noopschallenge.com/polybot
          </a>
          &nbsp; with colors from here:
          <a
            className="text-blue-500 underline"
            href="https://api.noopschallenge.com/hexbot"
          >
            {" "}
            https://api.noopschallenge.com/hexbot
          </a>
          &nbsp; and faces from..?
        </p>
        <div className="flex justify-center">
          <Link href="/goon">
            <button className="goon-button">Get One</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WTF;
