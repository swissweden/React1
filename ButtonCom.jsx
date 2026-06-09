export default function ButtonCom({ onAction, children }) {

  const handleClick = (e) => {

    e.stopPropagation();
    onAction();
  };

  return (
    <button
      onClick={handleClick} 
      style={{ padding: '10px 40px', margin: '5px', backgroundColor: 'rgb(177, 195, 255)' }}
    >
      {children}
    </button>
  );
}