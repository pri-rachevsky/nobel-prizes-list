import React from "react";
import { NobelPrize } from "../../models/nobelPrize";
import { SearchParams } from "../../models/search";
import "./PrizeItem.css";

type PrizeItemProps = {
    prize: NobelPrize,
    highlight: SearchParams
}
export const PrizeItem: React.FC<PrizeItemProps> = ({ prize, highlight}) => {

  const applyHighlightIfNeeded = (param: "name" | "category" | "year" | "motivation") => {
    const text = prize[param];

    const highlightText = highlight[param];
    if (highlightText) {
      const restOfTheText = text.split(highlightText);
      return (
        <>{
          restOfTheText.map((notHighlightText, index) => {
            if (index < restOfTheText.length-1) {
              return <>{notHighlightText}<strong className="highlight">{highlightText}</strong></>;
            }
            return notHighlightText;
          })
        }</>);
    }
    return <>{text}</>;
  };
  return (
    <li>
      <div className="container">
        <div className="header">
          <h2>{applyHighlightIfNeeded("name")}</h2>
          <p>{applyHighlightIfNeeded("category")} - {applyHighlightIfNeeded("year")}</p>
        </div>
        <p>{applyHighlightIfNeeded("motivation")}</p>
      </div>
    </li>
  );
};
