import { Checkbox, Col, Input, Row } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { cookingMethodFilter, cookingMethodFilterOptionsState, ingredientSearchKeyword, sourceFilter, sourceFilterOptionsState } from '../state/filterState';
import { filterOption } from '../types/filter';

const Filter = () => {
  const cookingMethodFilterOptions = useRecoilValueLoadable(cookingMethodFilterOptionsState);
  const sourceFilterOptions = useRecoilValueLoadable(sourceFilterOptionsState);
  const [ingredientNameSearchKeyword, setIngredientNameSearchKeyword] = useRecoilState(ingredientSearchKeyword);
  const [, setSelectedCookingMethodFilter] = useRecoilState(cookingMethodFilter);
  const [, setSelectedSourceFilter] = useRecoilState(sourceFilter);

  const ingredientNameInputHandler = (event: React.FormEvent<HTMLInputElement>): void => {
    setIngredientNameSearchKeyword(event.currentTarget.value);
  };

  const cookingMethodOptionSelectHandler = (values: CheckboxValueType[]): void => {
    setSelectedCookingMethodFilter([...(values as string[])]);
  };

  const sourceOptionSelectHandler = (values: CheckboxValueType[]): void => {
    setSelectedSourceFilter([...(values as string[])]);
  };

  const optionsComponent = (options: filterOption[]) => {
    return options.map((option, index) => {
      return (
        <Row key={index}>
          <Col>
            <Checkbox value={option.key}>{option.value}</Checkbox>
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
          <Checkbox.Group onChange={sourceOptionSelectHandler}>
            {sourceFilterOptions.state === 'hasValue' && optionsComponent(sourceFilterOptions.contents)}
          </Checkbox.Group>
        </Col>
      </Row>
    </>
  );
};

export default Filter;
