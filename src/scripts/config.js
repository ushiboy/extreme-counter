const config_ = {
  baseURL: undefined
};

export default function config(values = {}) {
  Object.assign(config_, values);
  return Object.assign({}, config_);
}
