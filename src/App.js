import React, { useState } from "react";

import { Layout } from "antd";

import OriginListPage from "./pages/OriginListPage";
import SearchUserPage from "./pages/SearchUserPage";

const { Content, Header, Footer } = Layout;

const HEADER_HEIGHT = 64;
const FOOTER_HEIGHT = 70;

const App = () => {
  const [page, setPage] = useState(1);

  const [userSess, setUserSess] = useState({
    User: "xchohermenegildo",
    Token: "11.8839813279919",
  });
  const [origins, setOrigins] = useState([
    {
      origen_acceso_id: 52,
      tipo_acceso: "MAC-DESK",
      valor_acceso: "D4-C9-EF-D5-9C-11",
      codigo_estado: "1",
      usuario_actualizacion: 1,
      usuario_login_actualizacion: "admin",
      fecha_actualizacion: "2018-05-16 00:00:00",
    },
    {
      origen_acceso_id: 53,
      tipo_acceso: "MAC-DESKA",
      valor_acceso: "D4-C9-EF-D5-9C-12",
      codigo_estado: "3",
      usuario_actualizacion: 4,
      usuario_login_actualizacion: "admin",
      fecha_actualizacion: "2018-05-16 00:00:00",
    },
  ]);

  const onSearchUserSuccess = (_userSess, _origins) => {
    setUserSess(_userSess);
    setOrigins(_origins);
    setPage(1);
  };

  // Using a plane state instead of react-router because this is a prototype
  const getCurrentPage = () => {
    if (page === 0 || !userSess)
      return (
        <SearchUserPage onSuccess={onSearchUserSuccess} userSess={userSess} />
      );
    if (page === 1)
      return (
        <OriginListPage
          userSess={userSess}
          origins={origins}
          onGoBack={() => setPage(0)}
        />
      );
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
        {getCurrentPage()}
      </Content>
      <Footer className="text-center">Made by Diego Jara</Footer>
    </Layout>
  );
};

export default App;
