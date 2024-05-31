import {
  NAVER_CLIENT_ID,
  NAVER_CLIENT_SECRET,
  NAVER_BOOK_URL,
} from "../config/naver_secret.js";

const getBooks = async (search) => {
  //naver 에 데이터 요청하기 위한 준비
  const naverFecchOption = {
    method: "GET",
    headers: {
      "X-Naver-Client-Id": NAVER_CLIENT_ID,
      "X-Naver-Client-Secret": NAVER_CLIENT_SECRET,
    },
  };
  let queryString = `${NAVER_BOOK_URL}?query=${search}&display=1`;
  let response = null;

  try {
    response = await fetch(queryString, naverFecchOption);
    let count = (await response.json()).total;
    count = count > 100 ? 100 : count;
    queryString = `${NAVER_BOOK_URL}?query=${search}&display=${count}`;
    response = await fetch(queryString, naverFecchOption);

    // console.log(await response.json());
    return (await response.json()).items;
  } catch (error) {
    console.log(error);
    //catch 가 실행되었다 = 네이버에서 오류메세지를 보냄
    //throw : 날 호출한(router) 곳으로 exception을 전달
    // 새로운 오류 메세지를 만들어서 전달
    throw new Error("Naver 통신 오류");
  }
};

export { getBooks };
