// src/main.ts
import $ from "jquery";
import "../styles/styles.css"; // Import your CSS
import { clickMe } from "../utils/services/apiService";
import { initialScript } from "../utils/initial-script";

// (window as any).clickMe = clickMe;

$(() => {

  initialScript();

  const element = $("#my-element");
  element.text(`Hello, TypeScript with jQuery! : ${new Date().toISOString()}`);



  // Correctly select the button and add a click event listener
  // $('#my-button-no-1').on('click', clickMe);
  const button = $("#my-button-no-1").get(0) as HTMLButtonElement; // Get the native DOM element

  if (button) {
    // Attach the event listener
    button.addEventListener("click", clickMe);

    // Example: remove the event listener after 10 seconds
    // setTimeout(() => {
    //     button.removeEventListener("click", clickMe); // Remove the event listener
    //     console.log("Event listener removed.");
    // }, 10000);
    
}
});
