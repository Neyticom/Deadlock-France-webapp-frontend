import { Route, Routes } from "react-router-dom";
import AnimatedBackground from "./layouts/AnimatedBackground/AnimatedBackground";
import './App.scss';
import HomePage from './views/HomePage/HomePage';
import PatchnotesPage from './views/PatchnotesPage/PatchnotesPage';

const App = () => {
  return (
    <div className="app-container">
      <Routes>
        
        {/* Admin routes */}
        <Route path="/admin" element={
          <>

          </>
        }/>

        {/* Public routes */}
        <Route path="/*" element={
          <>
            <AnimatedBackground />
            <Routes>
              {/* Home Page */}
              <Route
                path="/"
                element={
                    <HomePage />
              }/>
              {/* Patchnotes Page */}
              <Route
                path="/patchnotes"
                element={
                    <PatchnotesPage />
              }/>
            </Routes>
          </>
        }/>

      </Routes>
    </div>
  );
}

export default App;