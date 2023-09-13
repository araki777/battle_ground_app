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

// 検索
export const cardSearch = async (accessToken) => {
  let response1AllData = [];
  let response2AllData = [];
  let response3AllData = [];
  let response4AllData = [];
  let response5AllData = [];
  let nextPage = 1;

  try {
    // 一つ目のGETリクエストを実行
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const response = await fetchCardList(accessToken, nextPage, "hero");
      const data = response.data.cards;

      response1AllData = response1AllData.concat(data);

      if (nextPage == response.data.pageCount) {
        break;
      }

      nextPage++;

      // 0.5秒の遅延
      await new Promise(function (resolve) {
        setTimeout(resolve, 0.5 * 1000);
      });
    }
  } catch (e) {
    console.log(e);
  }

  try {
    // ページの初期化
    nextPage = 1;

    // 二つ目のGETリクエストを実行
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const response = await fetchCardList(accessToken, nextPage, "minion");
      const data = response.data.cards;

      response2AllData = response2AllData.concat(data);

      if (nextPage == response.data.pageCount) {
        break;
      }

      nextPage++;

      // 0.5秒の遅延
      await new Promise(function (resolve) {
        setTimeout(resolve, 0.5 * 1000);
      });
    }
  } catch (error) {
    console.error("カード検索中にエラーが発生しました:", error);
    return [];
  }

  try {
    // ページの初期化
    nextPage = 1;

    // 三つ目のGETリクエストを実行
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const response = await fetchCardList(accessToken, nextPage, "quest");
      const data = response.data.cards;

      response3AllData = response3AllData.concat(data);

      if (nextPage == response.data.pageCount) {
        break;
      }

      nextPage++;

      // 0.5秒の遅延
      await new Promise(function (resolve) {
        setTimeout(resolve, 0.5 * 1000);
      });
    }
  } catch (error) {
    console.error("カード検索中にエラーが発生しました:", error);
    return [];
  }

  try {
    // ページの初期化
    nextPage = 1;

    // 4つ目のGETリクエストを実行
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const response = await fetchCardList(accessToken, nextPage, "reward");
      const data = response.data.cards;

      response4AllData = response4AllData.concat(data);

      if (nextPage == response.data.pageCount) {
        break;
      }

      nextPage++;

      // 0.5秒の遅延
      await new Promise(function (resolve) {
        setTimeout(resolve, 0.5 * 1000);
      });
    }
  } catch (error) {
    console.error("カード検索中にエラーが発生しました:", error);
    return [];
  }

  try {
    // ページの初期化
    nextPage = 1;

    // 5つ目のGETリクエストを実行
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const response = await fetchCardList(accessToken, nextPage, "anomaly");
      const data = response.data.cards;

      response5AllData = response5AllData.concat(data);

      if (nextPage == response.data.pageCount) {
        break;
      }

      nextPage++;

      // 0.5秒の遅延
      await new Promise(function (resolve) {
        setTimeout(resolve, 0.5 * 1000);
      });
    }
  } catch (error) {
    console.error("カード検索中にエラーが発生しました:", error);
    return [];
  }

  // データを結合して返す
  const cardLists = response1AllData.concat(
    response2AllData,
    response3AllData,
    response4AllData,
    response5AllData
  );
  return cardLists;
};
