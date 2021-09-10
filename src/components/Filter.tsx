import { Checkbox, Col, Row } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { useRecoilState } from 'recoil';
import cookingMethodCode from '../constants/cookingMethodCode';
import ingredientCode from '../constants/ingredientCode';
import sourceCode from '../constants/sourceCode';
import { cookingMethodFilter, ingredientFilter, sourceFilter } from '../state/filterState';

const Filter = () => {
  const [, setSelectedCookingMethodFilter] = useRecoilState(cookingMethodFilter);
  const [, setSelectedIngredientFilter] = useRecoilState(ingredientFilter);
  const [, setSelectedSourceFilter] = useRecoilState(sourceFilter);

  const cookingMethodOptions = Object.keys(cookingMethodCode).map((key) => {
    return { label: cookingMethodCode[key].description, value: key };
  });

  const ingredientOptions = Object.keys(ingredientCode).map((key) => {
    return { label: ingredientCode[key].description, value: key };
  });

  const sourceOptions = Object.keys(sourceCode).map((key) => {
    return { label: sourceCode[key].description, value: key };
  });

  const cookingMethodOptionSelectHandler = (values: CheckboxValueType[]): void => {
    setSelectedCookingMethodFilter([...(values as string[])]);
  };

  const IngredientOptionSelectHandler = (values: CheckboxValueType[]): void => {
    setSelectedIngredientFilter([...(values as string[])]);
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
        <Col span={8}>조리법</Col>
        <Col>
          <Checkbox.Group name={'cookingMethods'} onChange={cookingMethodOptionSelectHandler}>
            {optionsComponent(cookingMethodOptions)}
          </Checkbox.Group>
        </Col>
      </Row>
      <Row>
        <Col span={8}>재료</Col>
        <Col>
          <Checkbox.Group onChange={IngredientOptionSelectHandler}>{optionsComponent(ingredientOptions)}</Checkbox.Group>
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
