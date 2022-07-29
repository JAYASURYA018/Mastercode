import * as React from "react";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { useStateWithCallbackLazy } from "use-state-with-callback";

const GridPaging = (props: any) => {
  const currentPage = Math.floor(props.skip / props.take) + 1;
  const totalPages = Math.ceil((props.total || 0) / props.take);
  const [pageCount, setCount] = useStateWithCallbackLazy(1);
  const [takeCount, setTake] = React.useState(props.take);
  console.log("takecount", takeCount);
  const pageChange = (event: any, action: any) => {
    if (action == "previous") {
      setCount(
        pageCount - 1 == 0 ? pageCount : pageCount - 1,
        (currentCount: any) => {
          props.onPageChange({
            skip: (currentCount - 1) * props.take,
            take: props.take,
            syntheticEvent: event,
            nativeEvent: event.nativeEvent,
            target: event.target,
          });
        }
      );
    } else {
      setCount(
        pageCount + 1 > totalPages ? pageCount : pageCount + 1,
        (currentCount: any) => {
          props.onPageChange({
            skip: (currentCount - 1) * props.take,
            take: props.take,
            syntheticEvent: event,
            nativeEvent: event.nativeEvent,
            target: event.target,
          });
        }
      );
    }
  };

  const takeChange = (event: any) => {
    setTake(event.value);
    props.onPageChange({
      skip: props.skip,
      take: event.value,
      syntheticEvent: event,
      nativeEvent: event.nativeEvent,
      target: event.target,
    });
  };

  return (
    <div
      className={props.className}
      style={{ borderTop: "1px solid", borderTopColor: "inherit" }}
    >
      <div className="row grid-pagination">
        <div className="col-md-8 pl-24 ">
          {`${
            currentPage == 1
              ? props.total == 0
                ? 0
                : props.skip + 1
              : props.skip + 1
          }-${
            props.skip + props.take < props.total
              ? props.skip + props.take
              : props.total
          } of ${props.total}`}
        </div>
        <div className="col-md-4 text-right">
          <DropDownList
            data={props.pageSizes}
            value={takeCount}
            onChange={takeChange}
          />
          <span> per page</span>
          <button
            type="button"
            className="border-0"
            id="Grid-Previous"
            name="Grid-Previous"
            onClick={(event) => pageChange(event, "previous")}
          >
            <i className="icon-page-left" title="Previous"></i>
          </button>
          <span>{` ${currentPage} of ${totalPages}`}</span>
          <button
            type="button"
            className="border-0"
            id="Grid-Next"
            name="Grid-Next"
            onClick={(event) => pageChange(event, "next")}
          >
            <i className="icon-page-right" title="Next"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GridPaging;
