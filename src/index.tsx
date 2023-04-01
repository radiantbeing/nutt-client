import ReactDOM from "react-dom/client";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import Fonts from "./fonts";
import theme from "./theme";
import "./styles/index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  // Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import Root from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import Welcome from "./pages/Welcome";
import Index from "./pages/Index";
import SignUp from "./pages/SignUp";
// import { useAuth } from "./hooks/useAuth";
import SignIn from "./pages/SignIn";
import UserInfoForm from "./pages/BasicInfoForm";
import HealthGoalForm from "./pages/HealthGoalForm";
import { ActivityEstimationForm } from "./pages/ActivityEstimationForm";
import RecommendedIntake from "./pages/RecommendedIntake";
import Home from "./pages/Home";

// function PrivateRoute({ element, ...rest }: { element: React.ReactElement }) {
//   const { isAuthenticated } = useAuth();

//   return (
//     <Route
//       {...rest}
//       element={isAuthenticated ? element : <Navigate to="/login" />}
//     />
//   );
// }

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
      <Route errorElement={<ErrorPage />}>
        <Route index element={<Index />} />
        <Route path="welcome" element={<Welcome />} />
        <Route path="join" element={<SignUp />} />
        <Route path="join/userInfo" element={<UserInfoForm />} />
        <Route path="join/healthGoal" element={<HealthGoalForm />} />
        <Route path="join/activity" element={<ActivityEstimationForm />} />
        <Route path="join/intake" element={<RecommendedIntake />} />
        <Route path="home" element={<Home />} />
        <Route path="login" element={<SignIn />} />
      </Route>
    </Route>
  )
);

const root = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(
  <ChakraProvider theme={theme}>
    <Fonts />
    <RouterProvider router={router} />
  </ChakraProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
