import axios from 'axios';

export const pinFileToIPFS = (formData, ownerAddress, goon) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    const metadata = JSON.stringify({
        name: ownerAddress,
        keyvalues: {
            goon: JSON.stringify(goon)
        }
    });
    formData.append('pinataMetadata', metadata);
    return axios.post(url,
        formData,
        {
            maxContentLength: 'Infinity', //this is needed to prevent axios from erroring out with large files
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                'pinata_api_key': "3e1bcc3240cb365d3188",
                'pinata_secret_api_key': process.env.PINATA_SECRET
            }
        }
    )
}

export const userPinList = (queryParams) => {



    const sanitizedParams = {
        hashContains: queryParams.hashContains ? queryParams.hashContains : '*',
        pinStartDate: queryParams.pinStartDate ? queryParams.pinStartDate : '*',
        pinEndDate: queryParams.pinEndDate ? queryParams.pinEndDate : '*',
        unpinStartDate: queryParams.unpinStartDate ? queryParams.unpinStartDate : '*',
        unpinEndDate: queryParams.unpinEndDate ? queryParams.unpinEndDate : '*',
        selectedPinStatus: queryParams.selectedPinStatus ? queryParams.selectedPinStatus : 'all',
        pageLimit: queryParams.pageLimit ? queryParams.pageLimit : 10,
        pageOffset: queryParams.pageOffset ? queryParams.pageOffset : 0
    };
    let metadataQuery = '';
    if (queryParams.nameContains && !queryParams.keyvalues) {
        metadataQuery = `?metadata[name]=${queryParams.nameContains}`
    }
    else if (!queryParams.nameContains && queryParams.keyvalues) {
        const stringKeyValues = JSON.stringify(queryParams.keyvalues);
        metadataQuery = `?metadata[keyvalues]=${stringKeyValues}`
    }
    else if (queryParams.nameContains && queryParams.keyvalues) {
        const stringKeyValues = JSON.stringify(queryParams.keyvalues);
        metadataQuery = `?metadata[name]=${queryParams.nameContains}&metadata[keyvalues]=${stringKeyValues}`
    }
    const url = `https://api.pinata.cloud/data/userPinList/hashContains/${sanitizedParams.hashContains}/pinStart/${sanitizedParams.pinStartDate}/pinEnd/${sanitizedParams.pinEndDate}/unpinStart/${sanitizedParams.unpinStartDate}/unpinEnd/${sanitizedParams.unpinEndDate}/pinSizeMin/*/pinSizeMax/*/pinFilter/${sanitizedParams.selectedPinStatus}/pageLimit/${sanitizedParams.pageLimit}/pageOffset/${sanitizedParams.pageOffset}${metadataQuery}`;
    return axios
        .get(url, {
            headers: {
                'pinata_api_key': "3e1bcc3240cb365d3188",
                'pinata_secret_api_key': process.env.PINATA_SECRET
            }
        })

};