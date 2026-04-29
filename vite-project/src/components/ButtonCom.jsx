import style from "./ButtonCom.module.css"

function handleClick () {
    alert("버튼 클릭");
}

export default function ButtonCom() {
    return (
        <>
            <h1 className={style.title}>ButtonTitle</h1>
            <nav className={style.navBar}> 
                <button onClick={handleClick} className={style.btn}>
                    버튼1
                </button>

                <button onClick={handleClick} className={style.btn}>
                    버튼2
                </button>
            </nav>
        </>
    )
}