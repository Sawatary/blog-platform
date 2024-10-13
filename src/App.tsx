import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ArticleDetails from "./components/ArticleDetails";
import ArticleList from "./components/ArticleList";
import Layout from "./components/Layout";
import CreateArticle from "./pages/CreateArticle";
import EditProfile from "./pages/EditProfile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="/articles/:slug" element={<ArticleDetails />} />
          <Route index element={<ArticleList />} />
          <Route path="/new-article" element={<CreateArticle />}></Route>
          <Route path="/profile" element={<EditProfile />}></Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
