import { Checkbox, Col, Input, Row } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import {
  cookingMethodFilterState,
  cookingMethodFilterOptionsState,
  ingredientSearchKeywordState,
  sauceFilterState,
  sauceFilterOptionsState,
} from '../state/filterState';
import { filterOption } from '../types/filter';

const Filter = () => {
  const cookingMethodFilterOptions = useRecoilValueLoadable(cookingMethodFilterOptionsState);
  const sauceFilterOptions = useRecoilValueLoadable(sauceFilterOptionsState);
  const [ingredientNameSearchKeyword, setIngredientNameSearchKeyword] = useRecoilState(ingredientSearchKeywordState);
  const [, setSelectedCookingMethodFilter] = useRecoilState(cookingMethodFilterState);
  const [, setSelectedSauceFilter] = useRecoilState(sauceFilterState);

  const ingredientNameInputHandler = (event: React.FormEvent<HTMLInputElement>): void => {
    setIngredientNameSearchKeyword(event.currentTarget.value);
  };

  const cookingMethodOptionSelectHandler = (values: CheckboxValueType[]): void => {
    setSelectedCookingMethodFilter([...(values as number[])]);
  };

  const sauceOptionSelectHandler = (values: CheckboxValueType[]): void => {
    setSelectedSauceFilter([...(values as number[])]);
  };

  const optionsComponent = (options: filterOption[]) => {
    return options.map((option, index) => {
      return (
        <Row key={index}>
          <Col>
            <Checkbox value={option.id}>{option.name}</Checkbox>
          </Col>
        </Row>
      );
    });
  };

  return (
    <>
      <Row>
        <Col>
          <Input placeholder={'재료를 검색해 봐!'} value={ingredientNameSearchKeyword} onChange={ingredientNameInputHandler} />
        </Col>
      </Row>
      <Row>
        <Col span={8}>조리법</Col>
        <Col>
          <Checkbox.Group name={'cookingMethods'} onChange={cookingMethodOptionSelectHandler}>
            {cookingMethodFilterOptions.state === 'hasValue' && optionsComponent(cookingMethodFilterOptions.contents)}
          </Checkbox.Group>
        </Col>
      </Row>
      <Row>
        <Col span={8}>소스</Col>
        <Col>
          <Checkbox.Group onChange={sauceOptionSelectHandler}>
            {sauceFilterOptions.state === 'hasValue' && optionsComponent(sauceFilterOptions.contents)}
          </Checkbox.Group>
        </Col>
      </Row>
    </>
  );
};

export default Filter;
