import { DetailedHTMLProps, TdHTMLAttributes } from "react";
import TableCell from "./TableCell";

type TableCellReactProps = DetailedHTMLProps<
  TdHTMLAttributes<HTMLTableCellElement>,
  HTMLTableCellElement
>
export interface TablePaginationProps extends TableCellReactProps{

}
export default function TablePagination({}:TablePaginationProps) {
    return (<TableCell>
        <div className="flex relative items-center "><p className="my-4">Rows per page:</p></div>)
        </TableCell>
}