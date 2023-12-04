const Select = (props) => {
  const { title, disableSelected, option, children, data } = props;
  return (
    <div>
      <p className="font-semibold mb-5">{title}</p>
      <select className="select select-primary w-full max-w-full mb-2">
        <option disabled selected>
          {disableSelected}
        </option>
        {data.map((option) => (
          <option value={option.id}>{option.value}</option>
        ))}
      </select>
      {children}
    </div>
  );
};
export default Select;
