import random

# number of measures
measures = 8

notes = [
  {"duration": 1/16, "triplet": False},
  {"duration": 1/8, "triplet": True},
  {"duration": 3/16, "triplet": False},
  {"duration": 1/4, "triplet": True},
  {"duration": 3/8, "triplet": False},
  {"duration": 1/2, "triplet": True},
  {"duration": 3/4, "triplet": False},
  {"duration": 1, "triplet": True},
  {"duration": 3/2, "triplet": False}
]

def generate_rhythms(bpm:int, beatNote:int) -> list:
  generated = []
  print("Measures: " + str(measures))
  print("Beats per measure: " + str(bpm))
  print("Beat note: " + str(beatNote))
  for i in range(measures):
    in_measure = []
    print("Current measure: " + str(i))
    remaining = bpm / beatNote
    maxIndex = len(notes) - 1
    print("Remaining: " + str(remaining))
    print("Max index: " + str(maxIndex))
    while remaining > 0:
      print("measure: " + str(i))
      print("remaining: " + str(remaining))
      index = random.randint(0, maxIndex)
      note = notes[index].copy()
      if (note["duration"] > remaining):
        maxIndex = index - 1;
      else:
        remaining -= note["duration"]
        # one in three chance of being a rest
        if (random.randint(0,2) == 0):
          note["note"] = False
          note["triplet"] = False
        else:
          note["note"] = True
          if (note["triplet"] == True and random.randint(0, 2) != 0):
            note["triplet"] = False
        in_measure.append(note)
    generated.append(in_measure)
  return generated

print(generate_rhythms(4, 4))
print(generate_rhythms(3, 8))
