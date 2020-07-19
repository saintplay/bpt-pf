import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Input, Form } from "antd";

import axios from "axios";
import get from "lodash.get";

import { USER_ID } from "../lib/constants";
import { LIST_ORIGIN_ACCESS } from "../lib/endpoints";

const SearchUserPage = ({ onSuccess }) => {
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
        onSuccess(origins);
      }
    } catch (err) {
      console.error(err);
      setSearching(false);
      setErrorSearching("Hubo un error interno. ¡Inténtalo en unos momentos!");
    }
  };

  return (
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
        <Button
          type="primary"
          htmlType="submit"
          size="small"
          loading={searching}
        >
          Buscar
        </Button>
        {errorSearching && <div className="text-red">{errorSearching}</div>}
      </Form.Item>
    </Form>
  );
};

SearchUserPage.propTypes = {
  onSuccess: PropTypes.func,
};
SearchUserPage.defaultProps = {
  onSuccess: () => {},
};

export default SearchUserPage;
