import "./IconButton.css";
import { LucideIcon } from "lucide-react";

type IconButtonProps = {
  Icon: LucideIcon;
  onPress?: () => void;
  size?: number;
  className?: string;
  backgroundColor?: string;
  fill?: string;
  color?: string;
  disabled?: boolean;
};
const IconButton = ({
  Icon,
  onPress,
  size = 24,
  backgroundColor = "",
  fill,
  color,
  disabled = false,
  className = "",
}: IconButtonProps) => {
  return (
    <button
      className={`IconButton ${className}`}
      onClick={onPress}
      style={{ backgroundColor }}
      disabled={disabled}
    >
      <Icon size={size} fill={fill ?? "transparent"} color={color ?? "white"} />
    </button>
  );
};

export default IconButton;
