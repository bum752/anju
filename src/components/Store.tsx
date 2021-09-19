import { CloseCircleOutlined, FlagOutlined, FlagTwoTone } from '@ant-design/icons';
import { List, Rate, Tag, Typography } from 'antd';
import { useRecoilState } from 'recoil';
import moneyFormatter from '../formatters/moneyFormatter';
import { storeSiderComponentCollapseState } from '../state/componentState';
import { selectedStoreState } from '../state/storeState';
import { menu } from '../types/store';

const Store = () => {
  const [selectedStore, setSelectedStore] = useRecoilState(selectedStoreState);
  const [, setStoreComponentCollapse] = useRecoilState(storeSiderComponentCollapseState);

  const closeStoreComponent = () => {
    setSelectedStore(null);
    setStoreComponentCollapse(true);
  };

  const { name, description, address, menus, point, visited } = selectedStore || {};

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', cursor: 'pointer' }} onClick={closeStoreComponent}>
        <CloseCircleOutlined style={{ fontSize: '16px' }} />
      </div>

      <Rate disabled value={!!point ? point : 0} />

      <Typography.Title level={2}>
        {visited ? <FlagOutlined /> : <FlagTwoTone twoToneColor={'navy'} />} {name}
      </Typography.Title>

      <span>{address}</span>

      <p>{description}</p>

      <List
        dataSource={menus}
        renderItem={(item: menu) => (
          <List.Item>
            <List.Item.Meta title={`${item.name} (${moneyFormatter(item.price)})`} description={item.characteristic} />
            <div style={{ display: 'grid' }}>
              <Tag color="geekblue">{item.method.name}</Tag>

              {item.ingredients.map((ingredient, index) => {
                return (
                  <Tag key={index} color="green">
                    {ingredient.name}
                  </Tag>
                );
              })}

              {item.sauces.map((sauce, index) => {
                return (
                  <Tag key={index} color="volcano">
                    {sauce.name}
                  </Tag>
                );
              })}
            </div>
          </List.Item>
        )}
      />
    </>
  );
};

export default Store;
