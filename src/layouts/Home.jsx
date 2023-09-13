import { useEffect } from "react";
import { useAtom } from "jotai";
import { accessTokenAtom, accessTokenDateAtom } from "../atoms/atom";
import { accessTokenValidator } from "../utils/common";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import CardList from "./CardList";

const Home = () => {
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);
  const [accessTokenDate, setAccessTokenDate] = useAtom(accessTokenDateAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      if (accessTokenValidator(accessTokenDate)) {
        setAccessToken(null);
        setAccessTokenDate(null);
        navigate("/");
      }
    }
  }, [accessToken]);

  return (
    <div className="container">
      <Sidebar />
      <CardList accessToken={accessToken} />
    </div>
  );
};

export default Home;
