from PIL import Image

img = Image.open('/Users/shwetasharma/.gemini/antigravity/brain/ef171d0d-220c-4c98-8a42-3a2022c9649c/media__1772421644513.png').convert("RGBA")
w, h = img.size

# Left border of the white frame is roughly 17
# Top border of the white frame is roughly 5
# Right border is roughly w-17 (1007)
# Bottom border of the white frame is roughly 550
left = 17
top = 6
right = 1006

# The footer starts at 505 and ends at 537
# The bottom white frame is from 537 to 551

# Let's crop the top part (everything above the footer)
top_part = img.crop((left, top, right, 504))

# Let's crop the bottom white frame (the white border and a tiny bit of shadow)
bottom_frame = img.crop((left, 537, right, 551))

# Let's create a new image that is the exact height of top_part + bottom_frame
new_w = right - left
new_h = top_part.height + bottom_frame.height

new_img = Image.new("RGBA", (new_w, new_h))
new_img.paste(top_part, (0, 0))
new_img.paste(bottom_frame, (0, top_part.height))

new_img.save('public/rajesh_persona_actual.png')
print(f"Fixed image saved. New size: {new_img.size}")
