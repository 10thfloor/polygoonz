import { useState, useEffect } from 'react';
import { useStoreState } from 'easy-peasy';
import { pinFileToIPFS } from '../../src/pin';
import { generatePNG } from '../../src/polygon';

const GetGoonButton = ({ goon, canvasRef, svgRef }) => {

    const [gettingGoon, setGettingGoon] = useState(false);
    const [currentRefs, setCurretnRefs] = useState({});

    const accounts = useStoreState(state => state.accounts)
    const contract = useStoreState(state => state.contract)
    const network = useStoreState(state => state.network)
    const events = useStoreState(state => state.events)

    useEffect(() => {
        setCurretnRefs({
            canvas: canvasRef.current,
            svg: svgRef.current
        })
    }, [canvasRef.current, svgRef.current]);

    async function getGoon() {
        setGettingGoon(true);
        try {

            const formData = await generatePNG(currentRefs);
            const { data } = await pinFileToIPFS(formData, accounts[0], goon)

            console.log('.png was pinned to IPFS', data.IpfsHash);

            events.GoonCreated({
                filter: { uri: data.IpfsHash },
            }, () => {
                alert('You own this goon!');
                window.location.reload();
            }).on('error', console.error);

            contract.methods._createPolygoon(data.IpfsHash).send({ from: accounts[0] }, (error, data) => {
                if (error) {
                    return console.log(error);
                }
                return console.log('Transaction submitted to network, awaiting reply...', data);
            })

        } catch (e) {
            console.error(e);
            setGettingGoon(false);
        }

    }

    if (!accounts.length) {
        return <h4 className="text-xl">Hello. You'll need to <a className="underline text-blue-600" target="_blank" href="https://chrome.google.com/webstore/detail/dapper/pghmmgdinmfblodenlenkcnmndlnffeo">install</a> or <a className="underline text-blue-600" href="/goon">activate</a> <span className="text-purple-600 font-bold"><a href="https://www.meetdapper.com/">Dapper</a></span> to claim this <span className="font-display tracked-wide hover:text-purple-600"><a href="/wtf">Polygoon</a></span></h4>
    } else {
        if (network !== process.env.ACTIVE_NETWORK) {
            return <h4 className="text-xl">Hello. You'll to connect to the <a className="underline text-purple-600 font-bold" target="_blank" href="https://www.rinkeby.io/#stats">Rinkeby</a> network to claim this <span className="font-display tracked-wide hover:text-purple-600"><a href="/wtf">Polygoon</a></span></h4>
        } else {
            return (
                <button className={`goon-button ${gettingGoon ? 'cursor-wait' : ''}`} disabled={!accounts.length || gettingGoon} onClick={getGoon}>{!gettingGoon ? 'Claim This Goon' : 'Getting Goon ...'}</button>
            )
        }
    }

}

export default GetGoonButton;