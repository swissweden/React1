# React1  

> [!NOTE]
>  프리뷰(웹) 전환 단축키 CRTL + SHIFT + P

## 04/29
**렌더 트리**   
  
컴포넌트의 주요 특징은 다른 컴포넌트의 컴포넌트를 구성하는 것  
컴포넌트를 중첩하면 부모 컴포넌트와 자식 컴포넌트의 개념이 생기며   
각 부모 컴포넌트는 다른 컴포넌트의 자식이 될 수 있다.  
<img width="572" height="292" alt="image" src="https://github.com/user-attachments/assets/30784db0-b0bb-457e-92ac-6ebf113c9c70" />  
> 부모이면서 자식이기도 한 **"InspirationGenerator"**
---

**렌더 트리와 묘듈 의존성 트리?**
```jsx
<InspirationGenerator>
  <Copyright year={2023} />
</InspirationGenerator>
```
이 코드를 트리 관점으로 본다면 Copyright가 InspirationGenerator의 자식으로 보인다.  
  

하지만 App 함수 안을 확인하여 묘듈 의존성 관섬으로 본다면 부모자식이 달라지게 됨

```jsx
import InspirationGenerator from './InspirationGenerator';
import Copyright from './Copyright'; // <InspirationGenerator>이 아닌 App이 직접 파일을 불러옴
```
이렇기 때문에 묘듈 의존성 관점으로 보면 <Copyright>의 부모는 App이 되는 것 
  
  
물론 InspirationGenerator 내부에서 Copyright를 직접 임포트하도록 수정할 수도 있다.  
하지만 이 경우 App에서 관리하던 year 값에 대한 제어권을 잃게 된다.  _(\<InspirationGenerator /\> **X**, \<InspirationGenerator year={2026} /\> **O**)_   
  
또한 InspirationGenerator를 쓸 때마다 무조건 Copyright가 따라오게 되어 컴포넌트의 재사용성과 유연성이 떨어지게 된다  
반면 지금처럼 컴포넌트 합성 방식을 유지하면 App에서 상황에 따라  
Copyright 대신 다른 컴포넌트를 넣거나 내용을 비우는 등 훨씬 자유로운 설계가 가능해짐.  

**CSS**
일반 css
cssinjs
css프레임워크
css 모듈

이벤트에 응답하기
이벤트 핸들러
이벤트 핸들러는 handle로 시작하고 이벤트명을 뒤에 붙이는 것이 관례












> **jsx 문법 참고**  
> ? 는 참일때 실행할 코드, : 는 거짓일 때 실행할 코드

---



## 04/15


**비교 연산자 및 화살표 함수 :** 자바 ==와 ===의 차이 및 화살표 함수 문법 확인할것 
**filter() 및 map()의 역할 :** filter는 조건에 맞는 객체 전체를 가져와 새로운 배열에 담고, map은 배열의 처음부터 끝까지 자동으로 순회하며 출력함  
  
```
const filterTests = heroes.filter(hero =>
    hero.name === "클라크 켄트"
  ); // 필터 테스트로 클라크 켄트인 값을 저장
```
> 이름만 가져오는 것이 아니라 그 이름이 포함된 **객체 전체**를 가져와서 filterTests라는 새로운 배열에 담음

 
```jsx
const filterTests = heroes.filter(hero =>
    hero.power === 5 // (5인 애들이 여럿인 상황)
  );

  const listHeroes = filterTests.map(hero => //map이라서 배열의 시작부터 끝까지 알아서 출력해줘서 여러 줄 뜸
    <li>
      <p>
        {hero.name}의 배역은 {hero.casting} 이며 파워는 {hero.power} 입니다.
      </p>
    </li>
  );
```
  
이렇게 해도 출력은 되지만 고유 키값이 없어 경고가 나옴, 키값이 없으면 데이터가 어디서 온 지 모르기 때문  
`<li key={hero.id}>` 이걸 사용하면 키값을 가지게 됨  
  
**Key Prop의 특징** : 고유 키값이 없으면 데이터의 출처를 파악하기 어려워 경고가 발생하며, 키값은 즉석 생성이 아닌 배열 안에 포함된 것을 사용해야 함 <p/>
**프래그먼트 (Fragment)** : 빈 태그는 속성을 받을 수 없으므로, 하나로 묶으면서 key를 전달해야 하거나 루트 요소 반환 규칙을 지킬 때 사용함 <p/>
**순수 함수 (Pure Function)** : 입력을 받았을 때 항상 같은 화면을 그려주어 코드가 복잡해도 예측이 쉽고 외부 변수 수정으로 인한 버그를 방지함 <p/>
  
**순수하지 않은 코드 예시**

```jsx
let guest = 0;

function Cup() {
  guest = guest + 1; // 외부 함수를 건드리고 있음  
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaSet() {
  return (
    <>
      <Cup />
      <Cup />
      <Cup />
    </>
  );
}
```

이러면 리액트에선 1,2,3으로 출력되지 않고 2,4,6으로 출력 되어버림 <p/>
리액트 내에서 스스로 검사용으로 실행(출력은 x)해보는데 변수는 초기화 되지 않아서 1이 아닌 2씩 늘어난 것처럼 보이는 것 <p/>
> `Strict Mode (엄격 모드)`를 끄면 되긴하지만 일부러 불순한 코드를 알기 위해서 대부분 키고 한다고 함
  
**순수해진 코드**
```jsx
function Cup({ guest }) { // guest를 props로 받도록 수정
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaSet() {
  return (
    <>
      <Cup guest={1} /> // 외부 변수를 수정하지 않고 각각 고유한 값을 전달
      <Cup guest={2} /> 
      <Cup guest={3} /> 
    </>
  );
}
```

  
---
## 04/01

**파스칼 케이스 (PascalCase) :** 모든 단어의 첫 글자를 대문자로 작성 (React 컴포넌트 이름의 필수 규칙) <p/>
**카멜 케이스 (camelCase) :** 첫 단어는 소문자, 이후 단어의 첫 글자만 대문자로 작성 (일반적인 변수나 함수 이름에 사용) <p/>
**스네이크 케이스 (snakeCase) :** 모든 단어를 소문자로 쓰고 단어 사이를 언더바로 연결 (주로 API 필드명이나 파일명에 사용)

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
