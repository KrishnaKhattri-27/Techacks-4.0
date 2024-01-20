from deepface import DeepFace
result = DeepFace.verify(img1_path='./Images/dhruv1.jpg',
                         img2_path="./Images/dhruv2.jpg")
print(result)
