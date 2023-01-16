import PropTypes from 'prop-types';

export const Filter = ({ value, onChange }) => (
  <label>
    Find contacts by name <input value={value} onChange={onChange} />
  </label>
);

Filter.propTypes = {
  // onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
