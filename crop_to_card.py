from PIL import Image

img = Image.open('/Users/shwetasharma/.gemini/antigravity/brain/ef171d0d-220c-4c98-8a42-3a2022c9649c/media__1772418621152.png').convert("RGB")
w, h = img.size
pixels = img.load()

bg_color = pixels[0, 0]
print(f"Background color at 0,0 is {bg_color}")

def is_bg(x, y):
    r,g,b = pixels[x, y]
    br, bg, bb = bg_color
    return abs(r-br)<5 and abs(g-bg)<5 and abs(b-bb)<5

# Find Top
top = 0
for y in range(h):
    # if mostly bg, continue. Else, we found the top.
    bg_count = sum(1 for x in range(w) if is_bg(x, y))
    if bg_count < w * 0.8:
        top = y
        break

# Find Bottom
bottom = h - 1
for y in range(h - 1, -1, -1):
    bg_count = sum(1 for x in range(w) if is_bg(x, y))
    if bg_count < w * 0.8:
        bottom = y
        break

# Find Left
left = 0
for x in range(w):
    bg_count = sum(1 for y in range(h) if is_bg(x, y))
    if bg_count < h * 0.8:
        left = x
        break

# Find Right
right = w - 1
for x in range(w - 1, -1, -1):
    bg_count = sum(1 for y in range(h) if is_bg(x, y))
    if bg_count < h * 0.8:
        right = x
        break

print(f"Card bounds: left={left}, top={top}, right={right}, bottom={bottom}")

# The user explicitly said: "crop the part which says the johndeere at the bottom"
# Maybe the John Deere part is INSIDE the white card but at the very bottom?
# Let's check the bottom of the white card.
