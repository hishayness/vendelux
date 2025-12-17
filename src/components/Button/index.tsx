type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const Button = (props: ButtonProps) => {
  const { type = 'button', onClick, disabled, children, className = '' } = props;

  return <button type={type} onClick={onClick} disabled={disabled} className={`inline-block mt-3 py-3 px-10 bg-blue-600 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400 ${className}`}>{children}</button>;
}

export default Button;