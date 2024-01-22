# nodejs 프로젝트

- JS를 이용한 web application server 구현하기

## NodeJS 설치하기

- https://nodejs.org 에서 다운로드 받아 설치
- nodejs 는 짝수 버전을 다운받아 설치.

## 데몬 설치

- `npm install -g nodemon` : 소스코드 모니터링을 하면서 소스가 변경되면 자동으로 프로젝트를 재시작하는 도구

## express 프로젝트 생성 도구 설치

- `npm install -g express-21c`

## express 프로젝트 생성도구 업그레이드

- `npm uninstall -g express-21c` : 기존 도구 제거
- `npm install -g express-21c` : 새버전 설치

## express framwork 프로젝트 생성

- `express 프로젝트 명`

## express 프로젝트 생성도구를 원격으로 실행하기

- `express-21c`를 로컬에 설치하지 않고 사용할 때 원격의 패키지를 호출하여 사용하는 방법
- `npx express-21c 프로젝트명`
