import { useState } from 'react';
import Toolbar from './components/Toolbar';

export default function App() {
  const [appData, setAppData] = useState({
    clickCount: 0,
    lastAction: "없음"
  });

  const handlePlay = () => {
    setAppData({
      ...appData,
      clickCount: appData.clickCount + 1,
      lastAction: "동영상 재생"
    });
  };

  const handleUpload = () => {
    setAppData({
      ...appData,
      clickCount: appData.clickCount + 1,
      lastAction: "이미지 업로드"
    });
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
    
      <Toolbar 
        appData={appData} 
        onPlay={handlePlay} 
        onUpload={handleUpload} 
      />
    </div>
  );
}