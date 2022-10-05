import { Home, Signup,Signin,ProductScreen } from './Exports';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Home />}/>
          <Route path='/product/:id' element={<ProductScreen />}/>
          <Route path='/signin' element={<Signin />}/>
          <Route path='/signup' element={<Signup />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
