import { useAppSelector } from "../app/hooks";
import { selectSettings } from "../features/settings/settingSlice";
import "./SheetButton.css";
import { LucideIcon } from "lucide-react";

type SheetButtonProps = {
  Icon: LucideIcon;
  text: string;
  onPress?: () => void;
};
const SheetButton = ({ Icon, text, onPress }: SheetButtonProps) => {
  const { isLightTheme } = useAppSelector(selectSettings);

  return (
    <div className="SheetButton" role="button" onClick={onPress}>
      <Icon size={24} color={isLightTheme ? "black" : "white"} />
      <div className="sheet-button-text">{text}</div>
    </div>
  );
};

export default SheetButton;
