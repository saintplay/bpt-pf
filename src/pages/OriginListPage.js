import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Input, Button, Table, PageHeader } from "antd";

import { ACCESS_VALUE_KEY, ACCES_ID_KEY } from "../lib/constants";

const OriginListPage = ({ origins, onGoBack }) => {
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
            <div className="flex">
              <Input
                value={access_value}
                placeholder="Token"
                style={{ maxWidth: 220 }}
              />
              <div className="px-1">&nbsp;</div>
              <Button type="primary" onClick={() => null}>
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
      <PageHeader className="px-0" onBack={onGoBack} subTitle="Regresar" />
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
  origins: PropTypes.array,
  onGoBack: PropTypes.func,
};
OriginListPage.defaultProps = {
  origins: [],
  onGoBack: () => {},
};

export default OriginListPage;
