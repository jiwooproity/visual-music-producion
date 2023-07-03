interface DefaultButtonPropsType {
  className: string;
  label?: string;
  data: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const DefaultButton = ({
  className,
  label,
  data,
  onClick,
}: DefaultButtonPropsType) => {
  return (
    <button className={className} data-type={data} onClick={onClick}>
      {label}
    </button>
  );
};

export default DefaultButton;

DefaultButton.defaultProps = {
  label: "",
};
