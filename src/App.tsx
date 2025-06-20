import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './views/HomePage';
import { AddPokemon } from './views/AddPokemon';
import { AddType } from './views/AddType';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route
          path="/pokemon"
          element={<AddPokemon />}
        />
        <Route
          path="/type"
          element={<AddType />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
