import {Dispatch, SetStateAction} from "react";
import "./SelectableSearch.css";

export interface SelectableSearchProps {
  search: string
  setSearch: Dispatch<SetStateAction<string>>
  placeholder?: string
  style?: string
}

const SelectableSearch = (props: SelectableSearchProps) => {
  const {search, setSearch, placeholder, style} = props;
  const placeholderText = placeholder ?? "搜索词缀（提示：可粘贴正则表达式）";
  const className = "selectable-search-input " + (style ? style : "")
  return (
    <div className="selectable-search-layout">
      <input
        className={className}
        value={search}
        type="search"
        placeholder={placeholderText}
        onChange={(v) => setSearch(v.target.value)}
      />
    </div>
  )
}

export default SelectableSearch;