from PIL import Image

img = Image.open('/Users/shwetasharma/.gemini/antigravity/brain/ef171d0d-220c-4c98-8a42-3a2022c9649c/media__1772418621152.png').convert("RGB")
w, h = img.size
pixels = img.load()

print(f"Height: {h}, Width: {w}")
for y in range(h-1, h-200, -5):
    # check center 100 pixels
    row = [pixels[x, y] for x in range(w//2 - 50, w//2 + 50)]
    avg_r = sum(c[0] for c in row) / len(row)
    avg_g = sum(c[1] for c in row) / len(row)
    avg_b = sum(c[2] for c in row) / len(row)
    print(f"Row {y:3d}: RGB({avg_r:5.1f}, {avg_g:5.1f}, {avg_b:5.1f})")
