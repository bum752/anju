type code = {
  description: string;
};

const code: { [key: string]: code } = {
  FRY: {
    description: '튀김',
  },
  SOUP: {
    description: '탕',
  },
  STIR: {
    description: '볶음',
  },
};

export default code;
