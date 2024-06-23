import "./SheetButton.css";
import { LucideIcon } from "lucide-react";

type SheetButtonProps = {
  Icon: LucideIcon;
  text: string;
  onPress?: () => void;
};
const SheetButton = ({ Icon, text, onPress }: SheetButtonProps) => {
  return (
    <div className="SheetButton" role="button" onClick={onPress}>
      <Icon size={24} />
      <div className="sheet-button-text">{text}</div>
    </div>
  );
};

export default SheetButton;
