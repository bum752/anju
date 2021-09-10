import { Button, Col, Layout, Popover, Row, Tag, Typography } from 'antd';
import Map from './Map';
import Store from './Store';
import Filter from './Filter';
import cookingMethodCode from '../constants/cookingMethodCode';
import ingredientCode from '../constants/ingredientCode';
import sourceCode from '../constants/sourceCode';
import { useRecoilState } from 'recoil';
import { cookingMethodFilter, ingredientFilter, sourceFilter } from '../state/filterState';
import { selectedStoreState } from '../state/storeState';
import { storeSiderComponentCollapseState } from '../state/componentState';

const { Header, Content, Sider } = Layout;
const { Text } = Typography;

const Home = () => {
  const [selectedCookingMethodFilter] = useRecoilState(cookingMethodFilter);
  const [selectedIngredientFilter] = useRecoilState(ingredientFilter);
  const [selectedSourceFilter] = useRecoilState(sourceFilter);
  const [selectedStore] = useRecoilState(selectedStoreState);
  const [storeComponentCollapse, setStoreComponentCollapse] = useRecoilState(storeSiderComponentCollapseState);

  return (
    <>
      <Layout>
        <Header style={{ display: 'table' }}>
          <Row>
            <Col md={{ span: 4 }} sm={{ span: 24 }}>
              <Text style={{ color: 'white' }}>ㅇㄴㅇㅈㅁㄱ, 오늘안주머고?</Text>
            </Col>
            <Col md={{ span: 8, offset: 8 }} sm={{ span: 24 }} style={{ color: 'white' }}>
              {selectedCookingMethodFilter.map((cookingMethod, index) => {
                return (
                  <Tag color="geekblue" key={index}>
                    {cookingMethodCode[cookingMethod].description}
                  </Tag>
                );
              })}

              {selectedIngredientFilter.map((ingredient, index) => {
                return (
                  <Tag color="green" key={index}>
                    {ingredientCode[ingredient].description}
                  </Tag>
                );
              })}

              {selectedSourceFilter.map((source, index) => {
                return (
                  <Tag color="volcano" key={index}>
                    {sourceCode[source].description}
                  </Tag>
                );
              })}
            </Col>
            <Col md={{ span: 4 }} sm={{ span: 24 }}>
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
    </>
  );
};

export default Home;
