import { Link } from "react-router-dom";
import { Button } from "antd";

import logo from "../../assets/UNO_Logo.svg.png";

const Home = () => {
  return (
    <div className="bg-[#DB1A1F] h-screen text-white">
      <div className="flex justify-center mb-8 pt-8">
        <img src={logo} className="w-36" />
      </div>
      <p className="text-center">Bienvenue dans le jeu du Uno !</p>
      <p className="text-center">
        Pour gagner au Uno, vous devez être le 1er à vous débarrasser de toutes
        vos cartes (à chaque manche afin de marquer des points).
      </p>
      <div className="flex justify-center">
        <Button className="flex justify-center mt-8" type="primary">
          <Link to={"/game"}>Jouer</Link>
        </Button>
      </div>
    </div>
  );
};

export default Home;
