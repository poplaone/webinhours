
export type Message = {
  content: string;
  isUser: boolean;
  timestamp: string;
};

export type ChatSidebarProps = {
  isMaximized?: boolean;
  onToggleMaximize?: () => void;
  onClose?: () => void;
  className?: string;
};
