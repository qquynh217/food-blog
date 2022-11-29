import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout';
import { publicRoutes } from './routes'
import { useDispatch } from 'react-redux';
import { userLogin } from './store/userSlice'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const storeUser = JSON.parse(localStorage.getItem('user'))
    if (storeUser) {
      dispatch(userLogin(storeUser))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {publicRoutes.map((route, id) => {
            const Layout = route.layout || MainLayout
            const Comp = route.component
            return (
              <Route key={id} path={route.path} element={<Layout><Comp /></Layout>} />
            )
          })}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
