// styleで使用する定数を管理する
export const BUTTON = {
  primary: {
    color: 'rgb(255, 255, 255)',
    bg: 'rgb(234, 53, 45)',
    border: 'rgb(234, 53, 45)'
  },
  secondary: {
    color: 'rgb(0,0,0)',
    bg: '#ff0'
  },
  disabled: {
    color: '#fff',
    bg: '#ccc'
  }
} as const;

export const COLOR = {
  link: '#f60',
  emphasis: '#ff0',
  border: '#ccc',
  current: '#fb7f77',
  text: '#222'
};

export const DEVICE = {
  mobile: `(max-width: 760px)`
};
