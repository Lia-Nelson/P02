import random

# # note gets beat
# beatNote = 4
#
# # beats per measure
# bpm = 4

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
      index = random.randint(0, maxIndex)
      selection = notes[index]
      # print(selection)
      duration = selection["duration"]
      # print(duration)
      if (duration > remaining):
        maxIndex = index - 1;
      else:
        note = {"duration": duration}
        remaining -= duration
        # in_measure.append(duration)
        # code = str(duration) + "%@!"
        # one in three chance of being a rest
        if (random.randint(0,2) == 0):
          note["note"] = False
          note["triplet"] = False
          # in_measure.append("rest")
          # in_measure.append(False)
          # code += "R%@!F"
        else:
          note["note"] = True
          # in_measure.append("note")
          if (
          (selection["triplet"] == True) and
          # from 2/3 chance of notes, 1/3 chance
          # of being made a triplet
          (random.randint(0, 2) == 0)
          ):
           note["triplet"] = True
           # in_measure.append(True)
           # code += "N%@!T"
          else:
            note["triplet"] = False
            # in_measure.append(False)
            # code += "N%@!F"
            print("measure: " + str(i))
            print("remaining: " + str(remaining))
            # print("code: " + code)
            # generated.append(code)
        in_measure.append(note)
    generated.append(in_measure)
  return generated

print(generate_rhythms(4, 4))
print(generate_rhythms(3, 8))
# print(generated)
