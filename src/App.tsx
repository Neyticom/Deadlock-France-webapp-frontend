import { Route, Routes } from "react-router-dom";
import AnimatedBackground from "./layouts/AnimatedBackground/AnimatedBackground";
import './App.scss';
import HomePage from './views/HomePage/HomePage';
import PatchnotesPage from './views/PatchnotesPage/PatchnotesPage';

const App = () => {
  return (
    <div className="app-container">
      <AnimatedBackground />
      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
              <HomePage />
        }/>
        {/* Patchnotes Page */}
        <Route path="/patchnotes/*" element={<PatchnotesPage />}>
        <Route path=":id" element={<PatchnotesPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;