from PIL import Image

img = Image.open('/Users/shwetasharma/.gemini/antigravity/brain/ef171d0d-220c-4c98-8a42-3a2022c9649c/media__1772418621152.png').convert("RGB")
w, h = img.size
pixels = img.load()

# Threshold for "white-ish" pixel: R+G+B > 720 (average 240)
def is_white(c):
    return sum(c) > 720

top, bottom = 0, h - 1
left, right = 0, w - 1

# Find top
for y in range(h):
    white_count = sum(1 for x in range(w) if is_white(pixels[x, y]))
    if white_count > w * 0.3:  # If more than 30% of the row is white, consider it part of the card
        top = y
        break

# Find bottom
for y in range(h - 1, -1, -1):
    white_count = sum(1 for x in range(w) if is_white(pixels[x, y]))
    if white_count > w * 0.3:
        bottom = y
        break

# Find left
for x in range(w):
    white_count = sum(1 for y in range(top, bottom) if is_white(pixels[x, y]))
    if white_count > (bottom - top) * 0.3:
        left = x
        break

# Find right
for x in range(w - 1, -1, -1):
    white_count = sum(1 for y in range(top, bottom) if is_white(pixels[x, y]))
    if white_count > (bottom - top) * 0.3:
        right = x
        break

print(f"Original size: {w}x{h}")
print(f"Detected white card bounds: left={left}, top={top}, right={right}, bottom={bottom}")

# Crop and save
cropped = img.crop((left, top, right, bottom))
cropped.save('public/rajesh_persona_actual.png')
print(f"Cropped image saved. New size: {cropped.size}")
