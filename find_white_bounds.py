from PIL import Image

img = Image.open('/Users/shwetasharma/.gemini/antigravity/brain/ef171d0d-220c-4c98-8a42-3a2022c9649c/media__1772421644513.png').convert("RGB")
w, h = img.size
pixels = img.load()

# Function to check if a pixel is white (or very close to it)
def is_white(r, g, b):
    return r > 240 and g > 240 and b > 240

# We want to find the large white background of the persona *content*
# ignoring the black padding (first 16px left, 5px top, etc.)
# and ignoring the John Deere bottom footer which is likely light-green (211, 237, 204 or so).

# let's scan inwards from x=16 and y=5
top_white = -1
bottom_white = -1
left_white = -1
right_white = -1

for y in range(h):
    whites = sum(1 for x in range(w) if is_white(*pixels[x, y]))
    if whites > w * 0.5:  # if > 50% white
        if top_white == -1: top_white = y
        bottom_white = y

for x in range(w):
    whites = sum(1 for y in range(h) if is_white(*pixels[x, y]))
    if whites > h * 0.3:
        if left_white == -1: left_white = x
        right_white = x

print(f"White bounds: left={left_white}, top={top_white}, right={right_white}, bottom={bottom_white}")

