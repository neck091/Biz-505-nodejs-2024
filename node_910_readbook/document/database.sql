-- 독서록 프로젝트 2024
CREATE DATABASE bookDB2;

USE bookDB2;

/*
MYSQL 칼럼 속성 데이터 type 한글,
한글, 영문 문자열 : VARCHAR(길이) 0~ 65535 개수의 문자열
	가급적 4000자 이하의 문자열을 저장하도록 권장

TEXT 형
	VARCHAR 보다 큰 문자열을 저장할 때
	4000자 이상의 문자열을 저장할 때

정수값 : TINYINT, SMALINT, INT(INTEGER). BIGINT
TINYINT : 0~ 255 또는 (-128 ~ 127)
SMALINT : 0-65535(-32768 ~ 32767)
INT : 0 ~ 2 의 4승 -1 (-2의 3승 ~ 2의 3승 - 1 )
BIGINT : 0 ~ 2 8승  (-2의 7승 ~ 2의 7승 - 1 )

실수값 : FLOAT, DUBLE 
	FLOAT(M,D) : M : 정수 자릿수, D : 소수이하 자릿수
    

*/
CREATE TABLE tbl_books (
isbn	VARCHAR(13) 	PRIMARY KEY,
title	VARCHAR(50) 	NOT NULL,
author	VARCHAR(50) 	NOT NULL,
publisher	VARCHAR(50)	 NOT NULL,
price		INT,
discount 	INT,
description		VARCHAR(400),
pubdate		VARCHAR(10),
link		VARCHAR(125),
image		VARCHAR(125)
);
-- table의 물리적 구조 확인
DESCRIBE tbl_books;
DESC tbl_books;

SELECT * FROM tbl_books;

-- mysql에서는 명령을 실행하기 전에 반드시 schema를 연결.(open, use)

-- mysql 에서 사용하는 특별한 명령
-- 기존의 table을 drop 하고 다시 그 구조대로 create를 실행 
TRUNCATE tbl_books;
SELECT * FROM tbl_books;

-- 도서코드 : 0001, 도서명 : 자바, 출판사 : 자바출판사, 저자: 노도강 인 데이터를 INSERT 해보기

INSERT INTO
tbl_books(isbn, title , publisher, author)
VALUE( '0001','자바','자바출판사','노도강')


/*
WORKBENCH, 프로젝트, 다양한 DB client 에서 데이터를 INSERT, UPDATE, DELETE를 실행하면 성능상 여러 이유로
직접 DB 저장소에 바로 데이터가 저장되지 않고
중간에 임시기억장치에 잠시 머물게 된다. 
일부 다른 DB 소프트웨어는 임시기억장소에 아예 데이터를 저장해 두고, 
어떤 명령등이 실행되면 한꺼번에 데이터를 저장소에 저장하기도 한다

이러한 중간의 임시장치를 Buffer 또는 cache 라고 한다.
이때 여러 곳의 client가 동시에 DB의 데이터에 접근할 경우 일부 client에서는 INSERT, UPDATE, DELETE가 반영되지 않은
데이터를 보게 될 수도 있다.

명령으로 데이터를 INSERT, UPDATE, DELETE를 수행한 경우 강제로 저장소에 데이터를 저장하도록 명령을 수행해주어야 함.


*/

COMMIT;
INSERT INTO tbl_books(isbn,title, publisher, author)
VALUE('0002','HTML','한국출판사','디자이너');
ROLLBACK;
SELECT * FROM tbl_books;
/*
DDL(data definition lang) : DBA(database administrator, 최고관리자)가 사용하는 명령어
물리적인 저장소 생성 : create database, create table
사용자를 생성 : create user

물리적인 저장소를 제거 : drop database, drop table

*/

-- DB에서 root 상자는 매우 신중하게 사용해야 하는 권한을 갖고 있음
-- DB의 물리적 저장소를 생성, 제거, 변경할 수 있는 권한을 갖는다
-- 일반적으로 현업에서는 root 사용자 외에 별도의 사용자를 생성하여 
-- 제한적인 권한을 부여하여 사용하도록 한다. 

-- necktie 라는 사용자를 loclhost에서만 접근할 수 있도록 생성
CREATE USER 'necktie'@'localhost' IDENTIFIED BY '!Biz8080'; 
-- 하지만 새로 생성된 사용자는 아무런 권한이 없기 때문에 할 수 있는 일이 없음.


