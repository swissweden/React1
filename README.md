# React1

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
파스칼 케이스
카멜 케이스
