export default interface IModal {
  open: boolean;
  onOK?: () => void;
  onCancel: () => void;
  className?: string;
  style?: React.CSSProperties;
  title?: string | React.ReactNode;
  footer?: boolean | React.ReactNode;
  children: React.ReactNode;
  centered?: boolean;
  closable?: boolean;
  width?: number | string;
  cancelText?: string | React.ReactNode;
  okText?: string | React.ReactNode;
  cancelStyle?: React.CSSProperties;
  okStyle?: React.CSSProperties;
}
