import React, { useState } from "react";
import { useAtom } from "jotai";
import { accessTokenAtom } from "../atoms/atoms";
import axios from "axios";

const Home = () => {
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);
  const [searchData, setSearchData] = useState([]);

  const handleGameSearch = () => {
    axios
      .get("https://kr.api.blizzard.com/hearthstone/cards", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          locale: "ja-jp",
          gameMode: "battlegrounds",
          bgCardType: "hero",
        },
      })
      .then((response) => {
        console.log(response);
        setSearchData(response.data.cards);
      });
  };

  return (
    <div>
      <button onClick={handleGameSearch}>検索</button>
      {searchData && (
        <div>
          {searchData.map((data) => (
            <div key={data.id}>
              <div>{data.name}</div>
              <img src={data.image} alt={data.name} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
