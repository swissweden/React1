
```jsx
import { useState } from 'react'; 


// import ChildCom from './ChildCom';

export default function App() {

  //  단일 값 State 
  const [count, setCount] = useState(0);

  // 객체 State (폼 데이터나 여러 값을 하나로 묶을 때 사용) [1]
  const [dataObj, setDataObj] = useState({
    field1: "초기값",
    field2: 0,
  });

  //  배열 State (map, filter를 이용한 리스트 렌더링용) [2]
  const [listData, setListData] = useState([
    { id: 1, text: "항목1", power: 100 },
    { id: 2, text: "항목2", power: 90 }
  ]);


  // ==========================================
  // 2. [이벤트 핸들러 함수 공간] - 이름은 handle~ 로 시작 [2]
  // ==========================================

  // (1) 일반 버튼 클릭 핸들러 (버블링 제어 포함) [3]
  const handleAction = (e) => {
    e.stopPropagation(); // 부모 태그로 클릭 이벤트가 전파되는 것 방지 [3]
    setCount(count + 1); // 상태 업데이트
  };

  // (2) 입력창(Input) 변경 시 객체 State 업데이트 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataObj({
      ...dataObj, // 기존 객체 복사
      [name]: value // 변경된 부분만 덮어쓰기
    });
  };

  // (3) 리스트(배열) 상태 업데이트 핸들러 (특정 항목 삭제 등) [2]
  const handleItemDelete = (targetId) => {
    // targetId와 다른 것만 남겨서 새로운 배열 생성
    const newList = listData.filter(item => item.id !== targetId);
    setListData(newList);
  };


  // ==========================================
  // 3. [화면 렌더링(Return) 공간] - JSX 문법 주의
  // ==========================================
  return (
    // 최상위 태그는 하나로 묶어야 함 (div 또는 프래그먼트 <>) [5]
    <div style={{ padding: '20px', border: '2px solid #ccc' }}>

      {/* 변수 출력은 단일 중괄호 사용 */}
      <p>현재 카운트: {count}</p>
      <p>객체 값 확인: {dataObj.field1}</p>

      {/* 이벤트 전달은 괄호() 없이 이름만! */}
      <button onClick={handleAction}>기본 동작 버튼</button>

      {/* 하위 컴포넌트로 Props 전달 예시 (주석 해제 후 사용) */}
      {/* <ChildCom info={dataObj} onAction={handleAction}>버튼이름</ChildCom> */}

      <hr />

      {/* 배열 map 렌더링 예시 (고유 key값 필수!) [5] */}
      <h3>리스트 출력 영역</h3>
      <ul>
        {listData.map((item) => (
          <li key={item.id}>
            {item.text} (전투력: {item.power})
            <button onClick={() => handleItemDelete(item.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```


```jsx

import { useState } from 'react'; // Hook은 반드시 최상위에서 임포트 [3]

export default function App() {
  // 1. State 선언: 두 숫자와 결과값을 관리 [3, 4]
  // 폼 필드처럼 하나의 객체로 묶어서 관리하는 방식 적용 (개별로 나누어도 정답입니다)
  const [calcData, setCalcData] = useState({
    num1: 0,
    num2: 0,
    result: 0,
  });

  // 2. 입력값 변경 이벤트 핸들러 (관례에 따라 handle로 시작) [5]
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCalcData({
      ...calcData,
      [name]: Number(value), // 입력값을 숫자로 변환하여 업데이트
    });
  };

  // 3. 사칙연산 이벤트 핸들러 [5]
  // 순수 함수일 필요 없이, State 변경 등의 부수 효과(Side Effect)를 수행하기 좋은 위치입니다 [8].
  const handleCalculate = (operator) => {
    let calculatedResult = 0;
    if (operator === '+') calculatedResult = calcData.num1 + calcData.num2;
    if (operator === '-') calculatedResult = calcData.num1 - calcData.num2;
    if (operator === '*') calculatedResult = calcData.num1 * calcData.num2;
    if (operator === '/') calculatedResult = calcData.num1 / calcData.num2;

    setCalcData({
      ...calcData,
      result: calculatedResult,
    });
  };

  return (
    // JSX 내에서 인라인 스타일은 객체 형태인 이중 중괄호 {{ }} 사용 [6, 7]
    <div>
      <h1>간단한 리액트 계산기</h1>
      
      <div>
        <input
          type="number"
          name="num1"
          value={calcData.num1}
          onChange={handleInputChange} // 함수 이름만 전달! 호출( () ) 금지 [5]
        />
        <span style={{ margin: '0 10px' }}>?</span>
        <input
          type="number"
          name="num2"
          value={calcData.num2}
          onChange={handleInputChange}
        />
      </div>

      <div>
        {/* 매개변수를 넘겨야 할 경우, 익명 화살표 함수로 감싸서 전달해야 즉시 실행을 막을 수 있음 [5] */}
        <button onClick={() => handleCalculate('+')}>더하기 (+)</button>
        <button onClick={() => handleCalculate('-')}>빼기 (-)</button>
        <button onClick={() => handleCalculate('*')}>곱하기 (*)</button>
        <button onClick={() => handleCalculate('/')}>나누기 (/)</button>
      </div>

      {/* 변수를 화면에 렌더링할 때는 중괄호 { } 사용 [6] */}
      <h2 style={{ marginTop: '20px', color: 'royalblue' }}>
        결과: {calcData.result}
      </h2>
    </div>
  );
}
```
