// src/services/apiService.ts
import $ from "jquery";
import { getNextUrl } from "./urlService";
import { updateDom, displayResponse } from "./domService";

const greetingClass = "greeting-id";
const contentClass = "greeting-content";
const jqxhrClass = "greeting-jqxhr";

export const clickMe = () => {
  const nextUrl = getNextUrl();
  updateDom(nextUrl, greetingClass, contentClass, jqxhrClass);

  $.ajax({
    url: nextUrl.url,
  }).then(function (data, status, jqxhr) {
    displayResponse(data, jqxhr, greetingClass, contentClass, jqxhrClass);
  });
};
