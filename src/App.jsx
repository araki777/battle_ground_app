import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET_ID = import.meta.env.VITE_CLIENT_SECRET_ID;
const AUTHORIZE_ENDPOINT = "https://oauth.battle.net/authorize";
const TOKEN_ENDPOINT = "https://oauth.battle.net/token";
const redirectUri = "http://localhost:5173/oauth/battlenet/callback";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");

    if (code) {
      exchangeCodeForToken(code);
    }
  }, [location]);

  // 認証コードを使用してアクセストークンを取得
  const exchangeCodeForToken = async (code) => {
    try {
      const response = await axios.post(TOKEN_ENDPOINT, null, {
        auth: {
          username: CLIENT_ID,
          password: CLIENT_SECRET_ID,
        },
        params: {
          redirect_uri: redirectUri,
          grant_type: "authorization_code",
          code: code,
        },
      });

      setAccessToken(response.data.access_token);
    } catch (error) {
      console.error("アクセストークンの取得エラー:", error);
    }
  };

  const generateState = () => {
    const state = Math.random().toString(36).substring(7);
    localStorage.setItem("oauthState", state);
    return state;
  };

  const handleLoginClick = () => {
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
    <div className="App">
      <header className="App-header">
        <h1>Battle.net OAuth 2.0 Example</h1>
        {accessToken ? (
          <div>
            <p>アクセストークン: {accessToken}</p>
          </div>
        ) : (
          <div>
            <button onClick={handleLoginClick}>Battle.netでログイン</button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
