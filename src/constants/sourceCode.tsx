type code = {
  description: string;
  color: string;
};

const code: { [key: string]: code } = {
  SOY_SOURCE: {
    description: '간장',
    color: 'black',
  },
  RED_PEPPER_SOURCE: {
    description: '고추장',
    color: 'red',
  },
};

export default code;
