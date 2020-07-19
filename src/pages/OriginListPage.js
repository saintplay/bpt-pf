import React, { useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { Input, Button, Table, PageHeader } from "antd";

import { ACCESS_VALUE_KEY, ACCES_ID_KEY } from "../lib/constants";
import useArrayState from "../hooks/useArrayState";

const INPUT_MAX_WIDTH = 220;

const OriginListPage = ({
  userSess,
  origins,
  updatingOrigins,
  onUpdateAccessValue,
  onGoBack,
}) => {
  const [
    dirtyAccessValues,
    setDirtyAccessValues,
    setDirtyAccessValue,
  ] = useArrayState(origins.map((o) => o[ACCESS_VALUE_KEY]));

  // Clean dirty values if origins change gracefully
  useEffect(() => {
    setDirtyAccessValues(origins.map((o) => o[ACCESS_VALUE_KEY]));
  }, [origins, setDirtyAccessValues]);

  const hasNoData = !origins.length;

  const columns = useMemo(() => {
    if (hasNoData) return [];

    const [firstEntry] = origins;
    return Object.keys(firstEntry).map((key) => {
      const baseColumn = { title: key, dataIndex: key, key };
      if (key === ACCESS_VALUE_KEY) {
        return {
          ...baseColumn,
          render: (_, record, index) => (
            <div className="flex items-center">
              <Input
                value={dirtyAccessValues[index]}
                placeholder="Token"
                style={{ maxWidth: INPUT_MAX_WIDTH }}
                onChange={(e) => setDirtyAccessValue(index, e.target.value)}
              />
              <div className="px-1">&nbsp;</div>
              <Button
                type="primary"
                size="small"
                loading={updatingOrigins[index]}
                disabled={
                  dirtyAccessValues[index] === origins[index][ACCESS_VALUE_KEY]
                }
                onClick={() =>
                  onUpdateAccessValue(dirtyAccessValues[index], index)
                }
              >
                Actualizar
              </Button>
            </div>
          ),
        };
      }
      return baseColumn;
    });
    // Many of these functions are not triggering computations
    // Just used for eslint/rules-of-hooks
  }, [
    hasNoData,
    origins,
    dirtyAccessValues,
    updatingOrigins,
    setDirtyAccessValue,
    onUpdateAccessValue,
  ]);

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
  updatingOrigins: PropTypes.array,
  onUpdateAccessValue: PropTypes.func,
  onGoBack: PropTypes.func,
};
OriginListPage.defaultProps = {
  origins: [],
  updatingOrigins: [],
  onUpdateAccessValue: () => {},
  onGoBack: () => {},
};

export default OriginListPage;
