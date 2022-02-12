const startPayment = async ({ setError, handleNewTx, ether, addr }: StartPayment) => {
    try {
      if (!window.ethereum)
        throw new Error("No crypto wallet found. Please install it.");
  
      const listAccs = await window.web3.eth.getAccounts();
      const tx = await window.web3.eth.sendTransaction({
        from: listAccs[0],
        to: addr,
        value: window.web3.utils.toWei(ether, 'ether')
    });

      const gasPrice = window.web3.utils.fromWei(tx.gasUsed.toString());
      const value = ether.toString()

      handleNewTx({ hash: tx.transactionHash, gasPrice, value });
    } catch (err: any) {
      setError(err.message);
    }
  };

type StartPayment = {
    setError: (arg0: string) => void;
    handleNewTx: ({hash, gasPrice, value } : HandleNewTxt) => void;
    ether: string;
    addr: string;
}

type HandleNewTxt = { hash: string, gasPrice: string, value: string }

export default startPayment;
