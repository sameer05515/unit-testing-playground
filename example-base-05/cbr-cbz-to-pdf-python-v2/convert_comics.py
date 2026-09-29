from __future__ import annotations

import argparse
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

from PIL import Image, ImageOps


DEFAULT_INPUT = Path(r"D:\comics\hawaldar bahadur")
IMAGE_EXTENSIONS = {
    ".jpg", ".jpeg", ".png", ".webp", ".bmp", ".gif", ".tif", ".tiff"
}
ARCHIVE_EXTENSIONS = {".cbr", ".cbz"}


def natural_key(path: Path):
    return [
        int(part) if part.isdigit() else part.lower()
        for part in re.split(r"(\d+)", path.name)
    ]


def find_7zip() -> str | None:
    candidates = [
        shutil.which("7z"),
        shutil.which("7zz"),
        r"C:\Program Files\7-Zip\7z.exe",
        r"C:\Program Files (x86)\7-Zip\7z.exe",
    ]

    for candidate in candidates:
        if candidate and Path(candidate).exists():
            return str(candidate)

    return None


def extract_archive(archive: Path, destination: Path, seven_zip: str):
    """Extract CBR/CBZ using 7-Zip."""
    command = [
        seven_zip,
        "x",
        "-y",
        str(archive),
        f"-o{destination}",
    ]

    result = subprocess.run(
        command,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        encoding="utf-8",
        errors="replace",
    )

    if result.returncode != 0:
        raise RuntimeError(
            f"7-Zip failed for {archive.name}\n\n{result.stdout}"
        )


def get_images(folder: Path) -> list[Path]:
    images = [
        p for p in folder.rglob("*")
        if p.is_file() and p.suffix.lower() in IMAGE_EXTENSIONS
    ]
    return sorted(images, key=natural_key)


def prepare_image(image_path: Path) -> Image.Image:
    with Image.open(image_path) as img:
        img.load()

        if getattr(img, "is_animated", False):
            img.seek(0)

        img = ImageOps.exif_transpose(img)

        if img.mode in ("RGBA", "LA"):
            rgba = img.convert("RGBA")
            background = Image.new("RGB", rgba.size, "white")
            background.paste(
                rgba.convert("RGB"),
                mask=rgba.getchannel("A"),
            )
            return background

        if img.mode == "P":
            rgba = img.convert("RGBA")
            background = Image.new("RGB", rgba.size, "white")
            background.paste(
                rgba.convert("RGB"),
                mask=rgba.getchannel("A"),
            )
            return background

        return img.convert("RGB")


def create_pdf(images: list[Path], output_pdf: Path):
    if not images:
        raise ValueError("No supported image pages found.")

    output_pdf.parent.mkdir(parents=True, exist_ok=True)

    prepared = []

    try:
        for index, image_path in enumerate(images, start=1):
            print(f"    page {index}/{len(images)}: {image_path.name}")
            prepared.append(prepare_image(image_path))

        prepared[0].save(
            output_pdf,
            "PDF",
            resolution=150.0,
            save_all=True,
            append_images=prepared[1:],
        )

    finally:
        for image in prepared:
            image.close()


def convert_one(
    archive: Path,
    output_dir: Path,
    seven_zip: str,
    overwrite: bool,
):
    print()
    print("=" * 70)
    print(f"Converting: {archive.name}")

    output_pdf = output_dir / f"{archive.stem}.pdf"

    if output_pdf.exists() and not overwrite:
        print(f"    SKIPPED: PDF already exists: {output_pdf.name}")
        return "skipped"

    with tempfile.TemporaryDirectory(prefix="comic_convert_") as temp:
        temp_dir = Path(temp)

        # IMPORTANT:
        # seven_zip is explicitly passed here.
        extract_archive(archive, temp_dir, seven_zip)

        images = get_images(temp_dir)

        if not images:
            raise ValueError(
                "No supported image pages found inside the archive."
            )

        print(f"    found {len(images)} page(s)")
        print(f"    output: {output_pdf}")

        create_pdf(images, output_pdf)

    print("    SUCCESS")
    return "success"


def parse_args():
    parser = argparse.ArgumentParser(
        description="Convert CBR/CBZ comic archives to PDF."
    )

    parser.add_argument(
        "input_dir",
        nargs="?",
        default=str(DEFAULT_INPUT),
    )

    parser.add_argument(
        "--output",
        "-o",
        default=None,
    )

    parser.add_argument(
        "--overwrite",
        action="store_true",
        help="Overwrite PDFs that already exist.",
    )

    return parser.parse_args()


def main():
    args = parse_args()

    input_dir = Path(args.input_dir).expanduser()

    if not input_dir.exists():
        print(f"ERROR: Input folder does not exist:\n{input_dir}")
        sys.exit(1)

    if not input_dir.is_dir():
        print(f"ERROR: Input path is not a folder:\n{input_dir}")
        sys.exit(1)

    seven_zip = find_7zip()

    if not seven_zip:
        print("ERROR: 7-Zip was not found.")
        print(r"Expected: C:\Program Files\7-Zip\7z.exe")
        sys.exit(1)

    output_dir = (
        Path(args.output).expanduser()
        if args.output
        else input_dir / "pdf"
    )
    output_dir.mkdir(parents=True, exist_ok=True)

    archives = sorted(
        [
            p for p in input_dir.rglob("*")
            if p.is_file()
            and p.suffix.lower() in ARCHIVE_EXTENSIONS
            and output_dir not in p.parents
        ],
        key=natural_key,
    )

    if not archives:
        print(f"No .cbr/.cbz files found in:\n{input_dir}")
        return

    print(f"7-Zip : {seven_zip}")
    print(f"Input : {input_dir}")
    print(f"Output: {output_dir}")
    print(f"Files : {len(archives)}")
    print()

    success = 0
    skipped = 0
    failed = 0

    for archive in archives:
        try:
            result = convert_one(
                archive,
                output_dir,
                seven_zip,
                args.overwrite,
            )

            if result == "success":
                success += 1
            elif result == "skipped":
                skipped += 1

        except Exception as exc:
            failed += 1
            print()
            print(f"ERROR converting {archive.name}:")
            print(f"    {exc}")

    print()
    print("=" * 70)
    print("DONE")
    print(f"Successful: {success}")
    print(f"Skipped   : {skipped}")
    print(f"Failed    : {failed}")
    print(f"PDF folder: {output_dir}")

    if failed:
        sys.exit(2)


if __name__ == "__main__":
    main()
