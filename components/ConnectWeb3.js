import { useEffect } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import Router from 'next/router';

const ConnectWeb3 = () => {
  const accounts = useStoreState(state => state.accounts);
  const start = useStoreActions(actions => actions.connect);

  useEffect(() => {
    if (!accounts.length && Router.route !== "/") {
      console.log('ConnectWeb3 render');
      start();
    }
  }, []);


  return ""
}


export default ConnectWeb3;
