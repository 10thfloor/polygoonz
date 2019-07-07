
import { useRef } from 'react';
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
  const accounts = useStoreState(state => state.accounts);


  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <ConnectWeb3 />
      <div className="m-10">
        <Polygoon svgRef={svgRef} color={color} coords={coords} width={400} height={300} />
      </div>
      <PurchaseButton goon={{ coords, color }} svgRef={svgRef} canvasRef={canvasRef} />
      {accounts.length ? <span><Link href="/goons"><a className="p-2 underline text-green-400 hover:text-green-600">View your goons</a></Link>  <Link href="/what"><a className="underline text-green-400 hover:text-green-600">What is this?</a></Link></span> : ''}
      <canvas ref={canvasRef} id="canvas" width="400" height="300" style={{ display: 'none' }}></canvas>
    </div>
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
