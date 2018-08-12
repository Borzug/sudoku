export interface Props {
    value: number;
    cellIndex: number;
    isFocused: boolean;
    isBlocked: boolean;
    selectCell: (cellIndex: number) => void;
}
