# React1

## 04/01
v
**파스칼 케이스 (PascalCase) :** 모든 단어의 첫 글자를 대문자로 작성 (React 컴포넌트 이름의 필수 규칙) <p/>
**카멜 케이스 (camelCase) :** 첫 단어는 소문자, 이후 단어의 첫 글자만 대문자로 작성 (일반적인 변수나 함수 이름에 사용) <p/>
**스네이크 케이스 (snakeCase) :** 모든 단어를 소문자로 쓰고 단어 사이를 언더바로 연결 (주로 API 필드명이나 파일명에 사용)

---

### JavaScript를 JSX에서 사용하는 방법

**따옴표 문자열 :** HTML처럼 고정된 문자열 값을 전달할 때 사용 (중괄호 없이 따옴표만 사용) <p/>
**변수 참조 :** 중괄호 { } 안에 변수명을 적어 이미 선언된 데이터 값을 화면에 출력 <p/>
**함수 호출 :** 중괄호 안에서 함수를 실행하여 그 반환(return) 값을 화면에 렌더링 <p/>
**객체 적용 :** 중괄호 안에 자바스크립트 객체 { }를 한 번 더 넣어 스타일이나 여러 속성을 한꺼번에 전달  
ex) <div style={{ color: 'royalblue', fontSize: '20px' }}>

> `중괄호 2개 {{ }}`의 의미 : 바깥쪽 { }는 JSX에서 자바스크립트를 쓰겠다는 신호이고, 안쪽 { }는 자바스크립트 객체 데이터 자체를 의미함
```jsx
export default function JsxExample() {
  const name = "React";
  const getStatus = (score) => score >= 80 ? "합격" : "불합격";

  return (
    <>
      <img src="vite-project\public\icons.svg" alt="icon" />

      <h1>{name}</h1>

      <p>결과: {getStatus(85)}</p>

      <div style={{ color: 'blue', fontSize: '20px' }}>
        Hello, React
      </div>
    </>
  );
}
```

## 03/25
---

###  export default function

**파일당 단 하나만 가능 :** 한 모듈에서 오직 하나의 항목만 기본으로 내보낼 수 있음 <p/>
**첫 글자는 대문자로 :** 사용할 함수의 첫 글자는 대문자로 해야함 (소문자로 작성 시 HTML 태그로 생각해서 오류발생)

> `default`로 내보낸 것은 가져오는 쪽에서 이름을 마음대로 정할 수 있으나 웬만하면 그대로 가져올 것

```jsx

import RYU from './components/Gallery'; // 디폴트에서 가져와서 이름 변경한 상태

export default function App() {
  return (
    <>
      <RYU />
    </>
  );
}
```

---


###  export ~ function
**파일당 여러번 사용 가능 :** 이름이 있는건 중괄호에 이름 그대로 적어서 임포트<p/>
**개별 익스포트 :** 이름을 바꿔서 가져오고 싶다면 as를 써서 변경 <p/>
**네임드 익스포트 :** 이름을 각각 바꾸지 않고 한꺼번에 애스터리스크 * 사용해서 변경 (중괄호 필요없음)<p/>

> 보편적으로 개별은 쓰지 않고 네임드 익스포트를 사용함. 일관적이고 관리가 편하기 때문

```jsx
import {NamedComponent1, NamedComponent2 as N2} from './components/NamedComponent'
import * as Test from './components/NamedTest'

export default function App() {
  return (
    <>
      <NamedComponent1 />
      <N2 />
      <Test.NamedTest1 />
    </>
  )
}
```
