type code = {
  description: string;
};

const code: { [key: string]: code } = {
  CHICKEN: {
    description: '닭',
  },
  PORK: {
    description: '돼지',
  },
  BEEF: {
    description: '소',
  },
};

export default code;
