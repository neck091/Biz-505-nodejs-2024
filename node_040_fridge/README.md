# 냉장고를 부탁해 샘플 프로젝트

- fiedgeDB.tbl_product table 에 샘플데이터를 import한 상태
- 유통기한이 임박한 상품리스트 출력하기

## 날짜와 관련된 프로젝트

- 날짜 관련 도구를 설치 : `npm install moment`

## DB Model import

```bash
sequelize-auto -o "./medels" -d fridgeDB -h localhost -u root -x '!Biz8080' -e mysql -l esm
```
