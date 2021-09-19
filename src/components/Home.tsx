import { Affix, Badge, Button, Col, Layout, Popover, Row, Tag, Typography } from 'antd';
import Map from './Map';
import Store from './Store';
import Filter from './Filter';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { cookingMethodFilter, cookingMethodFilterOptionsState, ingredientSearchKeyword, sauceFilter, sauceFilterOptionsState } from '../state/filterState';
import { selectedStoreState } from '../state/storeState';
import { storeSiderComponentCollapseState } from '../state/componentState';
import { FilterOutlined } from '@ant-design/icons';

const { Header, Content, Sider } = Layout;
const { Text } = Typography;

const Home = () => {
  const cookingMethodFilterOptions = useRecoilValueLoadable(cookingMethodFilterOptionsState);
  const sauceFilterOptions = useRecoilValueLoadable(sauceFilterOptionsState);
  const [selectedCookingMethodFilter] = useRecoilState(cookingMethodFilter);
  const [enteredIngredientSearchKeyword] = useRecoilState(ingredientSearchKeyword);
  const [selectedSauceFilter] = useRecoilState(sauceFilter);
  const [selectedStore] = useRecoilState(selectedStoreState);
  const [storeComponentCollapse, setStoreComponentCollapse] = useRecoilState(storeSiderComponentCollapseState);

  const selectedTotalFiltersCount = enteredIngredientSearchKeyword ? 1 : 0 + selectedCookingMethodFilter.length + selectedSauceFilter.length;

  return (
    <>
      <Layout>
        <Header style={{ display: 'table' }}>
          <Row>
            <Col md={{ span: 4 }} sm={{ span: 24 }}>
              <Text style={{ color: 'white' }}>ㅇㄴㅇㅈㅁㄱ, 오늘안주머고?</Text>
            </Col>
            <Col md={{ span: 8, offset: 8 }} xs={{ span: 0 }} style={{ color: 'white' }}>
              {enteredIngredientSearchKeyword && <Tag color="green">{enteredIngredientSearchKeyword}</Tag>}

              {selectedCookingMethodFilter.map((cookingMethod, index) => {
                return (
                  <Tag color="geekblue" key={index}>
                    {cookingMethodFilterOptions.state === 'hasValue' &&
                      cookingMethodFilterOptions.contents.filter((option) => option.key === cookingMethod)[0].value}
                  </Tag>
                );
              })}

              {selectedSauceFilter.map((sauce, index) => {
                return (
                  <Tag color="volcano" key={index}>
                    {sauceFilterOptions.state === 'hasValue' && sauceFilterOptions.contents.filter((option) => option.key === sauce)[0].value}
                  </Tag>
                );
              })}
            </Col>
            <Col md={{ span: 4 }} xs={{ span: 0 }}>
              <Popover placement="bottomRight" title="어떤 안주가 땡기니?" content={<Filter />}>
                <Button>어떤 안주가 땡기니?</Button>
              </Popover>
            </Col>
          </Row>
        </Header>
        <Layout>
          <Sider
            collapsible
            collapsed={storeComponentCollapse}
            collapsedWidth={0}
            onCollapse={() => {
              !storeComponentCollapse && setStoreComponentCollapse(!storeComponentCollapse);
            }}
            reverseArrow={true}
            width={'40vmax'}
            theme={'light'}
            style={!storeComponentCollapse ? { padding: 30 } : {}}
          >
            {selectedStore && <Store />}
          </Sider>
          <Content>
            <Map height={window.innerHeight - 64} />
          </Content>
        </Layout>
      </Layout>

      <Affix offsetBottom={20} style={{ position: 'absolute', right: '20px' }}>
        <Badge count={selectedTotalFiltersCount} color={'cyan'}>
          <Popover placement="bottomRight" title="어떤 안주가 땡기니?" content={<Filter />} trigger={['hover', 'click']}>
            <Button type={'ghost'} ghost={true} shape={'circle'} icon={<FilterOutlined />} style={{ background: 'navy' }} />
          </Popover>
        </Badge>
      </Affix>
    </>
  );
};

export default Home;
