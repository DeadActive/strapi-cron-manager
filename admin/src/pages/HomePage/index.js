/*
 *
 * HomePage
 *
 */

import React, { memo } from "react";
// import PropTypes from 'prop-types';
import pluginName from "../../pluginName";

import { Main } from "@strapi/design-system/Main";
import {
  Layout,
  HeaderLayout,
  ContentLayout,
} from "@strapi/design-system/Layout";
import { Table, Thead, Tbody, Tr, Td, Th } from "@strapi/design-system/Table";
import { Typography } from "@strapi/design-system/Typography";
import pluginId from "../../pluginId";
import { request } from "@strapi/helper-plugin";
import { Button } from "@strapi/design-system/Button";
import { useEffect, useState } from "react";
import moment from "moment";

const fetchData = async () => {
  try {
    let endpoint = `/${pluginId}/`;

    const data = await request(endpoint, { method: "GET" });

    return data;
  } catch (err) {
    console.error(err);
  }
};

const runCron = async (id) => {
  try {
    let endpoint = `/${pluginId}/run/${id}`;

    const data = await request(endpoint, { method: "POST" });

    return data;
  } catch (err) {
    console.error(err);
  }
};

const HomePage = () => {
  const headers = [
    {
      name: "cron",
      key: "cron",
      metadatas: {
        label: "Cron",
        sortable: false,
      },
    },
    {
      name: "nextRun",
      key: "nextRun",
      metadatas: {
        label: "Next Run",
        sortable: false,
      },
    },
    {
      name: "action",
      key: "action",
      metadatas: {
        label: "Action",
        sortable: false,
      },
    },
  ];

  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetchData().then((data) => {
      setRows(data);
    });
  }, []);

  return (
    <Main>
      <HeaderLayout title={pluginName}></HeaderLayout>
      <ContentLayout>
        <Table colCount={headers.length} rowCount={rows.length}>
          <Thead>
            <Tr>
              {headers.map((h) => (
                <Th>
                  <Typography varian="sigma" textColor="neutral600">
                    {h.metadatas.label}
                  </Typography>
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {rows &&
              rows.map((r) => (
                <Tr key={r.id}>
                  <Td>
                    <Typography textColor="neutral800">{r.cron}</Typography>
                  </Td>
                  <Td>
                    <Typography textColor="neutral800">
                      {moment(r.nextRun).format("DD.MM.YYYY HH:mm:ss")}
                    </Typography>
                  </Td>
                  <Td>
                    <Button size="s" onClick={() => runCron(r.id)}>
                      Run
                    </Button>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </ContentLayout>
    </Main>
  );
};

export default memo(HomePage);
