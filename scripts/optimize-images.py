from __future__ import annotations

import shutil
from pathlib import Path

from PIL import Image, ImageOps


PROJECT_ROOT = Path(__file__).resolve().parents[1]
PHOTO_ROOT = PROJECT_ROOT / "public" / "photos"
ARCHIVE_ROOT = PROJECT_ROOT / ".photo-originals"
FULL_SIZE = 1600
THUMB_SIZE = 480


def resized_copy(image: Image.Image, longest_edge: int) -> Image.Image:
    result = image.copy()
    result.thumbnail((longest_edge, longest_edge), Image.Resampling.LANCZOS)
    return result


def save_webp(image: Image.Image, destination: Path, quality: int) -> None:
    temporary = destination.with_suffix(".tmp.webp")
    image.save(temporary, "WEBP", quality=quality, method=6)

    with Image.open(temporary) as check:
        check.verify()

    temporary.replace(destination)


def archive_original(source: Path) -> None:
    relative = source.relative_to(PHOTO_ROOT)
    destination = ARCHIVE_ROOT / relative
    destination.parent.mkdir(parents=True, exist_ok=True)

    if destination.exists():
        raise FileExistsError(f"Archive already contains {destination}")

    shutil.move(str(source), str(destination))


def main() -> None:
    sources = sorted(PHOTO_ROOT.glob("*/*.jpg"))
    if not sources:
        print("No JPG photographs found to optimize.")
        return

    original_bytes = sum(source.stat().st_size for source in sources)
    output_bytes = 0

    for source in sources:
        with Image.open(source) as opened:
            image = ImageOps.exif_transpose(opened)
            if image.mode not in ("RGB", "RGBA"):
                image = image.convert("RGB")

            full = resized_copy(image, FULL_SIZE)
            thumbnail = resized_copy(image, THUMB_SIZE)

            full_path = source.with_suffix(".webp")
            thumbnail_path = source.with_name(f"{source.stem}-thumb.webp")
            save_webp(full, full_path, quality=82)
            save_webp(thumbnail, thumbnail_path, quality=75)

            output_bytes += full_path.stat().st_size + thumbnail_path.stat().st_size

        archive_original(source)
        print(f"Optimized {source.relative_to(PHOTO_ROOT)}")

    print()
    print(f"Photos processed: {len(sources)}")
    print(f"Original JPG size: {original_bytes / 1024 / 1024:.2f} MB")
    print(f"Deployed WebP size: {output_bytes / 1024 / 1024:.2f} MB")
    print(f"Originals archived in: {ARCHIVE_ROOT}")


if __name__ == "__main__":
    main()
