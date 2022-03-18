import random

class Notes:
  # # note gets beat
  # beatNote = 4
  #
  # # beats per measure
  # bpm = 4

  # number of measures
  measures = 8

  notes = [
    {"duration": 1/16, "triplet": True},
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

    for i in range(measures):
      # print(i)
      remaining = bpm / beatNote
      maxIndex = len(notes) - 1
      # print(remaining)
      # print(maxIndex)
      while remaining > 0:
          index = random.randint(0, maxIndex)
          selection = notes[index]
          # print(selection)
          duration = selection["duration"]
          # print(duration)
          if (duration > remaining):
            maxIndex = index - 1;
          else:
            remaining -= duration
            code = str(duration) + "%@!"
            # one in three chance of being a rest
            if (random.randint(0,2) == 0):
              code += "R%@!F"
            else:
              if (
              (selection["triplet"] == True) and
              # from 2/3 chance of notes, 1/3 chance
              # of being made a triplet
              (random.randint(0, 2) == 0)
              ):
                code += "N%@!T"
              else:
                code += "N%@!F"
            print("measure: " + str(i))
            print("remaining: " + str(remaining))
            print("code: " + code)
            generated.append(code)
            return generated

print(Notes.generate_rhythms(4, 4))
print(Notes.generate_rhythms(3, 8))
    # print(generated)
