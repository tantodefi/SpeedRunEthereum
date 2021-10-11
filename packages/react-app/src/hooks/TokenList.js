import { useState, useEffect } from "react";

/*
  ~ What it does? ~

  Gets a tokenlist (see more at https://tokenlists.org/), returning the .tokens only

  ~ How can I use? ~

  const tokenList = useTokenList(); <- default returns the Unsiwap tokens
  const tokenList = useTokenList("https://gateway.ipfs.io/ipns/tokens.uniswap.org");

  ~ Features ~

  - Optional - specify chainId to filter by chainId
*/

const useTokenList = (tokenListUri, chainId) => {
  const [tokenList, setTokenList] = useState([]);

  const _tokenListUri = tokenListUri || "https://gateway.ipfs.io/ipns/tokens.uniswap.org";

  useEffect(() => {
    const getTokenList = async () => {
      try {
        const tokens = await fetch(_tokenListUri);
        const tokenListJson = await tokens.json();
        let _tokenList;

        if (chainId) {
          _tokenList = tokenListJson.tokens.filter(t => {
            return t.chainId === chainId;
          });
        } else {
          _tokenList = tokenListJson;
        }

        setTokenList(_tokenList.tokens);
      } catch (e) {
        console.log(e);
      }
    };
    getTokenList();
  }, [tokenListUri, _tokenListUri, chainId]);

  return tokenList;
};

export default useTokenList;
