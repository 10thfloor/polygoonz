import { useEffect } from 'react';
import Link from 'next/link';
import { useStoreState, useStoreActions } from 'easy-peasy';
import ConnectWeb3 from '../components/ConnectWeb3';
import LoadingImg from '../components/LoadingImg';

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
      <ConnectWeb3 />
      <div className='h-screen flex flex-col items-center'>
        <div className="bg-grey-100 mt-10 border border-green-400 text-blue-700 px-4 py-3 rounded relative mb-10" role="alert">
          <strong className="font-bold">Wait! </strong>
          <span className="block sm:inline">If you just claimed one, it may take a few minutes to arrive.</span>
        </div>
        {userGoons ? !userGoons.length ? <div className="h-screen flex flex-col items-center justify-center">
          <p className="mb-10 text-xl">You don't have a single <span className="inline font-display tracked-wide text-purple-600">Polygoon</span></p>
          <Link href="/goon">
            <button className="goon-button">Get One</button>
          </Link>
        </div> : userGoons.map((p) => {
          if (p.metadata.keyvalues.goon) {
            return (<div style={{ padding: 15 }} key={p.ipfs_pin_hash} className="flex justify-center">
              <a href={`https://ipfs.infura.io/ipfs/${p.ipfs_pin_hash}`}>
                <LoadingImg imageUrl={`https://ipfs.infura.io/ipfs/${p.ipfs_pin_hash}`} width={400} height={300} />
              </a>
            </div>)
          } else {
            return ''
          }
        }).filter(p => p) :
          <div className="h-screen flex flex-col justify-center items-center text-xl">
            Wait for it...
          </div>}
      </div>
    </div>
  );
}


export default MyGoons;
