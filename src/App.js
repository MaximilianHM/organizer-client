import "./App.css";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

import HomePage from "./pages/HomePage/HomePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";

import CategoryListPage from "./pages/CategoryListPage/CategoryListPage";
import TaskListPage from "./pages/TaskListPage/TaskListPage";
import TaskDetailsPage from "./pages/TaskDetailsPage/TaskDetailsPage";
import EditProfilePage from "./pages/EditProfilePage/EditProfilePage";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/profile"
          element={
            <IsPrivate>
              {" "}
              <ProfilePage />{" "}
            </IsPrivate>
          }
        />

        <Route
          path="/profile/edit"
          element={
            <IsPrivate>
              {" "}
              <EditProfilePage />{" "}
            </IsPrivate>
          }
        />

        <Route
          path="/signup"
          element={
            <IsAnon>
              {" "}
              <SignupPage />{" "}
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              {" "}
              <LoginPage />{" "}
            </IsAnon>
          }
        />

        <Route
          path="/categories"
          element={
            <IsPrivate>
              <CategoryListPage />
            </IsPrivate>
          }
        />

        <Route
          path="/categories/:categoryId"
          element={
            <IsPrivate>
              <TaskListPage />
            </IsPrivate>
          }
        />

        <Route
          path="/tasks/:taskId"
          element={
            <IsPrivate>
              <TaskDetailsPage />
            </IsPrivate>
          }
        />

        <Route
          path="*"
          element={
            <IsPrivate>
              <ErrorPage />
            </IsPrivate>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
