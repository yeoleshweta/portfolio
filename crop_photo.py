from PIL import Image

# Read the previously cropped full persona card which has the photo on the left
img = Image.open('public/rajesh_persona_actual.jpg').convert("RGB")
w, h = img.size

# The photo is on the left side, under a green header. Let's crop just the photo block.
# Let's say x from 0 to 240, y from 60 to 450
photo = img.crop((0, 60, 240, h-120))
photo.save('public/rajesh_photo.jpg')
print("Cropped portrait to public/rajesh_photo.jpg")
