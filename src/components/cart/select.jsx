const Select = (props) => {
  const { title, disableSelected, options, children } = props;
  return (
    <div>
      <p className="font-semibold mb-5">{title}</p>
      <select className="select select-primary w-full max-w-full mb-2">
        <option disabled selected>
          {disableSelected}
        </option>
        {options.map((option, index) => (
          <option key={index}>{option}</option>
        ))}
      </select>
      {children}
    </div>
  );
};
export default Select;
