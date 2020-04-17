class Validators {
  value = null;

  constructor(value) {
    this.value = value;
  }

  required() {
    return !(`${(this.value || '')}`.trim() === '');
  }

  min(num) {
    return this.value >= num;
  }
  
  max(num) {
    return this.value <= num;
  }

  minLength(num) {
    return this.value.length >= num;
  }

  maxLength(num) {
    return this.value.length <= num;
  }

  numeric() {
    return !isNaN(this.value);
  }

  email() {
    const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    return !!this.value.match(emailRegex);
  }

  static validate(value, validators) {
    const result = {};
    const validatorObj = new Validators(value);

    Object.keys(validators).forEach((validatorFunction) => {

      if (typeof validatorObj[validatorFunction] === 'function') {

        const param = validators[validatorFunction];

        result[validatorFunction] = validatorObj[validatorFunction](param);

      }
      
    });

    return result;
  }
}

const result = Validators.validate('hola', {
  required: true,
  numeric: true,
  min: 5,
  max: 10,
  email: true,
  minLength: 0,
  maxLength: 100,
});