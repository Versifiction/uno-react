import classNames from "classnames";
import backsideCard from "../../assets/card.png";

import "./card.css";

const Card = (props) => {
  const { canBePlayed, color, number, returned, turn, index } = props;

  return (
    <>
      {returned ? (
        <div
          className={classNames(`card num-${number} ${color} ml-2 mb-2`, {
            "-mt-6": canBePlayed,
            "shadow-xl": turn,
            "-mr-16": index !== null,
          })}
        >
          <span className="inner">
            <span className="mark">{number}</span>
          </span>
        </div>
      ) : (
        <img
          src={backsideCard}
          className={classNames(`w-[117px] h-[178px] ml-2 mt-2 mb-2`, {
            "-mr-16": index !== null,
          })}
        />
      )}
    </>
  );
};

export default Card;
