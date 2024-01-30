# Sequelize DBMS 핸들링

- sequelize 를 사용할 때 Table 에 대한 Model을 생성한다.
- 수동으로 Model을 생성하고 프로젝트를 시작하면 Table 을 자동으로
  만드는 기능이 프로젝트에 추가된다.
- 지금 프로젝트는 이미 생성되어있는 `ecountDB` 를 대상으로 프로젝트를 진행할 예정이다.
- DB Schema를 자동으로 생성해주는 도구를 사용하여 DB 구성을 만들 것이다.

## Sepuelize 자동화 도구를 사용하여 DB Schema 만들기

- 도구 테스트 : shell에서 `npx sequelize-auto` 명령 실행 해보기

```bash

npm install -g mysql2
npm istall -g sequelize-auto

sequelize-auto -o "./medels" -d ecountDB -h localhost -u root -x '!Biz8080' -e mysql -l esm


```
