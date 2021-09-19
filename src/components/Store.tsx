import { CloseCircleOutlined, FlagOutlined, FlagTwoTone } from '@ant-design/icons';
import { List, Rate, Tag, Typography } from 'antd';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import moneyFormatter from '../formatters/moneyFormatter';
import { storeSiderComponentCollapseState } from '../state/componentState';
import { cookingMethodFilterOptionsState, sauceFilterOptionsState } from '../state/filterState';
import { selectedStoreState } from '../state/storeState';
import { menu, ingredient } from '../types/store';

const Store = () => {
  const cookingMethodFilterOptions = useRecoilValueLoadable(cookingMethodFilterOptionsState);
  const sauceFilterOptions = useRecoilValueLoadable(sauceFilterOptionsState);
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
              <Tag color="geekblue">
                {cookingMethodFilterOptions.state === 'hasValue' && cookingMethodFilterOptions.contents.filter((option) => option.key === item.method)[0].value}
              </Tag>
              {item.ingredients.map((ingredient: ingredient, index: number) => {
                return (
                  <Tag key={index} color="green">
                    {ingredient.name}
                  </Tag>
                );
              })}
              <Tag color="volcano">
                {sauceFilterOptions.state === 'hasValue' && sauceFilterOptions.contents.filter((option) => option.key === item.base)[0].value}
              </Tag>
            </div>
          </List.Item>
        )}
      />
    </>
  );
};

export default Store;
