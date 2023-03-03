import React, { useEffect, useState } from "react";
import { PrizeItem } from "../component/prizeItem/PrizeItem";
import { SearchInputs } from "../component/search/SearchInputs";
import { initialSearchParams, SearchParams } from "../models/search";
import { NobelPrizeService } from "../service/prize.service";
import "./AutoComplete.css";

export const AutoCompletePage: React.FC = () => {
  const [prizes, setPrizes] = useState([]);
  const [highlight, setHighlight] = useState<SearchParams>(initialSearchParams);

  useEffect(() => {
    NobelPrizeService.readAll().then((loadedPrizes) => setPrizes(loadedPrizes));
  }, []);

  const search = (params: SearchParams) => {
    NobelPrizeService.read(params).then((loadedPrizes) => {
      setPrizes(loadedPrizes);
      setHighlight(params);
    });
  };

  return (
    <div className="page">
      <div className="title">
        <div className="title-content">
          <h1>Nobel prize winners</h1>
          <img className="image" src="nobelPrize.png" alt="nobel prize" />
        </div>
      </div>
      
      <SearchInputs onSearch={search} />
      {
        prizes.length === 0 ?
          <h3 className="message">No winners with those characteristics</h3> :
          <ul>
            {prizes.map(prize => <PrizeItem key={prize.id} prize={prize} highlight={highlight} />)}
          </ul>
      }
    </div>
  );
};
