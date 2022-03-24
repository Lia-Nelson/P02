import random

# number of measures
measures = 8

durations = [1/16, 1/8, 3/16, 1/4, 3/8, 1/2, 3/4, 1, 3/2]

def get_max_index(remaining):
    for i in range(len(durations) - 1, -1, -1):
        if durations[i] <= remaining:
            return i

def get_notes_dict(bpm:int, beat_note:int) -> list:
    generated = []
    print("Measures: " + str(measures))
    print("Beats per measure: " + str(bpm))
    print("Beat note: " + str(beat_note))
    for i in range(measures):
        print()
        print("Current measure: " + str(i))
        remaining = bpm / beat_note
        while remaining > 0:
            print("remaining: " + str(remaining))
            maxIndex = get_max_index(remaining)
            duration = durations[random.randint(0, maxIndex)]
            print("just got: " + str(duration))
            remaining -= duration
            # one in three chance of being a rest
            note = {"duration": duration, "note": random.randint(0, 2) != 0}
            generated.append(note)
    return generated

def get_notes(bpm, beat_note):
    return str(get_notes_dict(bpm, beat_note)).lower().replace("'", '"')
