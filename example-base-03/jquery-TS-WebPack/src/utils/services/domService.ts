// src/services/domService.ts
import $ from "jquery";

export const updateDom = (
  nextUrl: { name: string, url: string },
  greetingClass: string,
  contentClass: string,
  jqxhrClass: string
) => {
  $(`.${greetingClass}`).empty().append("Refetching : " + nextUrl.name);
  $(`.${contentClass}`).empty();
  $(`.${jqxhrClass}`).empty();
};

export const displayResponse = (
  data: any,
  jqxhr: any,
  greetingClass: string,
  contentClass: string,
  jqxhrClass: string
) => {
  $(`.${greetingClass}`).append(data.status || "status not received");
  $(`.${contentClass}`).append(JSON.stringify(data, null, 2));
  $(`.${jqxhrClass}`).append(JSON.stringify(jqxhr, null, 2));
};
