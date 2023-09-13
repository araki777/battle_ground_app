import { Container, Button } from "@mantine/core";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { exchangeCodeForToken } from "../utils/api";
import { accessTokenAtom, accessTokenDateAtom } from "../atoms/atom";

const AUTHORIZE_ENDPOINT = "https://oauth.battle.net/authorize";
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const redirectUri = "http://localhost:5173";

const Login = () => {
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);
  const [accessTokenDate, setAccessTokenDate] = useAtom(accessTokenDateAtom);
  const location = useLocation();
  const navigate = useNavigate();

  // urlパラメータにcodeがある場合は、auth0へtokenの発行を促す
  // storageValueがある場合はtokenを発行しない
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");

    if (accessToken) {
      navigate("/home");
    }

    if (code && !accessToken) {
      const fetchData = async () => {
        const response = await exchangeCodeForToken(code);
        if (response) {
          setAccessToken(response);
          setAccessTokenDate(new Date());
        }
      };
      fetchData();
    }
  }, [location, accessToken]);

  const generateState = () => {
    const state = Math.random().toString(36).substring(7);
    return state;
  };

  // ログインボタンがクリックされた時の処理
  const handleLogin = () => {
    const state = generateState();
    const queryParams = new URLSearchParams({
      client_id: CLIENT_ID,
      redirect_uri: redirectUri,
      response_type: "code",
      state: state,
    });

    const authorizeUrl = `${AUTHORIZE_ENDPOINT}?${queryParams.toString()}`;
    window.location.href = authorizeUrl;
  };

  return (
    <Container
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "Center",
        alignItems: "center",
      }}
    >
      <Button onClick={handleLogin} size="xl">
        ログイン
      </Button>
    </Container>
  );
};

export default Login;
