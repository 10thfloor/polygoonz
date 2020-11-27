
import { useRef, Fragment } from 'react';
import Link from 'next/link'
import { useStoreState } from 'easy-peasy';
import Polygoon from "../components/Polygoon";
import PurchaseButton from '../components/PurchaseButton'
import fetchPolygon from "../src/polygon";
import fetchColor from "../src/color";
import { normalizePolygon } from '../src/polygon';
import ConnectWeb3 from '../components/ConnectWeb3';


const Home = ({ coords, color }) => {

  const svgRef = useRef();
  const canvasRef = useRef();
  const isDapper = useStoreState(state => state.isDapper);
  const network = useStoreState(state => state.network);
  const accounts = useStoreState(state => state.accounts);


  function renderPurchaseButton() {
    if (!isDapper || !accounts.length) {
      return <h4 className="text-xl">Hello. You'll need to <a className="underline text-blue-600" target="_blank" href="https://chrome.google.com/webstore/detail/dapper/pghmmgdinmfblodenlenkcnmndlnffeo">install</a> or <a className="underline text-blue-600" href="/goon">activate</a> <span className="text-purple-600 font-bold"><a href="https://www.meetdapper.com/">Dapper</a></span> to claim this <span className="font-display tracked-wide hover:text-purple-600"><a href="/wtf">Polygoon</a></span></h4>
    } else {
      if (network !== process.env.ACTIVE_NETWORK) {
        return <h4 className="text-xl">Hello. You'll to connect to the <a className="underline text-purple-600 font-bold" target="_blank" href="https://www.rinkeby.io/#stats">Rinkeby</a> network to claim this <span className="font-display tracked-wide hover:text-purple-600"><a href="/wtf">Polygoon</a></span></h4>
      } else {
        return (<Fragment>
          <PurchaseButton goon={{ coords, color }} svgRef={svgRef} canvasRef={canvasRef} />
          <div style={{ marginTop: '1rem' }}>
            <Link href="/goons"><a className="link">Your Goonz</a></Link>
            <Link href="/wtf"><a className="link">What is this?</a></Link>
          </div>
        </Fragment>)
      }
    }
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <ConnectWeb3 />
      <div className="m-10">
        <Polygoon svgRef={svgRef} color={color} coords={coords} width={400} height={300} />
      </div>
      {renderPurchaseButton()}
      <canvas ref={canvasRef} id="canvas" width="400" height="300" style={{ display: 'none' }}></canvas>
    </div >
  );
};

Home.getInitialProps = async () => {
  const [width, height] = [400, 300];
  const coords = await fetchPolygon();
  const color = await fetchColor();
  const nPoints = normalizePolygon(width, height, coords);
  return {
    coords: nPoints,
    color
  };
};

export default Home;
