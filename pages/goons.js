import { useEffect } from 'react';
import Link from 'next/link';
import { useStoreState, useStoreActions } from 'easy-peasy';

const MyGoons = () => {
  const accounts = useStoreState(state => state.accounts);
  const userGoons = useStoreState(state => state.userGoons);
  const getUserGoons = useStoreActions(actions => actions.getUserGoons)

  useEffect(() => {
    if (accounts.length)
      getUserGoons({ accounts });
  }, [accounts])

  return (
    <div>
      <div className='h-screen flex flex-col items-center'>
        {userGoons ? !userGoons.length ? <div className="h-screen flex flex-col items-center justify-center">
          <p className="mb-10">You don't have a single <span className="inline font-display tracked-wide">Polygoon</span></p>
          <Link href="/goon">
            <button className="font-display bg-blue-200 tracking-widest text-blue-500 border border-blue-500 font-bold py-2 px-4 border-b-4 border-green-70 hover:border-green-500 hover:bg-green-200 hover:text-green-500 rounded">Get One</button>
          </Link>
        </div> : userGoons.map((p) => {
          if (p.metadata.keyvalues.goon) {
            return (<div style={{ padding: 15 }} key={p.ipfs_pin_hash} className="flex justify-center">
              <a href={`https://gateway.ipfs.io/ipfs/${p.ipfs_pin_hash}`}>
                <img src={`https://gateway.ipfs.io/ipfs/${p.ipfs_pin_hash}`} width={400} height={300} />
              </a>
            </div>)
          } else {
            return ''
          }
        }).filter(p => p) :
          <div className="h-screen flex flex-col justify-center items-center text-blue-400">
            Wait for it...
          </div>}
      </div>
    </div>
  );
}


export default MyGoons;
