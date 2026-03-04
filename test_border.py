from PIL import Image

img = Image.open('/Users/shwetasharma/.gemini/antigravity/brain/ef171d0d-220c-4c98-8a42-3a2022c9649c/media__1772421644513.png').convert("RGB")
w, h = img.size
pixels = img.load()

# print pixels from left to right at y=100
for x in range(0, 50):
    print(f"({x}, 100): {pixels[x, 100]}")

# print pixels from top to bottom at x=500
for y in range(0, 50):
    print(f"(500, {y}): {pixels[500, y]}")
    
# print pixels from bottom up at x=500
for y in range(h-1, h-100, -1):
    print(f"(500, {y}): {pixels[500, y]}")

