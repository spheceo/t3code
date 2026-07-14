/**
 * Hugeicons free stroke shim for former lucide-react imports.
 * Sidebar toggle uses LayoutAlignLeftIcon (also mapped from PanelLeft*).
 */
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import {
  AlertTriangle as _AlertTriangle,
  ArchiveIcon as _ArchiveIcon,
  ArchiveX as _ArchiveX,
  ArrowDown as _ArrowDown,
  ArrowLeft as _ArrowLeft,
  ArrowRight as _ArrowRight,
  ArrowUp as _ArrowUp,
  ArrowUpDownIcon as _ArrowUpDownIcon,
  BotIcon as _BotIcon,
  BugIcon as _BugIcon,
  Camera as _Camera,
  CheckIcon as _CheckIcon,
  ChevronDownIcon as _ChevronDownIcon,
  ChevronLeftIcon as _ChevronLeftIcon,
  ChevronRight as _ChevronRight,
  ChevronRightIcon as _ChevronRightIcon,
  ChevronUpIcon as _ChevronUpIcon,
  ChevronsLeftRight as _ChevronsLeftRight,
  ChevronsUpDown as _ChevronsUpDown,
  CircleAlert as _CircleAlert,
  CircleArrowUp as _CircleArrowUp,
  CircleCheck as _CircleCheck,
  CircleX as _CircleX,
  ClipboardList as _ClipboardList,
  CloudIcon as _CloudIcon,
  CloudUpload as _CloudUpload,
  Code as _Code,
  Columns2 as _Columns2,
  ContainerIcon as _ContainerIcon,
  CopyIcon as _CopyIcon,
  CornerLeftUp as _CornerLeftUp,
  DownloadIcon as _DownloadIcon,
  EllipsisIcon as _EllipsisIcon,
  NoteEditIcon as _NoteEditIcon,
  ExternalLink as _ExternalLink,
  Eye as _Eye,
  EyeOffIcon as _EyeOffIcon,
  File as _File,
  FileDiffIcon as _FileDiffIcon,
  FileIcon as _FileIcon,
  Files as _Files,
  Flask as _Flask,
  Folder as _Folder,
  FolderGitIcon as _FolderGitIcon,
  FolderIcon as _FolderIcon,
  FolderOpenIcon as _FolderOpenIcon,
  FolderPlus as _FolderPlus,
  FolderTreeIcon as _FolderTreeIcon,
  Frame as _Frame,
  GitBranchIcon as _GitBranchIcon,
  GitBranchPlusIcon as _GitBranchPlusIcon,
  GitCommitIcon as _GitCommitIcon,
  GitPullRequestIcon as _GitPullRequestIcon,
  Globe as _Globe,
  GlobeIcon as _GlobeIcon,
  Hammer as _Hammer,
  Info as _Info,
  KeyboardIcon as _KeyboardIcon,
  LayoutAlignLeftIcon as _LayoutAlignLeftIcon,
  Link2 as _Link2,
  LinkIcon as _LinkIcon,
  ListChecks as _ListChecks,
  ListTodo as _ListTodo,
  Loader as _Loader,
  LockIcon as _LockIcon,
  LockOpen as _LockOpen,
  LogIn as _LogIn,
  Maximize2 as _Maximize2,
  MessageCircle as _MessageCircle,
  MessageSquare as _MessageSquare,
  Minimize2 as _Minimize2,
  Minus as _Minus,
  Monitor as _Monitor,
  MoreVerticalIcon as _MoreVerticalIcon,
  MousePointer as _MousePointer,
  MousePointerClick as _MousePointerClick,
  Paintbrush as _Paintbrush,
  PanelBottom as _PanelBottom,
  PanelRight as _PanelRight,
  PenLine as _PenLine,
  PencilRulerIcon as _PencilRulerIcon,
  Pilcrow as _Pilcrow,
  Pipette as _Pipette,
  Play as _Play,
  Plus as _Plus,
  QrCodeIcon as _QrCodeIcon,
  Radio as _Radio,
  RefreshCw as _RefreshCw,
  RotateCcw as _RotateCcw,
  RotateCw as _RotateCw,
  Rows3 as _Rows3,
  SearchIcon as _SearchIcon,
  Settings2 as _Settings2,
  SettingsIcon as _SettingsIcon,
  Smartphone as _Smartphone,
  Sparkles as _Sparkles,
  SquarePen as _SquarePen,
  StarIcon as _StarIcon,
  TableColumnsSplitIcon as _TableColumnsSplitIcon,
  TableRowsSplitIcon as _TableRowsSplitIcon,
  TerminalIcon as _TerminalIcon,
  TextWrapIcon as _TextWrapIcon,
  Trash2 as _Trash2,
  Undo2 as _Undo2,
  WifiOffIcon as _WifiOffIcon,
  WrenchIcon as _WrenchIcon,
  X as _X,
  ZapIcon as _ZapIcon,
} from "@hugeicons/core-free-icons";
import { type ComponentProps, type CSSProperties } from "react";

