from sklearn.tree import DecisionTreeClassifier

# Training dataset
# Format: [score, skills, internship]

X = [

    [90,9,1],
    [88,9,1],
    [85,8,1],
    [82,8,1],
    [80,8,1],
    [78,7,1],
    [75,7,1],
    [74,7,1],

    [72,6,1],
    [70,6,0],
    [68,6,0],
    [65,6,0],
    [63,5,0],
    [60,5,0],
    [58,5,0],

    [55,4,0],
    [52,4,0],
    [50,3,0],
    [48,3,0],
    [45,3,0],

    [42,2,0],
    [40,2,0],
    [38,2,0]

]

y = [

    "High",
    "High",
    "High",
    "High",
    "High",
    "High",
    "High",
    "High",

    "Medium",
    "Medium",
    "Medium",
    "Medium",
    "Medium",
    "Medium",
    "Medium",

    "Low",
    "Low",
    "Low",
    "Low",
    "Low",

    "Low",
    "Low",
    "Low"
]

# Create model
model = DecisionTreeClassifier()

# Train model
model.fit(X,y)

def ml_prediction(score, skills, internship):

    prediction = model.predict([[score,skills,internship]])
    return prediction[0]