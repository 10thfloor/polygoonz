import { useState, useEffect } from 'react';
import { useStoreState } from 'easy-peasy';
import { pinFileToIPFS } from '../../src/pin';
import { generatePNG } from '../../src/polygon';

const GetGoonButton = ({ goon, canvasRef, svgRef }) => {

    const [gettingGoon, setGettingGoon] = useState(false);
    const [currentRefs, setCurretnRefs] = useState({})

    const accounts = useStoreState(state => state.accounts)
    const contract = useStoreState(state => state.contract)
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
        return <h4>Hello. You'll need <a className="underline text-purple-600 font-bold" target="_blank" href="https://chrome.google.com/webstore/detail/dapper/pghmmgdinmfblodenlenkcnmndlnffeo">Dapper</a> to claim this <span className="font-display tracked-wide">Polygoon</span></h4>
    } else {
        return (
            <button className={`mb-10 font-display tracking-widest bg-blue-200 border-green-70 hover:border-green-500 hover:bg-green-200 hover:text-green-500 text-blue-500 border border-blue-500 font-bold py-2 px-4 border-b-4 rounded`} disabled={!accounts.length || gettingGoon} onClick={getGoon}>{!gettingGoon ? 'Claim This Goon' : 'Getting Goon ...'}</button>
        )
    }
}

export default GetGoonButton;