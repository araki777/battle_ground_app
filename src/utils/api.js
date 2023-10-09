import axios from "axios";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET_ID = import.meta.env.VITE_CLIENT_SECRET_ID;
const TOKEN_ENDPOINT = "https://oauth.battle.net/token";
const redirectUri = "http://localhost:5173";

// 認証コードを使用してアクセストークンを取得
export const exchangeCodeForToken = async (code) => {
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

    return response.data.access_token;
  } catch (error) {
    return undefined;
  }
};

const fetchCardList = async (
  accessToken,
  page,
  bgCardType,
  sort = "tier:asc,name:asc"
) => {
  const response = await axios.get(
    "https://kr.api.blizzard.com/hearthstone/cards",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        locale: "ja-jp",
        gameMode: "battlegrounds",
        sort: sort,
        page: page,
        bgCardType: bgCardType,
        pageSize: 500,
      },
    }
  );

  return response;
};

export const fetchDataWithRetry = async (accessToken, category, maxRetries) => {
  const categories =
    category === "All"
      ? ["hero", "minion", "quest", "reward", "anomaly"]
      : [category];
  const responseData = [];

  for (const category of categories) {
    let retries = 0;
    let nextPage = 1;

    while (retries < maxRetries) {
      try {
        const response = await fetchCardList(accessToken, nextPage, category);
        const data = response.data.cards;
        responseData.push(data);

        if (nextPage >= response.data.pageCount) {
          break;
        }

        nextPage++;
      } catch (error) {
        console.error(`Failed to fetch data for ${category}. Retrying...`);
        retries++;
        await new Promise((resolve) => setTimeout(resolve, 2000)); // 2秒待機してリトライ
      }
    }
  }

  console.log(responseData);
  return responseData;
};
