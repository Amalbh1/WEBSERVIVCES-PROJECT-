import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./context/privetRoute";
import DashboardLayout from "./pages/DashboardLayout";
import ProtectedRoute from "./context/protectedRoute";
import UsageHistory from "./pages/UsageHistory";
import Profile from "./pages/Profile";
import PredictDataUsage from "./pages/PredictDataUsage";
import Security from "./pages/Security";
import CreationAccount from "./pages/CreationAccount";
import UserMangement from "./pages/UserMangement";
import AdminRoutes from "./context/AdminRoute";
function App() {
  return (
    <div>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<SignIn />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/usagehistory" element={<UsageHistory />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/security" element={<Security />} />
            <Route path="/predictdatausage" element={<PredictDataUsage />} />

            <Route path="/admin/register" element={<CreationAccount />} />
            <Route path="/admin/mangeuser" element={<UserMangement />} />
          </Route>
        </Route>
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
