import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ArticleDetails from "./components/ArticlePrew/ArticleDetails";
import ArticleList from "./components/ArticleList/ArticleList";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="signIn" element={<SignIn />} />
          <Route path="signUp" element={<SignUp />} />
          <Route path="ArtDet" element={<ArticleDetails />} />
          <Route index element={<ArticleList />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
