import Page from "./Page.dto.mjs";
import * as MDContents from "./mdContents.mjs";

const fromText = (text) => (text ? `<div style="white-space: pre-wrap;">${text}</div>` : "");
// const fromMDText = (content) => `<div>${marked.parse(content)}</div>`;
const fromMDText = (content) => (content ? marked.parse(content) : "");

const Pages = [
  Page.fromData({
    name: `<h2>🎯backend API kis kis cheez ki banayein? </h2>`,
    description: fromText(`
- 🎯Jo frontend projects me utils me hai, aur data processing kar rahe hain, unko API ke sath expose kar sakte hain.
- 🎯Persistence ke liye local storage ya db ya file-based approach (fba) use ka sakte hain.
- 🎯FBA is preferable, as it can solve problem of permanent persistence as well as backup.
    `),
  }),

  Page.fromData({
    name: "<h2>Pdf-viewers</h2>",
    children: [
      Page.fromData({ name: "v1", link: "/pdf-viewer/v1" }),
      Page.fromData({ name: "v2, <b> Not fully implemented yet</b>", link: "/pdf-viewer/v2" }),
      Page.fromData({ name: "v3", link: "/pdf-viewer/v3" }),
    ],
  }),

  Page.fromData({
    name: `<h2>Chat Renderers</h2>`,
    description: fromText(`
Purpose is
- 🎯process the raw json once and create APIs to render chats with pagination and other best practices.

<b> Required APIs</b>
- 🎯 <b>TBD</b> For a given snapshot-slug and date-string (e.g. "12-Mar-2024"), api should return messages grouped by conversation names.
    `),
    children: [
      Page.fromData({ name: "v1", link: "/chat-viewer/v1" }),
      Page.fromData({ name: "v3", link: "/chat-viewer/v3" }),
      Page.fromData({
        name: "v4",
        link: "/chat-viewer/v4",
        description: fromText(`
<b> Remarks </b>
- 😎 In this version, we will <b><i>process</i></b> all json data <b><i>client side only</i></b>.
- We also want to understand challenges and limitations of processing a raw chat json file in <i>client-end</i> and why serverside help is needed


<b>What improved in this version</b>
- ✅Responsiveness improved

<b>Todo's</b>
- 🎯🥹 Ho sake toh <b>dark/light</b> wala setup kar liya jaaye, toh badi kripa hogi.🥹🥹
  - ✅ Basic setup kar diye hain.
  - 🎯 Final touch for theme-toggle abhi baaki hai.

- 🎯Conversation ka naam bhi dikh jaaye
  - ✅ Basic setup toh kar diye hain.
  - 🎯 Conversation title abhi footer me dikh raha hai, usko header me bhi dikhana hai

- 🎯mjs files mein ui aur logic related logic ko properly seggrgate kar liya jaaye.

- 🎯Conversation related other details, like when created, when last updated, how many messages bhi dikh jaaye toh thora aur maza aayega.

- 🎯selected conversation id dynamically search param se aa jaye, toh achha lagega. nahi toh har page-load par phir se first conversation pe pahuch jayenge.
  - 🎯 Temporarily localStorage ka sahara le sakte hain. Par long term me <i>backend-api</i> wala approach sahi rahega  
    - ✅ Sasta wala <b><i>backend-api</i> wala approach</b> implement kar diye hain. 
    - 🎯 Iss approach ko thora fine-tune karna baaki hai. Abhi, on each Next/Prev conversation button click, json parsing ho raha hai.
    
- ✅ Prev/Next conversation wale buttons to right me shift kar dijiye. Usme ⏮️⏭️ icons use kar lijiye. 
- ✅ Similarly prev/next message ko bhi iconize ⬅️➡️ kar dijiye.    
  - ✅ Awwal toh inn dono buttons ko v4 me se hata lijiye. Pagination wala koi kaam yaha nhi ho raha.  

- ✅ Header me home 🏠 ka icon laga dijiye. On click of this icon, user should go to home-page

- 🎯 Jo-jo messages dikh rahe hain, unki ids ko local storage me rakh lete hain. 
  Isse page reload par bhi sirf wahi messages ko hi visible karwa sakte hain.
  <b>Hint</b> : Kuch MutualObserver aur scroll wala event listener chahiye hoga. Ek react wale project me bhi kiye hain.

- 🎯 message content ka code highlighting bhi possible hai toh kar dete hain.
        `),
        children: [
          Page.fromData({
            name: "🎯🏃‍♂️‍➡️🏃‍♂️‍➡️ v4.1 : Code highlighting with highlight.js + visible-messages-trackers",
            link: "/chat-viewer/v4.1",
          }),
        ],
      }),
      Page.fromData({
        name: "v5",
        //link: "/chat-viewer/v5",
        description: fromText(`
One proposed version, where conversation details will be rendered by given id. We will use APIs in this version.

Below is flow
- If there is no <b><i>snapshot-version-id</i></b> is sent in search params, then list of available snapshot-names will be shown.
⬇️
- Once valid <b><i>snapshot-version-id</i></b> is sent in search params, by default, first conversation details will be rendered.
⬇️
- if valid <b><i>conversation-id</i></b> is sent in search params, then that conversation details will be rendered.

        `),
      }),
    ],
  }),
  //data-processing-strategies-renderer
  Page.fromData({
    name: `<h2>data-processing-strategies-renderers</h2>`,
    description: fromText(`
Purpose is
- 🎯process the raw data once and create APIs to render startegies uniformly with pagination and other best practices.
    `),
    children: [
      Page.fromData({ name: "data-processing-strategies-viewer/v1", link: "/data-processing-strategies-viewer/v1" }),
      Page.fromData({ name: "plans-viewer/v1", link: "/plans-viewer/v1" }),
      Page.fromData({ name: "plans-viewer/v2", link: "/plans-viewer/v2" }),
      Page.fromData({ name: "plans-viewer/v3", link: "/plans-viewer/v3" }),
      Page.fromData({
        name: "plans-viewer/v4  with Query params",
        link: "/plans-viewer/v4?planId=🤣🤣🤣🤣🤣Dummy Plan id",
      }),
      Page.fromData({ name: "table-generator/v1", link: "/table-generator/v1" }),
      Page.fromData({ name: "table-generator/v2", link: "/table-generator/v2" }),
      Page.fromData({ name: "table-generator/v2?num=5", link: "/table-generator/v2?num=5" }),
      Page.fromData({ name: "plans-viewer/v5", link: "/plans-viewer/v5" }),
    ],
  }),

  Page.fromData({
    name: "<h2>CRUD DEMO Renderers</h2>",
    children: [Page.fromData({ name: "/crud-demo/v2", link: "/crud-demo" })],
  }),

  Page.fromData({
    name: "<h2>POC: 🎯visible-messages-trackers</h2>",
    description: fromText(`
Ek HTML + Tailwind + MJS setup de raha hoon jo:
✅ Messages array generate karega (id + indexed lorem ipsum).
✅ Intersection Observer se visible messages track karega.
✅ Local Storage me visible message IDs store karega.
✅ Page reload hone par sirf wahi messages dikhayega jo last time visible the.

🔥 How It Works
- Dummy messages generate ho rahe hain (id + Lorem Ipsum).
- Page reload hone par wahi messages highlight honge jo pehle visible the.
- Intersection Observer track karega kaunse messages dikh rahe hain.
- Local Storage me sirf dikh rahe messages ka id store hoga.
- Scroll karne par messages appear/disappear hote rahenge.
    `),
    children: [
      Page.fromData({ name: "visible-messages-tracking/v1", link: "visible-messages-tracking/v1" }),
      Page.fromData({ name: "visible-messages-tracking/v2", link: "visible-messages-tracking/v2" }),
      Page.fromData({ name: "visible-messages-tracking/v3", link: "visible-messages-tracking/v3" }),
      Page.fromData({
        name: "visible-messages-tracking/v4",
        link: "visible-messages-tracking/v4",
        description: fromMDText(MDContents.observerKaKalaJaadu),
      }),
    ],
  }),

  Page.fromData({
    name: "<h2>POC: Code Highlighting in html+marked setup</h2>",
    children: [
      Page.fromData({
        name: "/code-highlighting/v1.0",
        link: "/code-highlighting/v1.0",
        description: fromMDText("### A basic html + Marked.js + highlight.js setup"),
        children: [
          Page.fromData({
            name: "/code-highlighting/v1.0.1",
            link: "/code-highlighting/v1.0.1",
            description: fromMDText("### A basic html + Marked.js + highlight.js setup, with API fetch based on slug."),
          }),
          Page.fromData({
            name: "/code-highlighting/v1.1",
            link: "/code-highlighting/v1.1",
            description: fromText("<b>with bootstrap, toggle functionality and API fetch based on slug.</b>"),
          }),

          Page.fromData({
            name: "/code-highlighting/v1.2",
            link: "/code-highlighting/v1.2",
            description: fromText("<b>with tailwind</b> \nProse ka kuch kami hai. 1.2.1 me sudharte hain isko."),
          }),

          Page.fromData({
            name: "/code-highlighting/v1.2.1",
            link: "/code-highlighting/v1.2.1",
            description: fromText(`
<b>with tailwind</b> 
- Prose add karke, missing thing sudharne ki <b>safal koshish</b>.
              `),
          }),
        ],
      }),
      Page.fromData({
        name: "/code-highlighting/v2.0",
        link: "/code-highlighting/v2.0",
        description: fromText(`
<h3>✅ A Basic HTML Example (Prism.js + Marked.js)</h3>
          `),
      }),
    ],
  }),

  Page.fromData({
    name: "<h2>🎯 GOAL: Analyze Raw Data </h2>",

    description: fromText(`
🎯 Analyze ChatGPT raw data
- 🎯 Step 1 - Display button "1. Show all snapshot names", 
- on click of it fetch data from backend for 'GET /api/step1' and show in a table.
- On success of this step, show next step button.
- If there is any error, show error message in "Error display div"
- 🎯 Step 2 - Display button "2. Show all snapshot details",
- Name, slug, file-size, total conversations in each snapshot (also few more things, as per decided at actual implementation)
- 🎯 Step 3: Trickier step🥹🥹 : Conversation level analysis for each snapshot
- Kya snapshot 1 (older one) ke saare conversation names, snapshot 2 me available hai
- Kya "snapshot 1".conversation[1..last] ka created date, exactly match ho raha hai uske next snapshot me??
- TBD
- 🎯 Step 4: Trickier step🥹🥹 : Message level analysis for each snapshot

Show all snapshot names
Show total conversation and messages in each snapshot
Show all conversation names and total messages and user-query in each snapshot
show all messages in a selected conversation and selected snapshot
show all user-query in a selected conversation and selected snapshot
show all user-query sorted by created date in a selected snapshot
      `),
    children: [
      Page.fromData({
        name: "<h1>Some more structured plan</h1>",
        description: fromMDText(MDContents.chatGPTDataAnalysisPlan),
      }),
      Page.fromData({
        name: "<h4>Step 1: Show all snapshot names. fetch details from API '/slug=\"slug-name\"'</h4>",
        children: [
          Page.fromData({
            name: "Ek prayog, ki chat-renderer project ke ESM style wale js file ko hacky😤 tareeke se read kar sakein.",
            link: "/analyse-cgpt/pages/v1",
            description: fromText(`
Prayog asafal raha😭😭😭
<span style="color:red">Hacky approach, not recommended</span>
            `),
          }),
          Page.fromData({
            name:"Chat-renderer me js wale data ko json me transfer kar diye. Ab ESM aur CJS dono projects khush hain.",
            link:"/analyse-cgpt/pages/v2",
          }),
          Page.fromData({
            name:"date-wise-messages-chart",
            link:"/analyse-cgpt/pages/date-wise-messages-chart/v39"
          }),
          Page.fromData({
            name:"month-wise-messages-chart",
            link:"/analyse-cgpt/pages/month-wise-messages-chart/v39"
          })
        ],
      }),
    ],
  }),
];

Pages.push(
  Page.fromData({
    name: "<h1>Todo's : At application level and in multiple views or routes</h1>",
    description: fromText(`
- 🎯 Theme apply karne ke liye ek lightweight <b>js+css setup</b> banate hain, taaki usko reuse karke aasani se kisi bhi ejs file me <i>theme-toggle</i> ko apply kiya ja sake.
  - 🎯 3 type ka <b>js+css setup</b> banate hain. For bootstrap, tailwind and raw-css each.
  - 🏃‍♂️‍➡️🏃‍♂️‍➡️ Meanwhile, manually copy-paste se theme-toggle ko different views me apply karenge aur ek common-minimal <b>js+css setup</b> identify kar lenge.
    `),
  })
);

export { Pages };
