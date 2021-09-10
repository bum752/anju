import { CloseCircleOutlined, FlagFilled, FlagOutlined, FlagTwoTone } from '@ant-design/icons';
import { List, Rate, Table, Tag, Typography } from 'antd';
import { useRecoilState, useRecoilValue } from 'recoil';
import cookingMethodCode from '../constants/cookingMethodCode';
import ingredientCode from '../constants/ingredientCode';
import sourceCode from '../constants/sourceCode';
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

  const { name, description, menus, point, visited } = selectedStore || {};

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', cursor: 'pointer' }} onClick={closeStoreComponent}>
        <CloseCircleOutlined style={{ fontSize: '16px' }} />
      </div>

      <Rate disabled value={!!point ? point : 0} />

      <Typography.Title level={2}>
        {visited ? <FlagOutlined /> : <FlagTwoTone twoToneColor={'navy'} />} {name}
      </Typography.Title>

      <p>{description}</p>

      <List
        dataSource={menus}
        renderItem={(item: menu) => (
          <List.Item>
            <List.Item.Meta title={`${item.foodName} (${moneyFormatter(item.price)})`} description={item.characteristic} />
            <Tag color="geekblue">{cookingMethodCode[item.method].description}</Tag>
            <Tag color="green">{ingredientCode[item.ingredient].description}</Tag>
            <Tag color="volcano">{sourceCode[item.base].description}</Tag>
          </List.Item>
        )}
      />
    </>
  );
};

export default Store;