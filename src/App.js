import React, { useState } from "react";
import axios from "axios";
import get from "lodash.get";
import { Button, Input, Layout, Form } from "antd";

import { LIST_ORIGIN_ACCESS } from "./lib/endpoints";
import { USER_ID } from "./lib/constants";

const { Content, Header, Footer } = Layout;

const HEADER_HEIGHT = 64;
const FOOTER_HEIGHT = 70;

const App = () => {
  const [form] = Form.useForm();
  const [searching, setSearching] = useState(false);
  const [errorSearching, setErrorSearching] = useState(false);

  const onFinish = async (values) => {
    setSearching(true);
    setErrorSearching(false);
    try {
      const response = await axios.post(LIST_ORIGIN_ACCESS, {
        Sess: {
          ...values,
          usuario_id: USER_ID,
        },
      });
      setSearching(false);
      const error = get(response, "data.ErrorCode", false);

      if (error) {
        setErrorSearching(
          get(response, "data.Message", "Hubo un error. ¡Inténtalo nuevamente!")
        );
      } else {
        const data = get(response, "data.data", []);
        const origins = get(data, "[0].origen_acceso", []);

        if (!data || !data.length || !origins || !origins.length) {
          setErrorSearching("¡El usuario no tiene registros!");
        }
        console.log(origins);
      }
    } catch (err) {
      console.error(err);
      setSearching(false);
      setErrorSearching(true);
    }
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
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Usuario"
            name="User"
            rules={[{ required: true, message: "¡Ingresa el usuario!" }]}
          >
            <Input placeholder="Usuario" />
          </Form.Item>
          <Form.Item
            label="Token"
            name="Token"
            rules={[{ required: true, message: "¡Ingresa el token!" }]}
          >
            <Input type="number" placeholder="Token" />
          </Form.Item>
          <Form.Item shouldUpdate={true}>
            <Button type="primary" htmlType="submit" loading={searching}>
              Buscar
            </Button>
            {errorSearching && <div className="text-red">{errorSearching}</div>}
          </Form.Item>
        </Form>
      </Content>
      <Footer className="text-center">Made by Diego Jara</Footer>
    </Layout>
  );
};

export default App;
