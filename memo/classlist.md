# JS 에서 tag 에 부착된 class 를 확인하는 압법

- 한개의 tag 에 한개의 class 가 부착되어있을 경우

```html
<div class="memobox"></div>
```

- 아래와 같은 방법으로 tag(Selector)에 부착된 클래스가 무엇인지 확인 할 수 있다.

```javascript
const div = document.querySelector("div");
if (div.className === "memo") {
}
```

- 한개의 tag에 두개 이상의 클래스가 있을 경우

```html
<div class="memo list"></div>
```

- className 을 사용하면 아래와 같은 코드가 필요하다
- 이때 ClassName 속성의 -따라서 원하는 클래스 이름이 있는지 확인할때 확인이 안될 때도 있다

```javascript
const div = document.querySelector("div");
if (div.className === "memo list") {
}
```

- 두 개 이상의 클래스 중에 원하는 클래스가 있는지 찾을때는 `classList`를 사용하는 것이 좋다.

```javascript
const div = document.querySelector("div");
//div selector 에 여러개의 class가 부착되어있는데
// 그 중에 memo 라는 class 가 있는 지 확인하기
if (div.classList.contains === "memo") {
}
```
