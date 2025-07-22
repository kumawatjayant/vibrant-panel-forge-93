
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import EnquiryPage from "./pages/EnquiryPage";
import UserLoginPage from "./pages/UserLoginPage";
import NotFound from "./pages/NotFound";
import { StudentViewPage } from "./components/admin/StudentViewPage";
import { StudentEditPage } from "./components/admin/StudentEditPage";
import { StudentAddPage } from "./components/admin/StudentAddPage";
import { CourseViewPage } from "./components/admin/CourseViewPage";
import { CourseAddPage } from "./components/admin/CourseAddPage";
import { AddEnquiryForm } from "./components/admin/AddEnquiryForm";
import { UserAddPage } from "./components/admin/UserAddPage";
import { UserViewPage } from "./components/admin/UserViewPage";
import { UserEditPage } from "./components/admin/UserEditPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/enquiry" element={<EnquiryPage />} />
          <Route path="/login" element={<UserLoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/student/view/:id" element={<StudentViewPage />} />
          <Route path="/admin/student/edit/:id" element={<StudentEditPage />} />
          <Route path="/admin/student/add" element={<StudentAddPage />} />
          <Route path="/admin/course/view/:id" element={<CourseViewPage />} />
          <Route path="/admin/course/add" element={<CourseAddPage />} />
          <Route path="/admin/enquiry/add" element={<AddEnquiryForm />} />
          <Route path="/admin/user/add" element={<UserAddPage />} />
          <Route path="/admin/user/view/:id" element={<UserViewPage />} />
          <Route path="/admin/user/edit/:id" element={<UserEditPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
