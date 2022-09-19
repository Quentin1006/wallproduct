import { observer } from "mobx-react-lite";
import { Fragment, useEffect, useRef, useState } from "react";

import type { FilterRecord } from "../../typings";

type FilterProps = {
  filters: FilterRecord;
  updateFilter: (filterName: string, state: string) => void;
};

// Mieux de faire des type spécifiques RadioFilter, InputFilter etc...
export const Filters = observer(({ filters, updateFilter }: FilterProps) => {
  const [focused, setFocused] = useState(0);
  const itemsRef = useRef([] as any);

  useEffect(() => {
    itemsRef.current[focused].focus();
  }, [focused]);

  return (
    <div style={{ margin: "10px 20px" }}>
      {Object.values(filters).map((filter, idx) => {
        switch (filter.type) {
          case "input":
          default:
            return (
              <Fragment key={filter.label}>
                <label htmlFor={filter.label}>{filter.label} : </label>
                <input
                  name={filter.label}
                  type="text"
                  value={filter.state}
                  ref={(el) => (itemsRef.current[idx] = el)}
                  onChange={(e) => {
                    setFocused(idx);
                    updateFilter(filter.label, e.target.value);
                  }}
                />
              </Fragment>
            );
        }
      })}
    </div>
  );
});
