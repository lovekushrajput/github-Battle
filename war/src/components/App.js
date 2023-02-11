import { Route, Routes } from 'react-router-dom'
import Battle from './Battle'
import Popular from './Popular'
import Header from './Header'

function App() {
    return (
        <div className='container'>

            <Header />
            <Routes>
                <Route path='/' element={<Popular />} />
                <Route path='/battle' element={<Battle />} />
            </Routes>
        </div>
    )
}
export default App


