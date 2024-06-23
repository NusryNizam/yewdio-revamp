import "./Button.css";

type ButtonProps = {
  text: string;
  className?: string;
};
const Button = ({ text, className }: ButtonProps) => {
  return <button className={className}>{text}</button>;
};

export default Button;
