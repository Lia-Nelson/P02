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

def get_max_index(remaining):
  for i in range(len(notes) - 1, -1, -1):
    if notes[i]["duration"] <= remaining:
      return i

def generate_rhythms(bpm:int, beatNote:int) -> list:
  generated = []
  print("Measures: " + str(measures))
  print("Beats per measure: " + str(bpm))
  print("Beat note: " + str(beatNote))
  for i in range(measures):
    in_measure = []
    print("Current measure: " + str(i))
    remaining = bpm / beatNote
    print("Remaining: " + str(remaining))
    while remaining > 0:
      print("measure: " + str(i))
      print("remaining: " + str(remaining))
      maxIndex = get_max_index(remaining)
      note = notes[random.randint(0, maxIndex)].copy()
      remaining -= note["duration"]
      # one in three chance of being a rest
      if (random.randint(0, 2) == 0):
        note["note"] = False
        note["triplet"] = False
      else:
        note["note"] = True
        # one in three chance of remaining a triplet
        if (note["triplet"] and random.randint(0, 2) != 0):
          note["triplet"] = False
      in_measure.append(note)
    generated.append(in_measure)
  return generated

print(generate_rhythms(4, 4))
print(generate_rhythms(3, 8))
