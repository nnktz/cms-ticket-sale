export interface ISearch {
  classNames?: string;
  placeholder?: string;
  name: string;
  value: string;
  iconSuffix: React.ReactNode;
  style?: React.CSSProperties;
  onChange?: (value: any) => void;
}
