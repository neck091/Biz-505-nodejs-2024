# Naver open API 를 활용한 도서정보 검색 서비스

- naver 에서 제공하는 도서정보 서비스를 활용하여 검색 서비스를 구현해 보자
- `NodeJS+express` 서버가 또 하나의 `client` 역할을 수행하여 사용자의 도서 검색 요청을 naver openAPI 에 전달하고 , naver 에서 제공하는 데ㅐ이터를 다시 가공하여 사용자에게 응답한다.
- `NodeJS` 에서 openAPI 를 사용하기 위하여 과거에ㅐ서는 `axios` 라는 3rd party LIB 를 사용하였으나 최근에는 기본 JS의 `fetch` 만을 사용하여 가능해졌다.

## Naver open API 사용 준비

- naver 개발자 센터 에 개발자 등록
- 내 어플리케이션에 어플리케이션 등록
- Client ID, Client Secret 확인
- 프로젝트에 secret 변수 설정 파일 만들기
- .gitignore 에 secret 파일 설정
