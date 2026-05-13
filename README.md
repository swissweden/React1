# React1  

## 202230110 류준상
> [!NOTE]
>  프리뷰(웹) 전환 단축키 CRTL + SHIFT + P


## 05/13

### 이벤트 버블링
자식 요소에서 발생한 이벤트가 부모 요소로 전달되는 현상을 **이벤트 버블링**이라고 함.  
의도치 않은 부모 요소의 핸들러 실행을 막기 위해 `e.stopPropagation()` 메서드를 사용하여,   
이벤트가 상위 DOM 트리로 전파되는 것을 즉시 중단시킬 수 있다.  
주로 중첩된 버튼이나 메뉴 구조에서 각 요소의 클릭 이벤트를 독립적으로 처리할 때 유용하다.  
전파를 제어함으로써 UI의 각 부분이 서로 간섭 없이 의도한 대로 동작하게 할 수 있음
```jsx
import style from "./Bubble.module.css"

function Button({ onClick, children }) {
  return (
    <button className={style.button} onClick={e => {
      e.stopPropagation(); // 이거 빼면 버튼 누를때 내비도 같이 온클릭됨
      onClick();
    }}>
      {children}
    </button>
  );
}

export default function Bubble() {
  return (
    <>
      <h1 className={style.title}>Bubble</h1>
      <nav className={style.navBar} onClick={() => alert("네비게이션바 클릭!")}>
        <Button onClick={() => alert("버튼1 클릭!")}>
          버튼1
        </Button>
        <Button onClick={() => alert("버튼2 클릭!")}>
          버튼2
        </Button>
      </nav>
    </>
  );
}
```
<img width="1192" height="136" alt="image" src="https://github.com/user-attachments/assets/1edcd8f3-289b-4a4b-bbb3-1606bee86c16" />
  
_출력 사진_  
  
**e.stopPropagation() 함수가 없다면 버튼만 눌러도 nav 온클릭까지 같이 알러트 된다!**
> 참고로 출력상으로 겹쳐서가 아니라 코드가 그 안에 있어서 버블링 되는것임  
> 만약 버튼이 출력상으로 **nav**와 겹쳐있지 않아도 구조가 저러면 같이 알러트 된다
> 
### e.preventDefault() 과 e.stopPropagation()
`e.stopPropagation()`은 상위 요소로의 전파를 멈추고, `e.preventDefault()`는 브라우저의 기본 동작을 방지함.  
이벤트 핸들러는 순수 함수일 필요가 없어 사이드 이펙트를 수행하고 데이터를 변경하기에 최적의 위치임  
사용자의 입력값 수정이나 리스트 변경 등 인터랙션에 따른 실질적인 로직 처리가 이곳에서 이루어진다.  
이때 변경되는 정보를 안정적으로 저장하고 관리하기 위해 React의 State Hook을 함께 사용한다.  
이처럼 이벤트 제어와 상태 관리를 조합하여 컴포넌트 내의 동적인 상호작용을 정교하게 구현할 수 있다.  


### 비디오 태그
HTML의 \<video>태그는 보통 \<video>...\</video>의 형태로 사용했으나,  
앞쪽 태그 안의 속성 만으로 충분한 설정이 가능한 경우에는 싱글 태그로 사용할 수 있음    
실습에서는 JSX를 사용하기 때문에 뒤의 \</video> 태그를 생략하고, \<video /> 형태의 싱글 태그로 사용되었음  
그러나 <source>, <track>, 대체 텍스트 등을 사용해야 하는 경우는 \<video>...\</video>의 형태로 사용할 수도 있다.    
```jsx
<section>
   <video id="videoPlayer" src={sampleVideo} controls width="350" /> // 단일의 경우
</section>

<section>
   <video width="640" height="360" controls> // 다중 소스가 필요한 상황 (영상과 자막 따로 가져오는 중)
   <source src="/assets/videos/main-video.mp4" type="video/mp4" /> 
   <track
          src="/assets/captions/subtitles_ko.vtt"
          kind="subtitles"
          srcLang="ko"
          label="한국어"
          default
   />
   </video>
</section>

```

> React에서는 DOM에 직접 접근하는 것을 권장하지 않는다. (실습이니 이렇게 한 것)  
> 모듈의 이름은 camelCase, 컴포넌트는 PascalCase 사용 또한 기본적인 관례


## 05/06
### 이벤트 핸들러에서 Prop 및 children 
컴포넌트 내부에 선언된 이벤트 핸들러는 부모 컴포넌트로부터 전달받은 `props`에 접근하여 그 값을 활용할 수 있음 
또한, 컴포넌트의 여는 태그와 닫는 태그 사이의 내용은 `children`이라는 내부적으로 약속된 특수한 prop으로 전달되며, 이 매개변수 이름은 다른 이름으로 임의 변경하여 받을 수 없음  

### 이벤트 핸들러를 Prop으로 전달 및 모듈화
각각의 버튼이 2가지 이상의 다양한 기능을 수행해야 할 때, 하나의 컴포넌트 안에서 조건문으로 분기하거나 필요한 만큼 버튼 컴포넌트를 여러 개 만드는 방식은 유지보수와 재사용성 측면에서 문제가 있음  
 
 **이벤트 핸들러 (`handle.jsx`)**: 실행될 로직(함수)들은 별도의 파일에 모듈 형태로 모아서 관리해줌.  
 **부모 컴포넌트 (`Toolbar`)**: Button 컴포넌트를 호출할 때, 미리 분리해 둔 이벤트 핸들러 함수를 Prop으로 함께 전달하여 연결해 준다.

---

### 동영상 재생정지 기능 컴포넌트 분리
동영상 제어 로직을 별도 모듈로 분리하고, 공통 버튼 컴포넌트에 Prop으로 전달하여 동작하게 함

#### `src/components/handle.jsx` (이벤트 핸들러 모듈)  
```jsx
// 비디오 재생
export const handlePlay = ({ message }) => {
    const video = document.getElementById(message);
    if (video) {
        video.play();
    }
};

// 비디오 정지
export const handleStop = ({ message }) => {
    const video = document.getElementById(message);
    if (video) {
        video.pause();
    }
};
```

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
핸들러는 호출이 아닌 이름을 전달하는 것 즉 handleClick() 처럼 쓰는게 아님
이렇게 하면 호출 안해도 실행되버림



> **jsx 문법 참고**  
> ? 는 참일때 실행할 코드, : 는 거짓일 때 실행할 코드

---



## 04/15


**비교 연산자 및 화살표 함수 :** 자바 ==와 ===의 차이 및 화살표 함수 문법 확인할것 (===는 타입까지 비교함)  
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
