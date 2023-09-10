import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { CadastroPage } from './Pages/CadastroPage/Main'
import TabelaMaterial from './Pages/CadastroPage/tabelas/Material'
import { FormAjuste } from './Pages/Formularios/FormAjuste'
import { AjusteOk } from './Pages/Formularios/FormAjuste/AjusteSucess'
import { FormAssPage } from './Pages/Formularios/FormAssistencial'
import { FormMaterialPage } from './Pages/Formularios/FormMaterial'
import { MainMaterialPage} from './Pages/Formularios/FormMaterial/Main'
import { MainPage } from './Pages/Main'
import { TestePage } from './Pages/Teste/page'
import { ResultadoPage } from './Pages/Teste/Resultado'
import { GlobalStyles } from './Styles/global'

function App() {

  return (
    <>
      <GlobalStyles/>
      <ToastContainer  position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"/>
      <Router>
        <Routes>
          {/* Rota principal que exibe as opçoes de formularios  */}
          <Route path='/' element={<FormAjuste/>}/>
          <Route path='/ajuste/success/:nr_seq_os' element={<AjusteOk/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
