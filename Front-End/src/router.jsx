import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "./store/authStore";

// Global Components
import App from "./App";
import FloatingShape from "./components/FloatingShape";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

// Auth Pages (Updated paths based on your RegisterLoginPage folder)
import LoginPage from "./pages/RegisterLoginPage/login";
import SignUpPage from "./pages/RegisterLoginPage/register";
import VerifyEmailPage from "./pages/RegisterLoginPage/verifyemail";
import ForgotPasswordPage from "./pages/RegisterLoginPage/forgotpassword";
import ResetPasswordPage from "./pages/RegisterLoginPage/resetpassword";

// Main App Pages
import Home from "./pages/Homepage/home";
import About from "./pages/Aboutpage/about";
import Apod from "./pages/Explorepage/APOD/apod";
import Library from "./pages/Explorepage/ImageVideo/imagevideo";
import LibraryDetail from "./pages/Explorepage/ImageVideo/imagevideodetail";
import Planets from "./pages/Explorepage/Planets/planets";
import Stars from "./pages/Explorepage/Stars/stars";
import Personal from "./pages/Learnings/personal";
import PersonalCreate from "./pages/Learnings/personal_create";
import PersonalEdit from "./pages/Learnings/personal_edit";
import Profile from "./pages/Profilepage/profile";

// --- AUTH GUARDS ---
const ProtectedRoute = () => {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/userlogin" replace />;
  if (!user?.isVerified) return <Navigate to="/userverifyemail" replace />;
  return <Outlet />;
};

const RedirectAuthenticatedUser = () => {
  const { isAuthenticated, user } = useAuthStore();
  if (isAuthenticated && user?.isVerified)
    return <Navigate to="/home" replace />;
  return <Outlet />;
};

// --- LAYOUTS ---
// Only this layout has the Floating Shapes
const AuthLayout = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 bg-sky-500 flex items-center justify-center relative overflow-hidden">
    <FloatingShape
      color="bg-teal-200"
      size="w-64 h-64"
      top="-5%"
      left="10%"
      delay={0}
    />
    <FloatingShape
      color="bg-info-500"
      size="w-48 h-48"
      top="70%"
      left="80%"
      delay={5}
    />
    <FloatingShape
      color="bg-cyan-500"
      size="w-32 h-32"
      top="40%"
      left="-10%"
      delay={2}
    />
    <Outlet />
  </div>
);

// This layout has the Navbar and Footer
const MainLayout = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="grow min-h-250 bg-black">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // 1. AUTHENTICATION ROUTES (Shapes, no Navbar)
      {
        element: <RedirectAuthenticatedUser />,
        children: [
          {
            element: <AuthLayout />,
            children: [
              { path: "userlogin", element: <LoginPage /> },
              { path: "userregister", element: <SignUpPage /> },
              { path: "userforgotpassword", element: <ForgotPasswordPage /> },
              {
                path: "userresetpassword/:token",
                element: <ResetPasswordPage />,
              },
            ],
          },
        ],
      },
      { path: "userverifyemail", element: <VerifyEmailPage /> },

      // 2. PROTECTED APP ROUTES (Navbar, no Shapes)
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <MainLayout />,
            children: [
              { index: true, element: <Navigate to="/home" replace /> },
              { path: "home", element: <Home /> },
              { path: "about", element: <About /> },
              { path: "apod", element: <Apod /> },
              { path: "imagevideo", element: <Library /> },
              { path: "imagevideodetail/:id", element: <LibraryDetail /> },
              { path: "planets", element: <Planets /> },
              { path: "stars", element: <Stars /> },
              { path: "personal", element: <Personal /> },
              { path: "personal/create", element: <PersonalCreate /> },
              { path: "personal/edit/:id", element: <PersonalEdit /> },
              { path: "profile", element: <Profile /> },
            ],
          },
        ],
      },

      // 3. CATCH-ALL
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);
