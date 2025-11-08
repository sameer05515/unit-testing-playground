Bilkul bhai! **Virtual environment (`venv`) setup** aur **`requirements.txt`** add kar dete hain taki setup clean aur portable rahe.  

---

### **1️⃣ Steps to Set Up Virtual Environment & Install Dependencies**
Run these commands in your project folder:

```sh
# Step 1: Create a virtual environment
python -m venv venv

# Step 2: Activate the virtual environment
# For Windows:
venv\Scripts\activate
# For macOS/Linux:
source venv/bin/activate

# Step 3: Install dependencies
pip install -r requirements.txt
```

---

### **2️⃣ `requirements.txt` (Dependencies File)**
Create a file named `requirements.txt` in the project folder and add:
```
patool
```

Later, if you add more dependencies, you can update the list using:
```sh
pip freeze > requirements.txt
```

---

### **3️⃣ Updated Python Script (with venv Support)**
```python
import os
import patoolib

# Folder where all .cbr & .cbz files are stored
SOURCE_FOLDER = "cbr_cbz_files"

# Ensure the folder exists
if not os.path.exists(SOURCE_FOLDER):
    print(f"Folder '{SOURCE_FOLDER}' not found!")
    exit()

# Process each .cbr or .cbz file
for file in os.listdir(SOURCE_FOLDER):
    if file.endswith((".cbr", ".cbz")):  # Check both extensions
        file_path = os.path.join(SOURCE_FOLDER, file)
        folder_name = os.path.splitext(file)[0]  # Get filename without extension
        output_path = os.path.join(SOURCE_FOLDER, folder_name)

        # Create output folder if it doesn't exist
        os.makedirs(output_path, exist_ok=True)

        # Extract the archive
        print(f"Extracting: {file} → {output_path}")
        patoolib.extract_archive(file_path, outdir=output_path)

print("Extraction complete!")
```

---

### **4️⃣ How to Run the Script**
```sh
python extract_comics.py
```
_(Make sure the virtual environment is activated before running it)_

---

🎯 **Final Folder Structure Will Look Like:**
```
/cbr_cbz_extractor
  ├── venv/                  (Virtual environment)
  ├── cbr_cbz_files/         (Folder containing CBR & CBZ files)
  ├── extract_comics.py      (Your script)
  ├── requirements.txt       (Dependencies)
```

---

Ab tumhare setup **portable, clean aur future-proof** hai. 🚀 Koi aur tweak chahiye ho toh batao bhai! 😎🔥