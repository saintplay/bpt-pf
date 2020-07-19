import React, { useState } from "react";
import { Layout, notification } from "antd";

import axios from "axios";
import get from "lodash.get";

import OriginListPage from "./pages/OriginListPage";
import SearchUserPage from "./pages/SearchUserPage";
import useArrayState from "./hooks/useArrayState";

import { ACCESS_VALUE_KEY, ACCES_ID_KEY, USER_ID } from "./lib/constants";
import { UPDATE_ORIGIN_ACCESS } from "./lib/endpoints";

const { Content, Header, Footer } = Layout;

const HEADER_HEIGHT = 64;
const FOOTER_HEIGHT = 70;

const App = () => {
  const [page, setPage] = useState(0);

  const [userSess, setUserSess] = useState({});
  const [origins, setOrigins, setOrigin] = useArrayState([]);
  const [updatingOrigins, , setUpdatingOrigin] = useArrayState(
    origins.map(() => false)
  );

  const onSearchUserSuccess = (_userSess, _origins) => {
    setUserSess(_userSess);
    setOrigins(_origins);
    setPage(1);
  };

  const onUpdateAccessValue = async (value, index) => {
    if (!userSess || index > origins.length - 1) return;

    setUpdatingOrigin(index, true);
    try {
      const response = await axios.post(UPDATE_ORIGIN_ACCESS, {
        Sess: {
          ...userSess,
          [ACCES_ID_KEY]: origins[index][ACCES_ID_KEY],
          [ACCESS_VALUE_KEY]: value,
          codigo_estado: 1,
          usuario_id: USER_ID,
        },
      });
      setUpdatingOrigin(index, false);

      const error = get(response, "data.ErrorCode", false);
      if (error) {
        notification.error({
          message: "Error",
          description: get(
            response,
            "data.Message",
            "Hubo un error. ¡Inténtalo nuevamente!"
          ),
        });
      } else {
        // TODO: probably should validate success on code=100, needs more info
        notification.success({
          message: "Cambios Guardados",
          description: get(
            response,
            "data.mensaje",
            "Se actualizaron los datos exitosamente"
          ),
        });
        setOrigin(index, { ...origins[index], [ACCESS_VALUE_KEY]: value });
      }
    } catch (err) {
      setUpdatingOrigin(index, false);
      console.error(err);

      notification.error({
        message: "Error",
        description: "No se pudo cambiar el valor del acceso",
      });
    }
  };

  // Using a plane state instead of react-router because this is a prototype
  const getCurrentPage = () => {
    if (page === 0 || !userSess)
      return (
        <SearchUserPage userSess={userSess} onSuccess={onSearchUserSuccess} />
      );
    if (page === 1)
      return (
        <OriginListPage
          userSess={userSess}
          origins={origins}
          updatingOrigins={updatingOrigins}
          onUpdateAccessValue={onUpdateAccessValue}
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
