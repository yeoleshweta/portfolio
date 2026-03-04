from PIL import Image

img = Image.open('/Users/shwetasharma/.gemini/antigravity/brain/ef171d0d-220c-4c98-8a42-3a2022c9649c/media__1772421644513.png').convert("RGB")
w, h = img.size
pixels = img.load()

# print top-left, top-right, bottom-left, bottom-right
print(f"Top-Left: {pixels[0,0]}")
print(f"Top-Right: {pixels[w-1, 0]}")
print(f"Center left: {pixels[0, h//2]}")

# Let's find the inner light-green bounding box
# Is there a white border?
for x in range(w//2):
    if pixels[x, h//2] != pixels[0, h//2]:
        print(f"X border change at {x}: {pixels[x, h//2]}")
        break

for y in range(h//2):
    if pixels[w//2, y] != pixels[w//2, 0]:
        print(f"Y border change top at {y}: {pixels[w//2, y]}")
        break

for y in range(h-1, h//2, -1):
    if pixels[w//2, y] != pixels[w//2, h-1]:
        print(f"Y border change bottom at {y}: {pixels[w//2, y]}")
        break

