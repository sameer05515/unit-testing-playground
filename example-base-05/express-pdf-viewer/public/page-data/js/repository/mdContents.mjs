export const observerKaKalaJaadu = `
### **📜 एक रोमांचक लेकिन दुख भरी कहानी – "Observer ka Dukh, Tagging ka Sukh" 🎭**  

## **🔹 Part 1: The Grand Plan – Observer Ki Entry 🔍**  
Ek din, humne socha ki **Intersection Observer** ka use karke messages track karenge. Yeh approach **automatically track karega** ki konsa message **visible** hai aur usi ko **highlight** ya **scroll** karenge. 🔥   

💡 **Plan:**  
- Jo bhi message **screen pe visible hoga**, use hum **localStorage** me save karenge.  
- Page reload hone par **wahi message** automatically **scrollIntoView** ho jayega.  

Laga ki ye **badiya smart solution** hai! 🚀  

---  
## **🔹 Part 2: The Horror Begins – Observer Ki Siyahi 😱**  
Sab kuch perfect lag raha tha, **lekin dukh bhari kahani yahi se shuru hoti hai...**  

⚠️ **Samasyayein:**  
1️⃣ Observer **bahut zyada messages track** kar raha tha, aur kabhi **sahi message save nahi ho raha tha**. 😭  
2️⃣ Kabhi **scrolling id 2 pe atak jati**, kabhi random messages pe jaake ruk jata. 🤯  
3️⃣ Ek aur badi **tragedy** – har **page reload** pe first message **aage badhta ja raha tha**, jaise koi **bhoot** apni manmani kar raha ho. 👻😵  

Humne **threshold, debounce, setTimeout, aur observer disconnect** tak kiya, **lekin koi fayda nahi hua...**  
💔 **Dukh dukh dukh!**  

---  
## **🔹 Part 3: The Rise of Manual Tagging – "Tag It Yourself" 🏆**  
Fir ek din, **ek chamakta hua vichar** aaya:  

*"Observer hatao, manual tagging lagao!"* 💡🎯  

✅ **Naya Setup:**  
- **Observer ka kaala jaadu hata diya.** 🙅‍♂️  
- **Ek simple "📌 Tag" button diya** jo har message ke saath rahega.  
- **Agar koi user kisi message ko tag karega**, toh sirf **usi ka ID localStorage** me store hoga.  
- **Page reload hone par wohi message scroll hoke center me aa jayega.** 🪄💖  

Ab **na atakne ka dukh, na wrong tracking ka horror!**  
🎉 **Victory!** 🎉  

---  
## **🔹 Part 4: The Happy Ending – "Sasta, Sundar, Tikau!" 😍**  
- **Observer Approach** → 🚨 "Bohot dukh diya, chhod diya!" 😭  
- **Manual Tagging** → ✅ "Control apne haath me, smooth experience!" 🎯  
- **LocalStorage me sirf ek tagged message** save ho raha hai, aur **scroll exact wahi pe ho raha hai!** 🎊  

Aur yeh kahani kehti hai ki...  
👉 **Kuch problems observer nahi, insaan khud solve kare to behtar hota hai!** 😎  

**🎭 The End! 🎭**
`;


export const chatGPTDataAnalysisPlan=`
Bhai, kaafi **sahi breakdown** hai! 🎯 Bas thoda aur **structured aur readable** banaya hai. Aage dekh lo:  

---

### **🎯 Analyze ChatGPT Raw Data - Stepwise Plan**  

### ✅ **Step 1: Show all snapshot names**  
🔹 **Button:** \`"1. Show all snapshot names"\`  
🔹 **Action:**  
- Click pe **backend se data fetch karna hai** (\`GET /api/step1\`).  
- Response ko **table me render** karna hai.  

🔹 **Success Case:**  
✔️ Data aa gaya → **Next step ka button show ho**  

🔹 **Failure Case:**  
❌ **Error message** \`"Error display div"\` me show ho.  

---

### ✅ **Step 2: Show all snapshot details**  
🔹 **Button:** \`"2. Show all snapshot details"\`  
🔹 **Data to Display:**  
- **Snapshot Name**  
- **Slug**  
- **File Size**  
- **Total Conversations**  
- (Aur bhi kuch extra fields jo actual implementation me decide honge)  

🔹 **Next Step Trigger:**  
✔️ **Details milne ke baad agla button enable ho.**  

---

### ✅ **Step 3: Conversation Level Analysis (🔥 Thoda Trickier 🥹)**  
**Goal:** **Compare conversations between snapshots**  

🔹 **Checks:**  
- 📌 **Kya Snapshot 1 (older) ke saare conversation names, Snapshot 2 me available hai?**  
- 📌 **Kya "Snapshot 1" ke conversation[1..last] ka \`created date\`, exact match ho raha hai next snapshot me?**  
- 📌 **(Aur kya check karna hai? 🤔 TBD)**  

🔹 **Possible Edge Cases:**  
- ❌ **Conversation name missing in new snapshot?**  
- ❌ **Date mismatch?**  
- ❌ **Extra conversations add ho gaye?**  

---

### ✅ **Step 4: Message Level Analysis (🥹 Next Level Trickier 😵)**  
- 🔹 **Compare individual messages across snapshots**  
- 🔹 **Content level changes track karna (added/removed/modified messages?)**  
- 🔹 **Edge Cases Handle Karna (Duplicate, Corrupted Messages, Order Mismatch)**  

---

## **🎯 Next Actions:**  
- UI wireframe banaye?  
- Backend API structure finalize kare?  
- Large dataset ke liye performance optimize kare?  

---

Bhai **flow clear hai**! **Agla step socho**, **aur phod do!** 🚀🔥

`;