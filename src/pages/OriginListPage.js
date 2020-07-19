import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Input, Button, Table, PageHeader } from "antd";

import { ACCESS_VALUE_KEY, ACCES_ID_KEY } from "../lib/constants";

const INPUT_MAX_WIDTH = 220;

const OriginListPage = ({ userSess, origins, onGoBack }) => {
  const hasNoData = !origins.length;

  const columns = useMemo(() => {
    if (hasNoData) return [];

    const [firstEntry] = origins;
    return Object.keys(firstEntry).map((key) => {
      const baseColumn = { title: key, dataIndex: key, key };
      if (key === ACCESS_VALUE_KEY) {
        return {
          ...baseColumn,
          render: (access_value, record) => (
            <div className="flex items-center">
              <Input
                value={access_value}
                placeholder="Token"
                style={{ maxWidth: INPUT_MAX_WIDTH }}
              />
              <div className="px-1">&nbsp;</div>
              <Button type="primary" size="small" onClick={() => null}>
                Actualizar
              </Button>
            </div>
          ),
        };
      }
      return baseColumn;
    });
  }, [origins, hasNoData]);

  return (
    <div>
      <PageHeader
        className="px-0"
        onBack={onGoBack}
        title={`Sesiones de ${userSess.User}`}
      />
      {!hasNoData && (
        <div>
          <Table
            columns={columns}
            dataSource={origins.map((origin) => ({
              ...origin,
              key: origin[ACCES_ID_KEY],
            }))}
            pagination={false}
          />
        </div>
      )}
    </div>
  );
};

OriginListPage.propTypes = {
  userSess: PropTypes.object.isRequired,
  origins: PropTypes.array,
  onGoBack: PropTypes.func,
};
OriginListPage.defaultProps = {
  origins: [],
  onGoBack: () => {},
};

export default OriginListPage;
