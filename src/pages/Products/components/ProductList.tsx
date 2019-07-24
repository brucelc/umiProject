import { Table, Popconfirm, Button } from 'antd';
import React from 'react';

const ProductList = ({ onDelete, products }: any) => {
  const columns = [
    {
      title: 'userName',
      dataIndex: 'userName',
    },
    {
      title: 'Actions',
      render: (text: string, record: any) => {
        return (
          <Popconfirm title="Delete?" onConfirm={() => onDelete(record.userId)}>
            <Button>Delete</Button>
          </Popconfirm>
        );
      },
    },
  ];
  return <Table dataSource={products} key="userId" columns={columns} />;
};

export default ProductList;
