import React, { useState } from "react";

import { Layout } from "antd";

import OriginListPage from "./pages/OriginListPage";
import SearchUserPage from "./pages/SearchUserPage";

const { Content, Header, Footer } = Layout;

const HEADER_HEIGHT = 64;
const FOOTER_HEIGHT = 70;

const App = () => {
  // Using a plan state instead of react-router because this is a prototype
  const [page, setPage] = useState(0);

  const [origins, setOrigins] = useState([]);

  const onSearchUserSuccess = (_origins) => {
    setOrigins(_origins);
    setPage(1);
  };

  return (
    <Layout>
      <Header style={{ height: HEADER_HEIGHT }}>
        <div className="text-white text-center">Bluepoint Prueba</div>
      </Header>
      <Content
        className="p-4"
        style={{
          minHeight: `calc(100vh - ${HEADER_HEIGHT + FOOTER_HEIGHT}px)`,
        }}
      >
        {page === 0 && <SearchUserPage onSuccess={onSearchUserSuccess} />}
        {page === 1 && (
          <OriginListPage origins={origins} onGoBack={() => setPage(0)} />
        )}
      </Content>
      <Footer className="text-center">Made by Diego Jara</Footer>
    </Layout>
  );
};

export default App;
