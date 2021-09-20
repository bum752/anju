import { notification } from 'antd';

notification.open({
  message: '안주를 추천해주세요!',
  description: '🍻 맛있는 안주와 매장을 추천해주세요',
  top: 80,
  onClick: () => window.open('https://docs.google.com/forms/d/e/1FAIpQLSf5z4obW0PQ54-yc-8mflGElytayIenhUl4IZOl5oh_JXZHwg/viewform'),
});

const Suggestion = () => {
  return <></>;
};

export default Suggestion;
