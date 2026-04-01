import RYU from './components/Gallery'
import {NamedComponent1, NamedComponent2 as N2} from './components/NamedComponent'
// import * as Test from './components/NamedComponent'


export default function App() {
  return (
    <>
      <NamedComponent1 />
      <N2 />
      <RYU />
      {/* <Test.NamedComponent1/> */}
    </>
  )
}


