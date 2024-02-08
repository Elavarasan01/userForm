import './App.css';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import { UserForm } from './UserForm';
import SubmittedForms from './SubmittedForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<UserForm />} />
        <Route path='/submitted' element={<SubmittedForms/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
