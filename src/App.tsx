import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ArticleDetails from "./components/ArticleDetails";
import ArticleList from "./components/ArticleList";
import { Paths } from "./config/path";
import { AuthProvider } from "./context/AuthProvider";
import Layout from "./layout/Layout";
import CreateArticle from "./pages/CreateArticle";
import EditArticle from "./pages/EditArticle";
import EditProfile from "./pages/EditProfile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path={Paths.ARTICLE_LIST} element={<Layout />}>
            <Route path={Paths.SIGN_IN} element={<SignIn />} />
            <Route path={Paths.SIGN_UP} element={<SignUp />} />
            <Route index element={<ArticleList />} />
            <Route path={Paths.ARTICLE_DETAILS} element={<ArticleDetails />} />
            <Route path={Paths.NEW_ARTICLE} element={<CreateArticle />} />
            <Route path={Paths.EDIT_PROFILE} element={<EditProfile />} />
            <Route path={Paths.EDIT_ARTICLE} element={<EditArticle />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
