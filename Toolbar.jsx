import ButtonCom from './ButtonCom';

export default function Toolbar({ appData, onPlay, onUpload }) {
  
  const handleNavClick = () => {
    alert("툴바 배경이 클릭되었습니다!");
  };

  return (
    <div 
      onClick={handleNavClick} 
      style={{ padding: '30px', backgroundColor: 'rgb(170, 243, 243)', border: '1px solid #ccc' }}
    >
      <h2>내 도구 모음 (Toolbar)</h2>
      
      <p>현재 클릭수: {appData.clickCount}</p>
      <p>마지막 동작: {appData.lastAction}</p>

      <div style={{ marginTop: '20px' }}>
        <ButtonCom onAction={onPlay}>동영상 재생</ButtonCom>
        <ButtonCom onAction={onUpload}>이미지 업로드</ButtonCom>
      </div>
    </div>
  );
}