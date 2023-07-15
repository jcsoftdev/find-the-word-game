import unicodedata
import urllib.request


def remove_accents(word):
    normalized_word = unicodedata.normalize("NFD", word)
    stripped_word = "".join(char for char in normalized_word if unicodedata.category(char) != "Mn")
    return stripped_word

def get_words_of_length(text, length):
    words = text.split()
    words_of_length = []

    for word in words:
        stripped_word = remove_accents(word)
        if len(stripped_word) == length:
            words_of_length.append(stripped_word)

    return words_of_length

# URL of the text file
url = "https://gitlab.com/d2945/words/-/raw/main/words.txt"
length = 5

try:
    response = urllib.request.urlopen(url)
    text = response.read().decode("utf-8")
    words_of_length = get_words_of_length(text, length)

    # Generate JavaScript file
    output_file = "./src/assets/data/index.ts"
    with open(output_file, "w") as file:
        file.write("export const words = " + str(words_of_length))

    print("JavaScript file", output_file, "has been generated.")
except urllib.error.URLError:
    print("Error accessing the URL:", url)
