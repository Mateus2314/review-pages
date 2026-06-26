import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import KeepAlive from './components/KeepAlive';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ReadingsPage from './pages/ReadingsPage';
import ReadingDetailPage from './pages/ReadingDetailPage';
import ReadingFormPage from './pages/ReadingFormPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import BookPage from './pages/BookPage';
import ChapterPage from './pages/ChapterPage';

function App() {
  return (
    <BrowserRouter>
      <KeepAlive />
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/readings" element={<ReadingsPage />} />
          <Route path="/readings/new" element={<ReadingFormPage />} />
          <Route path="/readings/:id" element={<ReadingDetailPage />} />
          <Route path="/readings/:id/edit" element={<ReadingFormPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/books/:id" element={<BookPage />} />
          <Route path="/books/:readingId/chapters/:chapterId" element={<ChapterPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
