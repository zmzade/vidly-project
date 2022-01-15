import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  // const lastIndex = pageNumber * pageSize;
  // return items.slice(startIndex, lastIndex);
  return _(items).slice(startIndex).take(pageSize).value();
}
