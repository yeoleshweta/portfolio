from PIL import Image

img = Image.open('/Users/shwetasharma/.gemini/antigravity/brain/ef171d0d-220c-4c98-8a42-3a2022c9649c/media__1772418621152.png').convert("RGBA")
# We will crop from x=16 and x=1006 (from my previous analysis)
# And we will crop y=0 to y=496 (which is right above the light green JD footer)
left = 16
top = 0
right = 1006
bottom = 496

cropped = img.crop((left, top, right, bottom))
cropped.save('public/rajesh_persona_actual.png')
print(f"Cropped to exact white bounds: {cropped.size}")
