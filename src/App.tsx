import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FileUploadView } from './views/FileUploadView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<FileUploadView />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