export type LucideProps = ComponentProps<"svg"> & {
  size?: number | string;
};

// Compatible with both lucide-style callers and custom SVG `Icon` components.
export type LucideIcon = (props: LucideProps) => React.ReactElement;

function createIcon(icon: IconSvgElement, displayName: string): LucideIcon {
  function HugeiconLucide({
    className,
    size = 24,
    color = "currentColor",
    strokeWidth,
    style,
  }: LucideProps) {
    const resolvedStroke =
      typeof strokeWidth === "number"
        ? strokeWidth
        : typeof strokeWidth === "string"
          ? Number.parseFloat(strokeWidth) || 1.5
          : 1.5;
    return (
      <HugeiconsIcon
        icon={icon}
        size={size}
        color={color ?? "currentColor"}
        strokeWidth={resolvedStroke}
        className={className}
        style={{ flexShrink: 0, ...style } as CSSProperties}
      />
    );
  }
  HugeiconLucide.displayName = displayName;
  return HugeiconLucide;
}

export const AlertTriangleIcon = createIcon(_AlertTriangle, "AlertTriangleIcon");
export const ArchiveIcon = createIcon(_ArchiveIcon, "ArchiveIcon");
export const ArchiveX = createIcon(_ArchiveX, "ArchiveX");
export const ArrowDownIcon = createIcon(_ArrowDown, "ArrowDownIcon");
export const ArrowLeft = createIcon(_ArrowLeft, "ArrowLeft");
export const ArrowLeftIcon = createIcon(_ArrowLeft, "ArrowLeftIcon");
export const ArrowRight = createIcon(_ArrowRight, "ArrowRight");
export const ArrowRightIcon = createIcon(_ArrowRight, "ArrowRightIcon");
export const ArrowUpCircleIcon = createIcon(_CircleArrowUp, "ArrowUpCircleIcon");
export const ArrowUpDownIcon = createIcon(_ArrowUpDownIcon, "ArrowUpDownIcon");
export const ArrowUpIcon = createIcon(_ArrowUp, "ArrowUpIcon");
export const BotIcon = createIcon(_BotIcon, "BotIcon");
export const BugIcon = createIcon(_BugIcon, "BugIcon");
export const Camera = createIcon(_Camera, "Camera");
export const CheckIcon = createIcon(_CheckIcon, "CheckIcon");
export const ChevronDownIcon = createIcon(_ChevronDownIcon, "ChevronDownIcon");
export const ChevronLeftIcon = createIcon(_ChevronLeftIcon, "ChevronLeftIcon");
export const ChevronRight = createIcon(_ChevronRight, "ChevronRight");
export const ChevronRightIcon = createIcon(_ChevronRightIcon, "ChevronRightIcon");
export const ChevronsLeftRightEllipsisIcon = createIcon(_ChevronsLeftRight, "ChevronsLeftRightEllipsisIcon");
export const ChevronsUpDownIcon = createIcon(_ChevronsUpDown, "ChevronsUpDownIcon");
export const ChevronUpIcon = createIcon(_ChevronUpIcon, "ChevronUpIcon");
export const CircleAlertIcon = createIcon(_CircleAlert, "CircleAlertIcon");
export const CircleCheckIcon = createIcon(_CircleCheck, "CircleCheckIcon");
export const CircleXIcon = createIcon(_CircleX, "CircleXIcon");
export const ClipboardList = createIcon(_ClipboardList, "ClipboardList");
export const CloudIcon = createIcon(_CloudIcon, "CloudIcon");
export const CloudUploadIcon = createIcon(_CloudUpload, "CloudUploadIcon");
export const Code2 = createIcon(_Code, "Code2");
export const Columns2Icon = createIcon(_Columns2, "Columns2Icon");
export const ContainerIcon = createIcon(_ContainerIcon, "ContainerIcon");
export const CopyIcon = createIcon(_CopyIcon, "CopyIcon");
export const CornerLeftUpIcon = createIcon(_CornerLeftUp, "CornerLeftUpIcon");
export const DownloadIcon = createIcon(_DownloadIcon, "DownloadIcon");
export const EllipsisIcon = createIcon(_EllipsisIcon, "EllipsisIcon");
export const NoteEditIcon = createIcon(_NoteEditIcon, "NoteEditIcon");
export const ExternalLink = createIcon(_ExternalLink, "ExternalLink");
export const ExternalLinkIcon = createIcon(_ExternalLink, "ExternalLinkIcon");
export const Eye = createIcon(_Eye, "Eye");
export const EyeIcon = createIcon(_Eye, "EyeIcon");
export const EyeOffIcon = createIcon(_EyeOffIcon, "EyeOffIcon");
export const FileDiff = createIcon(_FileDiffIcon, "FileDiff");
export const FileIcon = createIcon(_FileIcon, "FileIcon");
export const FileJsonIcon = createIcon(_File, "FileJsonIcon");
export const Files = createIcon(_Files, "Files");
export const FlaskConicalIcon = createIcon(_Flask, "FlaskConicalIcon");
export const FolderClosedIcon = createIcon(_Folder, "FolderClosedIcon");
export const FolderGit2Icon = createIcon(_FolderGitIcon, "FolderGit2Icon");
export const FolderGitIcon = createIcon(_FolderGitIcon, "FolderGitIcon");
export const FolderIcon = createIcon(_FolderIcon, "FolderIcon");
export const FolderOpenIcon = createIcon(_FolderOpenIcon, "FolderOpenIcon");
export const FolderPlusIcon = createIcon(_FolderPlus, "FolderPlusIcon");
export const FolderTree = createIcon(_FolderTreeIcon, "FolderTree");
export const Frame = createIcon(_Frame, "Frame");
export const GitBranchIcon = createIcon(_GitBranchIcon, "GitBranchIcon");
export const GitBranchPlusIcon = createIcon(_GitBranchPlusIcon, "GitBranchPlusIcon");
export const GitCommitIcon = createIcon(_GitCommitIcon, "GitCommitIcon");
export const GitPullRequestIcon = createIcon(_GitPullRequestIcon, "GitPullRequestIcon");
export const Globe = createIcon(_Globe, "Globe");
export const Globe2 = createIcon(_Globe, "Globe2");
export const Globe2Icon = createIcon(_Globe, "Globe2Icon");
export const GlobeIcon = createIcon(_GlobeIcon, "GlobeIcon");
export const HammerIcon = createIcon(_Hammer, "HammerIcon");
export const InfoIcon = createIcon(_Info, "InfoIcon");
export const KeyboardIcon = createIcon(_KeyboardIcon, "KeyboardIcon");
export const LayoutAlignLeftIcon = createIcon(_LayoutAlignLeftIcon, "LayoutAlignLeftIcon");
export const Link2 = createIcon(_Link2, "Link2");
export const Link2Icon = createIcon(_Link2, "Link2Icon");
export const LinkIcon = createIcon(_LinkIcon, "LinkIcon");
export const ListChecksIcon = createIcon(_ListChecks, "ListChecksIcon");
export const ListTodoIcon = createIcon(_ListTodo, "ListTodoIcon");
export const Loader2Icon = createIcon(_Loader, "Loader2Icon");
export const LoaderCircle = createIcon(_Loader, "LoaderCircle");
export const LoaderCircleIcon = createIcon(_Loader, "LoaderCircleIcon");
export const LoaderIcon = createIcon(_Loader, "LoaderIcon");
export const LockIcon = createIcon(_LockIcon, "LockIcon");
export const LockOpenIcon = createIcon(_LockOpen, "LockOpenIcon");
export const LogInIcon = createIcon(_LogIn, "LogInIcon");
export const Maximize2Icon = createIcon(_Maximize2, "Maximize2Icon");
export const MessageCircle = createIcon(_MessageCircle, "MessageCircle");
export const MessageCircleIcon = createIcon(_MessageCircle, "MessageCircleIcon");
export const MessageSquareIcon = createIcon(_MessageSquare, "MessageSquareIcon");
export const Minimize2Icon = createIcon(_Minimize2, "Minimize2Icon");
export const Minus = createIcon(_Minus, "Minus");
export const MinusIcon = createIcon(_Minus, "MinusIcon");
export const MonitorIcon = createIcon(_Monitor, "MonitorIcon");
export const MoreVertical = createIcon(_MoreVerticalIcon, "MoreVertical");
export const MousePointer2 = createIcon(_MousePointer, "MousePointer2");
export const MousePointerClick = createIcon(_MousePointerClick, "MousePointerClick");
export const MousePointerClickIcon = createIcon(_MousePointerClick, "MousePointerClickIcon");
export const Paintbrush = createIcon(_Paintbrush, "Paintbrush");
export const PaintbrushIcon = createIcon(_Paintbrush, "PaintbrushIcon");
export const PanelBottomIcon = createIcon(_PanelBottom, "PanelBottomIcon");
export const PanelLeftCloseIcon = createIcon(_LayoutAlignLeftIcon, "PanelLeftCloseIcon");
export const PanelLeftIcon = createIcon(_LayoutAlignLeftIcon, "PanelLeftIcon");
export const PanelRightIcon = createIcon(_PanelRight, "PanelRightIcon");
export const PencilRulerIcon = createIcon(_PencilRulerIcon, "PencilRulerIcon");
export const PenLine = createIcon(_PenLine, "PenLine");
export const PenLineIcon = createIcon(_PenLine, "PenLineIcon");
export const PilcrowIcon = createIcon(_Pilcrow, "PilcrowIcon");
export const PipetteIcon = createIcon(_Pipette, "PipetteIcon");
export const PlayIcon = createIcon(_Play, "PlayIcon");
export const Plus = createIcon(_Plus, "Plus");
export const PlusIcon = createIcon(_Plus, "PlusIcon");
export const QrCodeIcon = createIcon(_QrCodeIcon, "QrCodeIcon");
export const RadioTower = createIcon(_Radio, "RadioTower");
export const RefreshCw = createIcon(_RefreshCw, "RefreshCw");
export const RefreshCwIcon = createIcon(_RefreshCw, "RefreshCwIcon");
export const RotateCcw = createIcon(_RotateCcw, "RotateCcw");
export const RotateCcwIcon = createIcon(_RotateCcw, "RotateCcwIcon");
export const RotateCw = createIcon(_RotateCw, "RotateCw");
export const RotateCwIcon = createIcon(_RotateCw, "RotateCwIcon");
export const Rows3Icon = createIcon(_Rows3, "Rows3Icon");
export const Search = createIcon(_SearchIcon, "Search");
export const SearchIcon = createIcon(_SearchIcon, "SearchIcon");
export const Settings2Icon = createIcon(_Settings2, "Settings2Icon");
export const SettingsIcon = createIcon(_SettingsIcon, "SettingsIcon");
export const SmartphoneIcon = createIcon(_Smartphone, "SmartphoneIcon");
export const SparklesIcon = createIcon(_Sparkles, "SparklesIcon");
export const SquarePenIcon = createIcon(_SquarePen, "SquarePenIcon");
export const SquareSplitHorizontal = createIcon(_TableColumnsSplitIcon, "SquareSplitHorizontal");
export const SquareSplitVertical = createIcon(_TableRowsSplitIcon, "SquareSplitVertical");
export const StarIcon = createIcon(_StarIcon, "StarIcon");
export const TerminalIcon = createIcon(_TerminalIcon, "TerminalIcon");
export const TerminalSquare = createIcon(_TerminalIcon, "TerminalSquare");
export const TextWrapIcon = createIcon(_TextWrapIcon, "TextWrapIcon");
export const Trash2 = createIcon(_Trash2, "Trash2");
export const Trash2Icon = createIcon(_Trash2, "Trash2Icon");
export const TriangleAlertIcon = createIcon(_AlertTriangle, "TriangleAlertIcon");
export const Undo2Icon = createIcon(_Undo2, "Undo2Icon");
export const WifiOffIcon = createIcon(_WifiOffIcon, "WifiOffIcon");
export const WrapTextIcon = createIcon(_TextWrapIcon, "WrapTextIcon");
export const WrenchIcon = createIcon(_WrenchIcon, "WrenchIcon");
export const X = createIcon(_X, "X");
export const XIcon = createIcon(_X, "XIcon");
export const ZapIcon = createIcon(_ZapIcon, "ZapIcon");
