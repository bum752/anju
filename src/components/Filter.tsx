import { Checkbox, Col, Input, Row } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { useRecoilState } from 'recoil';
import cookingMethodCode from '../constants/cookingMethodCode';
import sourceCode from '../constants/sourceCode';
import { cookingMethodFilter, ingredientSearchKeyword, sourceFilter } from '../state/filterState';

const Filter = () => {
  const [ingredientNameSearchKeyword, setIngredientNameSearchKeyword] = useRecoilState(ingredientSearchKeyword);
  const [, setSelectedCookingMethodFilter] = useRecoilState(cookingMethodFilter);
  const [, setSelectedSourceFilter] = useRecoilState(sourceFilter);

  const cookingMethodOptions = Object.keys(cookingMethodCode).map((key) => {
    return { label: cookingMethodCode[key].description, value: key };
  });

  const sourceOptions = Object.keys(sourceCode).map((key) => {
    return { label: sourceCode[key].description, value: key };
  });

  const ingredientNameInputHandler = (event: React.FormEvent<HTMLInputElement>): void => {
    setIngredientNameSearchKeyword(event.currentTarget.value);
  };

  const cookingMethodOptionSelectHandler = (values: CheckboxValueType[]): void => {
    setSelectedCookingMethodFilter([...(values as string[])]);
  };

  const sourceOptionSelectHandler = (values: CheckboxValueType[]): void => {
    setSelectedSourceFilter([...(values as string[])]);
  };

  const optionsComponent = (options: { label: string; value: string }[]) => {
    return options.map((option, index) => {
      return (
        <Row key={index}>
          <Col>
            <Checkbox value={option.value}>{option.label}</Checkbox>
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
            {optionsComponent(cookingMethodOptions)}
          </Checkbox.Group>
        </Col>
      </Row>
      <Row>
        <Col span={8}>소스</Col>
        <Col>
          <Checkbox.Group onChange={sourceOptionSelectHandler}>{optionsComponent(sourceOptions)}</Checkbox.Group>
        </Col>
      </Row>
    </>
  );
};

export default Filter;
