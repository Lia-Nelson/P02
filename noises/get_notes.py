import random

# number of measures
measures = 8

durations = [1/16, 1/8, 3/16, 1/4, 3/8, 1/2, 3/4, 1, 3/2];

def get_max_index(remaining):
    for i in range(len(durations) - 1, -1, -1):
        if durations[i] <= remaining:
            return i

def generate_rhythms(bpm:int, beatNote:int) -> list:
    generated = []
    print("Measures: " + str(measures))
    print("Beats per measure: " + str(bpm))
    print("Beat note: " + str(beatNote))
    for i in range(measures):
        in_measure = []
        print()
        print("Current measure: " + str(i))
        remaining = bpm / beatNote
        while remaining > 0:
            print("remaining: " + str(remaining))
            maxIndex = get_max_index(remaining)
            duration = durations[random.randint(0, maxIndex)]
            print("just got: " + str(duration))
            remaining -= duration
            # one in three chance of being a rest
            note = {"duration": duration, "note": random.randint(0, 2) != 0}
            in_measure.append(note)
        generated.append(in_measure)
    return generated

print(generate_rhythms(4, 4))
print(generate_rhythms(3, 8))
