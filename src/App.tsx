import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ToastContainer from './components/ToastContainer';
import { useToast } from './hooks/useToast';
import LandingPage from './pages/LandingPage';
import CompaniesPage from './pages/CompaniesPage';
import AboutPage from './pages/AboutPage';
import SubmitReviewPage from './pages/SubmitReviewPage';
import CompanyProfilePage from './pages/CompanyProfilePage';
import RequestCompanyPage from './pages/RequestCompanyPage';
import CompanyRequestedPage from './pages/CompanyRequestedPage';
import AdminCompanyRequestsPage from './pages/AdminCompanyRequestsPage';
import NotificationPage from './pages/NotificationPage';

export const ToastContext = React.createContext<ReturnType<typeof useToast> | null>(null);

function App() {
  const toast = useToast();

  return (
    <ToastContext.Provider value={toast}>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/submit-review" element={<SubmitReviewPage />} />
              <Route path="/request-company" element={<RequestCompanyPage />} />
              <Route path="/company-requested" element={<CompanyRequestedPage />} />
              <Route path="/admin/company-requests" element={<AdminCompanyRequestsPage />} />
              <Route path="/notification/:token" element={<NotificationPage />} />
              <Route path="/company/:companyId" element={<CompanyProfilePage />} />
              <Route path="/companies" element={<CompaniesPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </div>
          <Footer />
          <ToastContainer toasts={toast.toasts} onClose={toast.removeToast} />
        </div>
      </Router>
    </ToastContext.Provider>
  );
}

export default App;