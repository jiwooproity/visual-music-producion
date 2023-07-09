interface ButtonPropsType {
  className: string;
  name: string;
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = (props: ButtonPropsType) => {
  const { className, name, label } = props;
  const { onClick } = props;

  return (
    <button className={className} name={name} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
