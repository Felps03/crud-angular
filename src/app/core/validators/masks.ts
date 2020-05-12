const patternsAndMasks = {
  cpf: {
    pattern: [ /[0-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/ ],
    msg: 'O CPF fornecido é inválido',
    status: false,
  },
  date: {
    pattern: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
    msg: 'A data fornecida é inválida',
    status: false,
  },
  cellphone: {
    pattern: [ '(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/ ],
    msg: 'O celular fornecido é inválido',
    status: false,
  },
  text: {
    pattern: (s) => Array.from(s).map(() => /^[a-zA-Z\u00C0-\u00FF-\s-']*$/i),
    msg: 'A mensagem fornecida é inválida',
    status: false
  },
};

export default patternsAndMasks;
