코드 예상

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
