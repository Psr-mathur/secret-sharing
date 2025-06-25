'use client';
import React from 'react';
import MUIDataTable, { type MUIDataTableColumnDef, type MUIDataTableProps } from 'mui-datatables';
import dayjs from 'dayjs';
import type { Secret } from '@prisma/client';
import { ActionsColumn } from './actions-column';
import CopyLink from './link-with-copy';
import { Lock, LockOpen } from '@mui/icons-material';

interface SecretTableProps {
  data: Secret[];
  options?: MUIDataTableProps['options'];
}

export const SecretTable: React.FC<SecretTableProps> = ({ data, options }) => {

  const columns: MUIDataTableColumnDef[] = [
    {
      name: 'content',
      label: 'Content',
      options: {
        customBodyRender: (value) => (
          <div
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: 300,
            }}
          >
            {value}
          </div>
        ),
      },
    },
    {
      name: 'key',
      label: 'Link',
      options: {
        filter: false, sort: true,
        customBodyRender: (value) => (
          <CopyLink
            url={`${window.location.origin}/view/${value}`}
          />
        )
      },
    },
    {
      name: 'expiresAt',
      label: 'Expires At',
      options: {
        customBodyRender: (value: Date | null) => {
          if (value) {
            return dayjs(value).format('YYYY-MM-DD HH:mm A');
          }
          return dayjs().format('YYYY-MM-DD HH:mm A');
        }
      },
    },
    {
      name: 'password',
      label: 'Protected',
      options: {
        customBodyRender: (value) => {
          if (value) {
            return <Lock />
          } else {
            return <LockOpen />
          }
        },
      },
    },
    {
      name: 'views',
      label: 'Viewed',
      options: {
        customBodyRender: (value) => value > 0 ? 'Yes' : 'No',
      },
    },
    {
      name: 'actions',
      label: 'Actions',
      options: {
        filter: false,
        sort: false,
        customBodyRenderLite: (dataIndex) => (
          <ActionsColumn data={data[dataIndex]!} />
        )
      }
    }
  ];

  const defaultOptions: MUIDataTableProps['options'] = {
    selectableRows: 'none' as const,
    responsive: 'standard' as const,
    rowsPerPage: 10,
    elevation: 2,
    print: false,
    download: false,
    filter: false,
    viewColumns: false,
    tableBodyHeight: 'calc(100vh - 348px)',
    ...options
  };

  return (
    <MUIDataTable
      title="Secrets"
      data={data}
      columns={columns}
      options={defaultOptions}
    />
  );
};