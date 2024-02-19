# 생성

```bash
npx express-21c nodejs_900_Memo --sequelize
```

- `npm install sequelize`
- 날짜 관련도구를 설치 : `npm install moment`

## DB Model import

```bash
sequelize-auto -o ./db -d memodb -h localhost -u root -x '!Biz8080' -e mysql -l esm

```

## 이미지 관련

```bash
npm install multer
npm install uuid
```

### nodejs 서버에서 Session을 사용한 Login 구현

- dependency 설치: `npm install express-session`
- `app.js`에 session 설정

### db 파일과 models 파일 수정
