import os
import patoolib

# Folder where all .cbr & .cbz files are stored
SOURCE_FOLDER = "D:\\Prem\\comics\\cmic\\cbr-cbz"

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
